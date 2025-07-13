# Kantin Kwari Market API

A NestJS-based REST API for the Kantin Kwari Market e-commerce platform.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: User registration, login, and profile management
- **Product Management**: CRUD operations for products with vendor-specific access
- **Order Management**: Order creation, tracking, and status updates
- **File Upload**: GCP Cloud Storage integration for image uploads
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT with Passport
- **File Storage**: Google Cloud Storage
- **Validation**: class-validator & class-transformer
- **Language**: TypeScript

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Google Cloud Platform account (for file storage)
- Paystack account (for payments)

## Installation

1. Clone the repository and navigate to the API directory:
```bash
cd api
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file:
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

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (vendor only)
- `PUT /api/products/:id` - Update product (vendor only)
- `DELETE /api/products/:id` - Delete product (vendor only)
- `GET /api/products/vendor/my-products` - Get vendor's products

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (vendor only)
- `GET /api/orders/vendor/my-orders` - Get vendor's orders

### File Upload
- `POST /api/storage/upload` - Upload single file
- `POST /api/storage/upload-multiple` - Upload multiple files

## Database Schema

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

## Development

### Running Tests
```bash
npm run test
npm run test:e2e
```

### Database Operations
```bash
npm run db:generate  # Generate migration files
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
```

### Code Quality
```bash
npm run lint
npm run format
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start:prod
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_HOST` | PostgreSQL host | Yes |
| `DB_PORT` | PostgreSQL port | Yes |
| `DB_USER` | Database username | Yes |
| `DB_PASSWORD` | Database password | Yes |
| `DB_NAME` | Database name | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `PORT` | Server port | No (default: 3000) |
| `FRONTEND_URL` | Frontend URL for CORS | No |
| `GCP_PROJECT_ID` | Google Cloud Project ID | Yes |
| `GCP_BUCKET_NAME` | GCS bucket name | Yes |
| `GCP_PRIVATE_KEY` | GCP service account private key | Yes |
| `GCP_CLIENT_EMAIL` | GCP service account email | Yes |
| `PAYSTACK_SECRET_KEY` | Paystack secret key | Yes |
| `PAYSTACK_PUBLIC_KEY` | Paystack public key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
