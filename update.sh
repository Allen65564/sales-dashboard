#!/bin/bash

echo "Updating sales dashboard..."

cd sales-dashboard

echo "Fetching latest changes from GitHub..."
git pull

echo "Restarting the server..."
pm2 restart sales-dashboard

echo "Update complete!"
