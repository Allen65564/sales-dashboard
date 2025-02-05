const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Initialize Discord client
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// Log in with the bot token
client.login(process.env.DISCORD_BOT_TOKEN);

// Ready event when the bot is connected
client.once('ready', () => {
    console.log('Bot is online!');
});

// Message event to handle commands
client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});
