# Project Proposal & Technical Specification: **Kantin Kwari Market**

## 1. The Big Idea

Kantin Kwari Market is a hyper-localized e-commerce platform that bridges the gap between the vibrant physical marketplaces of Kano, Nigeria, and the digital world. Unlike generic e-commerce sites, our platform provides a digital storefront for real vendors operating within renowned local markets, starting with the famous Kantin Kwari Market.

Our mission is to empower local artisans and traders by giving them access to a wider audience while offering customers an authentic and trustworthy online shopping experience that celebrates the region’s unique culture and craftsmanship.

---

## 2. Core Features & “The Twist”

- **Verified Local Vendors** – Every seller is a verified, real-life vendor with a physical presence in a partner market. This builds trust and authenticity.
- **Hyper-Local Focus** – Centered on Kano, offering features such as local pickup options, intra-city delivery, and content showcasing artisan stories.
- **Dual Language Support** – Full localization in **English** and **Hausa** for community accessibility.
- **Role-Based System**
  - **User** – Browses, buys, and reviews products.
  - **Vendor** – Manages a digital storefront, products, and orders.
  - **Admin** – Oversees vendor/user management, dispute resolution, and platform health.
- **Integrated Backend** – A robust NestJS API, powered by PostgreSQL via Drizzle ORM, handles authentication, product management, orders, and payments.

---

## 3. Current Frontend Analysis

The existing frontend is a React application built with **Vite** and styled using **Tailwind CSS**.

| Area                           | Notes                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| **Project Structure**          | Logical directories: `components`, `pages`, `hooks`, `services`, `state`, `types`. |
| **Core Layout**                | `main-layout.tsx` provides a responsive navigation bar and footer.                 |
| **Routing**                    | `App.tsx` sets up public and admin routes with `react-router-dom`.                 |
| **State Management (zustand)** | Stores for auth, cart, wishlist, and search are established.                       |
| **UI Components**              | Product grids, page headers, admin dashboard elements, etc.                        |
| **Localization**               | `language-context.tsx` handles English and Hausa translations.                     |

**Conclusion:** The frontend foundation is solid. Next steps: connect to a live backend, implement state-store logic, and complete remaining UI screens.

---

## 4. Backend (NestJS) Technical Specifications

### 4.1. API Design Principles

1. **RESTful architecture** for all endpoints.
2. **Standard JSON response format:**

```json
{
  "status": "success" | "error",
  "statusCode": 200,
  "message": "Human-readable message",
  "data": {},
  "pagination": {}
}
```

3. **Validation** using `class-validator` and `class-transformer`.
4. **Authentication** protected by Passport JWT (`Authorization: Bearer <token>`).

---

### 4.2. Database Schema (Drizzle ORM for PostgreSQL)

| Table           | Key Columns                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------- | --------------------------------------------- |
| **users**       | `id`, `email`, `password_hash`, `first_name`, `last_name`, `role (user                                                 | vendor   | admin)`, `is_verified`, `created_at`        |
| **vendors**     | `id`, `user_id (FK)`, `business_name`, `business_description`, `status (pending                                        | approved | suspended)`, `market_id (FK)`, `created_at` |
| **products**    | `id`, `vendor_id (FK)`, `name`, `description`, `price`, `stock_quantity`, `category`, `images (JSONB[])`, `created_at` |
| **orders**      | `id`, `user_id (FK)`, `total_amount`, `status (pending                                                                 | shipped  | delivered                                   | cancelled)`, `shipping_address`, `created_at` |
| **order_items** | `id`, `order_id (FK)`, `product_id (FK)`, `quantity`, `price_at_purchase`                                              |
| **reviews**     | `id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`                                                       |
| **messages**    | `id`, `conversation_id`, `sender_id`, `content`, `created_at`                                                          |
| **disputes**    | `id`, `order_id`, `user_id`, `vendor_id`, `reason`, `status`, `resolution`                                             |
| **payouts**     | `id`, `vendor_id`, `amount`, `status`, `processed_at`                                                                  |

---

### 4.3. Backend Module Breakdown

| Module                       | Endpoints                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| **AuthModule**               | `POST /register`, `POST /login`                                                                         |
| **UsersModule**              | `GET /me`, `PUT /me`                                                                                    |
| **ProductsModule**           | `GET /products`, `GET /products/{id}`, `POST /products` (Vendor), `PUT /products/{id}` (Vendor)         |
| **OrdersModule**             | `POST /orders`, `GET /orders` (User), `GET /vendor/orders` (Vendor), `PUT /vendor/orders/{id}` (Vendor) |
| **AdminModule**              | `GET /admin/vendors`, `PUT /admin/vendors/{id}/status`, `GET /admin/disputes`                           |
| **PaymentModule (Paystack)** | `POST /payments/initialize`, `GET /payments/verify/{reference}`, `POST /payments/webhook`               |

---

## 5. Necessary but Missing Features

### 5.1. Advanced Search & Filtering

- **Faceted search** across category, price, seller, ratings, etc.
- Requires a dedicated search service (e.g., Elasticsearch or Algolia).

### 5.2. Real-Time Messaging System

- Buyer–vendor chat via **WebSockets** (NestJS + Socket.io).

### 5.3. Vendor Payout Management

- Earnings calculation, vendor dashboard, Paystack Transfers integration.

### 5.4. User and Vendor Notifications

- In-app + email notifications using a job queue (Redis/BullMQ).
- Related UI: `notifications-page.tsx`.

### 5.5. Inventory Management with Variants

- Variant-level stock / pricing via a `variants` JSONB field.
- Frontend store already considers this (`cart.store.ts`).

### 5.6. Admin-Led Dispute Resolution

- Formal dispute flow (UI exists in `dispute-resolution-page.tsx`).
- Requires `disputes` table + admin endpoints.

### 5.7. Analytics and Reporting

- Dashboards for vendors/admins (UI: `analytics-page.tsx`).
- Backend aggregation queries for metrics.

---

## 6. Frontend Implementation Plan (What’s Next)

1. **Connect Services to Backend** – Update `auth.service.ts`, `product.service.ts`, etc.
2. **Implement Authentication Pages** – Create `LoginPage.tsx` & `RegisterPage.tsx`; wire to `useAuthStore`.
3. **Business Logic Integration**
   - Sync `useCartStore` and `useWishlistStore` with backend endpoints.
   - Tie vendor/admin dashboards to protected routes.
4. **Build Remaining UI** – Finish any screens outlined in the initial proposal.

---

_Prepared for the Kantin Kwari Market team – happy building!_
