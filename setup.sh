#!/bin/bash

echo "🚀 Setting up Kantin Kwari Market Project"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL and create a database named 'kantin_kwari_market'"
    echo "   You can continue with the setup, but you'll need to configure the database later."
fi

echo ""
echo "📦 Installing Backend Dependencies..."
cd api
npm install --legacy-peer-deps

echo ""
echo "📦 Installing Frontend Dependencies..."
cd ../market
npm install

echo ""
echo "🔧 Setting up Environment Files..."

# Create backend .env file
cd ../api
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created api/.env file"
    echo "⚠️  Please update api/.env with your database and service credentials"
else
    echo "✅ api/.env file already exists"
fi

# Create frontend .env file
cd ../market
if [ ! -f .env ]; then
    echo "VITE_API_BASE_URL=http://localhost:3000/api" > .env
    echo "✅ Created market/.env file"
else
    echo "✅ market/.env file already exists"
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update api/.env with your database and service credentials"
echo "2. Set up your PostgreSQL database"
echo "3. Run database migrations: cd api && npm run db:generate && npm run db:migrate"
echo "4. Start the backend: cd api && npm run start:dev"
echo "5. Start the frontend: cd market && npm run dev"
echo ""
echo "📚 For detailed instructions, see the README.md file"