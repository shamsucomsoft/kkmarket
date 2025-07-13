#!/bin/bash

# Development startup script for the market application

echo "🚀 Starting development environment..."

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set, using default PostgreSQL connection"
    export DATABASE_URL="postgresql://localhost:5432/market"
fi

if [ -z "$JWT_SECRET" ]; then
    echo "⚠️  JWT_SECRET not set, using development secret"
    export JWT_SECRET="development-secret-key-change-in-production"
fi

if [ -z "$FRONTEND_URL" ]; then
    echo "⚠️  FRONTEND_URL not set, using default"
    export FRONTEND_URL="http://localhost:5173"
fi

# Set development environment
export NODE_ENV=development
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

# Generate database schema if needed
echo "🗄️  Setting up database..."
cd ../api
npm run db:generate 2>/dev/null || true
npm run db:push 2>/dev/null || true

# Start backend in development mode
echo "🚀 Starting backend server in development mode..."
npm run start:dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend in development mode
echo "🚀 Starting frontend server in development mode..."
cd ../market
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 3

echo "🎉 Development environment ready!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔗 Backend API: http://localhost:3000/api"
echo "📋 Admin Panel: http://localhost:5173/admin/dashboard"
echo ""
echo "🔧 Development features enabled:"
echo "   - Hot reload for both frontend and backend"
echo "   - Source maps for debugging"
echo "   - Development database"
echo ""
echo "Press Ctrl+C to stop all servers"

# Function to clean up background processes
cleanup() {
    echo "🛑 Shutting down development servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Keep the script running
wait