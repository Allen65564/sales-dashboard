#!/bin/bash

echo "Starting the sales dashboard..."

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null
then
    echo "PM2 not found. Installing..."
    sudo npm install -g pm2
fi

# Start the server with PM2
pm2 start app.js --name sales-dashboard
pm2 save

echo "Sales dashboard started!"
