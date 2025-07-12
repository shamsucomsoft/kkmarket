# Kantin Kwari Market

A hyper-localized e-commerce platform that bridges the gap between the vibrant physical marketplaces of Kano, Nigeria, and the digital world. This platform provides a digital storefront for real vendors operating within renowned local markets, starting with the famous Kantin Kwari Market.

## 🚀 Features

### Core Features
- **Verified Local Vendors** – Every seller is a verified, real-life vendor with a physical presence in a partner market
- **Hyper-Local Focus** – Centered on Kano, offering local pickup options, intra-city delivery, and content showcasing artisan stories
- **Dual Language Support** – Full localization in English and Hausa for community accessibility
- **Role-Based System** – User, Vendor, and Admin roles with appropriate permissions
- **Integrated Backend** – Robust NestJS API powered by PostgreSQL via Drizzle ORM

### User Features
- Browse and search products with advanced filtering
- Shopping cart and wishlist management
- Order tracking and management
- Product reviews and ratings
- Real-time messaging with vendors
- Multi-language support (English/Hausa)

### Vendor Features
- Digital storefront management
- Product catalog management with image uploads
- Order management and status updates
- Analytics and sales reports
- Payout management

### Admin Features
- Vendor approval and management
- User management
- Dispute resolution
- Platform analytics
- Content moderation

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **UI Components**: Headless UI + Heroicons
- **Notifications**: React Hot Toast

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT with Passport
- **File Storage**: Google Cloud Storage
- **Payments**: Paystack integration
- **Validation**: class-validator & class-transformer

## 📁 Project Structure

```
├── api/                    # NestJS Backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── users/         # User management
│   │   ├── products/      # Product management
│   │   ├── orders/        # Order management
│   │   ├── storage/       # File upload service
│   │   └── database/      # Database schema and configuration
│   ├── drizzle/           # Database migrations
│   └── package.json
├── market/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── state/         # Global state management
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Google Cloud Platform account (for file storage)
- Paystack account (for payments)

### Backend Setup

1. Navigate to the API directory:
```bash
cd api
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=kantin_kwari_market

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:5173

# GCP Configuration
GCP_PROJECT_ID=your-gcp-project-id
GCP_BUCKET_NAME=your-gcp-bucket-name
GCP_PRIVATE_KEY=your-gcp-private-key
GCP_CLIENT_EMAIL=your-gcp-client-email

# Paystack Configuration
PAYSTACK_SECRET_KEY=your-paystack-secret-key
PAYSTACK_PUBLIC_KEY=your-paystack-public-key
```

5. Set up the database:
```bash
# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate
```

6. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000/api`

### Frontend Setup

1. Navigate to the market directory:
```bash
cd market
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
echo "VITE_API_BASE_URL=http://localhost:3000/api" > .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Endpoints
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile

### Product Endpoints
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (vendor only)
- `PUT /api/products/:id` - Update product (vendor only)
- `DELETE /api/products/:id` - Delete product (vendor only)
- `GET /api/products/vendor/my-products` - Get vendor's products

### Order Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (vendor only)
- `GET /api/orders/vendor/my-orders` - Get vendor's orders

### File Upload Endpoints
- `POST /api/storage/upload` - Upload single file
- `POST /api/storage/upload-multiple` - Upload multiple files

## 🗄 Database Schema

The application uses the following main tables:
- `users` - User accounts and authentication
- `vendors` - Vendor profiles and business information
- `products` - Product catalog with vendor relationships
- `orders` - Order management and tracking
- `order_items` - Individual items within orders
- `reviews` - Product reviews and ratings
- `messages` - Chat messages between users and vendors
- `disputes` - Order dispute management
- `payouts` - Vendor payout tracking

## 🔧 Development

### Backend Development
```bash
cd api

# Run tests
npm run test
npm run test:e2e

# Database operations
npm run db:generate  # Generate migration files
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio

# Code quality
npm run lint
npm run format
```

### Frontend Development
```bash
cd market

# Run tests
npm run test

# Code quality
npm run lint
npm run format
```

## 🚀 Deployment

### Backend Deployment
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start:prod
```

### Frontend Deployment
1. Build the application:
```bash
npm run build
```

2. Serve the built files from a web server or CDN.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- The vibrant community of Kantin Kwari Market
- Local artisans and vendors who inspired this platform
- The open-source community for the amazing tools and libraries

## 📞 Support

For support, email support@kantinkwari.com or join our Slack channel.

---

**Built with ❤️ for the Kantin Kwari Market community**