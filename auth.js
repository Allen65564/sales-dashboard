const axios = require('axios');
const express = require('express');
const session = require('express-session');
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } = process.env;

const router = express.Router();

// Discord OAuth2 Login
router.get('/auth/discord', (req, res) => {
    // Redirect user to Discord's OAuth authorization page
    const redirectUri = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_REDIRECT_URI}&response_type=code&scope=identify guilds`;
    res.redirect(redirectUri);
});

// Discord OAuth2 Callback (handles authentication response)
router.get('/auth/callback', async (req, res) => {
    const { code } = req.query;

    // Step 1: Exchange the authorization code for an access token
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: DISCORD_REDIRECT_URI,
        scope: 'identify guilds'
    }).toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    // Step 2: Get user information from Discord
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
    });

    // Step 3: Get user roles (guilds) to check for specific role
    const guildsResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
    });

    // Check if the user is in the correct server and has the necessary role
    const userGuild = guildsResponse.data.find(guild => guild.id === process.env.DISCORD_GUILD_ID);
    const userHasRole = userGuild && userGuild.roles.some(role => role.id === process.env.DISCORD_REQUIRED_ROLE_ID);

    // If the user has the required role, log them in
    if (userHasRole) {
        req.session.user = userResponse.data;
        res.redirect('/dashboard'); // Redirect to the dashboard
    } else {
        res.send('You do not have permission to access this dashboard.');
    }
});

// Log out and clear session
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
