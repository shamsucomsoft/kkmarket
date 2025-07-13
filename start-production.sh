#!/bin/bash

# Production startup script for the market application

echo "🚀 Starting production deployment..."

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set, using default PostgreSQL connection"
    export DATABASE_URL="postgresql://localhost:5432/market"
fi

if [ -z "$JWT_SECRET" ]; then
    echo "⚠️  JWT_SECRET not set, generating random secret"
    export JWT_SECRET=$(openssl rand -base64 32)
fi

if [ -z "$FRONTEND_URL" ]; then
    echo "⚠️  FRONTEND_URL not set, using default"
    export FRONTEND_URL="http://localhost:5173"
fi

# Set production environment
export NODE_ENV=production
export VITE_API_BASE_URL="http://localhost:3000/api"

echo "📦 Installing dependencies..."

# Install backend dependencies
cd api
npm install
echo "✅ Backend dependencies installed"

# Install frontend dependencies
cd ../market
npm install
echo "✅ Frontend dependencies installed"

# Build frontend for production
echo "🔨 Building frontend..."
npm run build
echo "✅ Frontend built successfully"

# Start backend in production mode
echo "🚀 Starting backend server..."
cd ../api
npm run start:prod &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Check if backend is running
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Backend server is running"
else
    echo "❌ Backend server failed to start"
    exit 1
fi

# Start frontend
echo "🚀 Starting frontend server..."
cd ../market
npm run preview &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 3

# Check if frontend is running
if curl -f http://localhost:4173 > /dev/null 2>&1; then
    echo "✅ Frontend server is running"
else
    echo "❌ Frontend server failed to start"
    exit 1
fi

echo "🎉 Production deployment successful!"
echo "🌐 Frontend: http://localhost:4173"
echo "🔗 Backend API: http://localhost:3000/api"
echo "📋 Admin Panel: http://localhost:4173/admin/dashboard"

# Function to clean up background processes
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Keep the script running
wait