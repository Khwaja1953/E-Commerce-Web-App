# E-Commerce Web App

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

## Features Added

### Backend
- **Cart Enhancements**: Added `getCart` endpoint to fetch user's cart items with product details populated.
- **Product Filtering**: Updated `getAllProducts` to support filtering by `category` and search by `name` (case-insensitive regex).
- **Order Refactoring**: Improved `createOrder` to accept a standard format for order items (`[{product, quantity}]`) and fixed user ID reference bugs.
- **Bug Fixes**: Corrected token verification and unified `req.user.id` usage across controllers.

### Frontend
- **Home Page**: Added search and category filter. Fixed API calls and image paths.
- **Products Page**: Implemented both list view with filters and detailed view for single products.
- **User Profile**: Created a `Profile.jsx` page where users can view and update their personal details, phone number, and shipping address.
- **Address-Aware Checkout**: Enhanced the checkout logic in `Cart.jsx` to verify the user's shipping address. If missing, the user is prompted to complete their profile before proceeding.
- **OTP Verification**: Added a `VerifyOtp.jsx` page for secure account activation via email OTP.
- **Order History**: Updated `Order.jsx` to fetch and display the logged-in user's orders from the correct backend endpoint.
- **Navigation**: Enhanced `Navbar.jsx` with conditional rendering for logged-in users, including links to Cart and Orders.
- **Bug Fixes**: Fixed missing imports (like `axios`/`API`), corrected routing in `App.jsx`, and unified authentication token handling.

## How to Run

### Backend
1. Navigate to `Backend/`
2. Install dependencies: `npm install`
3. Create a `.env` file with `MONGO_URL`, `PORT`, and `JWT_SECRET`.
4. Start the server: `npm start`

### Frontend
1. Navigate to `Frontend/`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Recent Changes Summary
- Implemented full Add-to-Cart and Checkout flow.
- Added comprehensive filtering on Home and Products pages.
- Fixed a bug in order creation where multiple quantities of the same product caused a failure.
- Fixed image paths in Order history and removed non-existent status fields.
- Standardized the use of a custom Axios instance for all API calls.
