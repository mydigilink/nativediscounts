#!/bin/bash

# App info
APP_NAME="nativediscounts"
APP_DIR="/home/nativediscounts/htdocs/www.nativediscounts.com/"

echo "🚀 Starting deployment for $APP_NAME..."

# Go to project directory
cd $APP_DIR || { echo "❌ Cannot access $APP_DIR"; exit 1; }

# Pull latest code from GitHub
echo "📥 Pulling latest changes from GitHub..."
git fetch origin
git reset --hard origin/main

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Run DB migrations (Prisma / Sequelize)
echo "🛠️ Running database migrations (if any)..."
if [ -f "prisma/schema.prisma" ]; then
    npx prisma migrate deploy
elif [ -f "sequelize.config.js" ]; then
    npx sequelize-cli db:migrate
else
    echo "ℹ️ No migration tool detected, skipping..."
fi

# Remove entire .next folder for a clean build
echo "🧹 Removing old Next.js build..."
rm -rf .next

# Build Next.js project
echo "🛠️ Building Next.js project..."
npm run build

# Restart PM2 app (start if not already running)
echo "🔄 Restarting PM2 app..."
pm2 restart $APP_NAME || pm2 start npm --name "$APP_NAME" -- run start

# Save PM2 process list
echo "💾 Saving PM2 process list..."
pm2 save

echo "✅ Deployment complete!"
