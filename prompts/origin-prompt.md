### **Kantin Kwari Online: AI-Assisted Development Prompt Guide**

This document provides a structured sequence of prompts to guide an AI assistant in building a minimum viable product (MVP) for a localized e-commerce platform.

### **Phase 0: Project Setup & General Directives**

Initial Prompt:

"This is a new ReactJS project named market that uses vite/react and TypeScript template. Set up the project structure with the following directories inside /src: components, pages, hooks, services, state, and utils."

**Core Instructions (To be referenced in subsequent prompts):**

- **Technology Stack:** All frontend components and pages will be built with React and TypeScript (.tsx).
- **File Naming:** All file and folder names should be **hyphenated and lowercase** (e.g., main-layout.tsx, product-cards).
- **Routing:** Use react-router for application routes".
- **Styling:** All styling must be done using Tailwind CSS utility classes. No custom CSS files unless absolutely necessary for a complex, unique component.
- **Component Source:** The /examples directory contains pre-built components from Tailwind UI for inspiration. You are encouraged to adapt these components or create new ones from scratch to best fit the project's requirements. **You do not need to follow the examples exactly.**
- **Component Structure:** Create modular and reusable components. Each component should be in its own file within the /src/components directory, organized into subdirectories (e.g., /components/ui, /components/product, /components/layout).
- **Code Quality:** Ensure all code is clean, well-commented, and follows React best practices, including the use of functional components and hooks.
- **Localization:** The platform should support both English and Hausa languages. Create a localization system using React Context or a similar state management solution. All user-facing text should be translatable.
- **Theme:** Use the custom color palette defined in index.css:
  - Primary: #766153ff (umber)
  - Secondary: #bcbd8bff (sage)
  - White Smoke: #eff1edff
  - Drab Dark Brown: #373d20ff
  - Reseda Green: #717744ff
  - These colors should be used consistently throughout the UI to create a cohesive theme that reflects the local Kano, Nigeria aesthetic.
- **Cultural Context:** The platform is specifically designed for Kano, Nigeria. Content, imagery, and user experience should be culturally appropriate and relevant to the local market.

### examples **Directory Reference (Updated)**

Use this glossary to find component examples for inspiration based on your directory.

- /store-navigation: For navbars, headers, and potentially footers.
- /promo-section: For hero sections and promotional banners.
- /incentives: For smaller banners or sections highlighting benefits (e.g., free shipping).
- /category-previews: For grids or lists that display product categories.
- /product-lists: For grids displaying multiple products. **This is where to look for product card designs.**
- /product-overviews: For the main view on a product detail page, including image galleries.
- /product-features: For sections detailing specific product features.
- /category-filters: For filter sidebars on product listing pages.
- /checkout-forms: For forms used in the checkout process.
- /shopping-carts: For cart layouts and item lists.
- /order-summaries: For summarizing an order during checkout.
- /order-history: For displaying past orders in a user's account.
- /reviews: For customer review and rating sections.
- /product-quickviews: For modal/popup views of a product from a list.
- **Note:** Dashboard-specific components like layouts or stat cards are not in this list. They will need to be built by combining elements from other components (e.g., using tables from /order-history and general layout principles).

### **Phase 1: Public-Facing Marketplace UI**

#### **1.1. Layout & Navigation**

Prompt \#1.1:

"Create a main layout component at /src/components/layout/main-layout.tsx. This component should include a responsive navbar and a footer.

- **Navbar:** Find inspiration in /examples/store-navigation. It needs a logo, a prominent search bar, links for 'Categories' and 'Deals', and icons for 'Cart' and 'User Profile'.
- Footer: Find inspiration in /examples/store-navigation or create a suitable one. It should include links to 'About Us', 'Contact', 'Terms of Service', and social media icons.  
  This layout will wrap all public-facing pages."

#### **1.2. Homepage**

Prompt \#1.2:

"Create the homepage at /src/pages/home-page.tsx using the main-layout.

The structure should be:

1. **Hero Section:** Inspired by /examples/promo-section, with a headline like 'The Heart of Kano's Commerce, Delivered to You' and a 'Shop Now' button.
2. **Categories Display:** Create a category-grid.tsx component. Inspired by /examples/category-previews, it should display 4-6 main product categories with an image and title each.
3. **Featured Products Section:** Create a product-grid.tsx component. Use card designs found within /examples/product-lists to display 8-12 featured products (image, name, price, seller's store name). Use placeholder data.
4. **Promotional Banner:** Add a banner inspired by /examples/incentives or /examples/promo-section."

#### **1.3. Product Pages**

Prompt \#1.3:

"Create a product listing page at /src/pages/product-list-page.tsx.

- **Layout:** Two columns: filters on the left, product grid on the right.
- **Filters:** Create a product-filters.tsx component, taking inspiration from /examples/category-filters. Include filters for 'Price Range', 'Seller', and 'Sub-category'.
- **Product Grid:** Reuse the product-grid.tsx component, which is based on designs from /examples/product-lists.
- **Sorting:** Add a dropdown to sort products."

Prompt \#1.4:

"Create a product detail page at /src/pages/product-detail-page.tsx.

- **Layout:** Use a component inspired by /examples/product-overviews as the main structure.
- **Left Column:** The image gallery from the product overview.
- **Right Column:** Product Name, Seller Name, Price, Description, Quantity selector, and 'Add to Cart' button.
- **Below:** Add a product-features.tsx section and a customer-reviews.tsx component inspired by /examples/reviews."

#### **1.4. Cart & Checkout**

Prompt \#1.5:

"Create a shopping cart page at /src/pages/cart-page.tsx.

- Use a layout from /examples/shopping-carts as a reference.
- List items with adjustable quantity.
- Show a price summary (you can use /examples/order-summaries for inspiration) and a button to proceed to a checkout page that will use /examples/checkout-forms."

### **Phase 2: Seller's Admin Dashboard**

#### **2.1. Dashboard Layout**

Prompt \#2.1:

"Create a new layout at /src/components/layout/dashboard-layout.tsx.

- Since there's no direct dashboard layout example, create a two-column layout from scratch.
- The left column will be a sidebar for navigation. The right will be the main content area.
- Sidebar links: 'Dashboard', 'Products', 'Orders', 'Settings'."

#### **2.2. Dashboard Pages**

Prompt \#2.2:

"Create the main dashboard page at /src/pages/admin/dashboard-page.tsx.

- Use the dashboard-layout.
- Display key metrics by creating simple stat-card.tsx components.
- Include a simple sales chart (placeholder image) and a 'Recent Orders' table. For the table, take inspiration from the structure in /examples/order-history."

Prompt \#2.3:

"Create a product management page at /src/pages/admin/product-management-page.tsx.

- Use the dashboard-layout.
- Display a table of the seller's products, using /examples/order-history or /examples/shopping-carts for table structure ideas.
- Include an 'Add New Product' button that opens a modal containing a form."

Prompt \#2.4:

"Create an order management page at /src/pages/admin/order-management-page.tsx.

- Use the dashboard-layout.
- Display a table of orders inspired by /examples/order-history, with an updatable status."

### **Phase 3: NestJS Backend**

Initial Prompt:

"Initialize a new NestJS project named kwari-market-api. Set up a connection to a PostgreSQL database using Drizzle ORM. Create a .env file for database credentials and JWT secrets."

**Core Instructions:**

- **Structure:** Use the standard NestJS modular structure (Module, Controller, Service).
- **ORM:** All database interactions must be handled through Drizzle ORM schemas and queries.
- **Validation:** Use class-validator and class-transformer for request payload validation.
- **Authentication:** Use Passport.js with the JWT strategy for securing endpoints.

**Prompts:**

1. **Schema:** "Define the Drizzle ORM schemas for: User, SellerProfile, Product, Category, Order, and OrderItem. Ensure relationships are correctly defined."
2. **Auth Module:** "Create an AuthModule. Implement register and login endpoints."
3. **Products Module:** "Create a ProductsModule. Implement public findAll/findOne endpoints and protected CRUD endpoints for sellers."
4. **Orders Module:** "Create an OrdersModule. Implement a protected createOrder endpoint, endpoints for users and sellers to view their orders, and an endpoint for sellers to update order status."

### **Phase 4: Connecting Frontend & Backend**

**Core Instructions:**

- **API Client:** Use axios for all API requests. Create a centralized API client.
- **State Management:** Use Zustand or React Context for managing global state like auth and cart.

**Prompts:**

1. **Auth Service:** "In the React app, create /src/services/auth.service.ts. Implement login and register functions. Create a useAuth hook in /src/hooks to manage user state."
2. **Product Service:** "Create /src/services/product.service.ts. Implement functions to fetch product data and connect them to the public-facing product pages."
3. **Cart State:** "Create a useCart store (Zustand) to manage the shopping cart state and connect it to the UI."
4. **Connect Seller Dashboard:** "Refactor the seller dashboard pages to fetch and send data to the protected NestJS endpoints."
