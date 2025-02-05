#!/bin/bash

echo "Updating system..."
sudo apt update && sudo apt upgrade -y

echo "Installing dependencies..."
sudo apt install -y nodejs npm git -y

echo "Creating project directory..."
if [ ! -d "sales-dashboard" ]; then
    mkdir sales-dashboard
    echo "Directory 'sales-dashboard' created."
else
    echo "Directory 'sales-dashboard' already exists."
fi

cd sales-dashboard

echo "Cloning the repository (if not already cloned)..."
if [ ! -d ".git" ]; then
    git clone https://github.com/YOUR_USERNAME/sales-dashboard.git .
    echo "Repository cloned."
else
    echo "Repository already exists. Pulling latest changes..."
    git pull
fi

echo "Installing project dependencies..."
npm install

echo "Setup complete! Run ./start.sh to launch the application."
