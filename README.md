# ShopFlow — E-Commerce Product Explorer & Cart App

A complete React + Vite e-commerce application built with the GoCart UI template, adapted to the PRD specifications.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🛍️ Features

| Feature | Details |
|---|---|
| Product Listing | Responsive 4-col grid, FakeStoreAPI |
| Product Search | Debounced live search |
| Category Filters | Tab-based + URL param sync |
| Price Filters | Range-based dropdown filter |
| Sorting | Price ↑↓, Rating, Newest |
| Product Details | Image, description, reviews tab, related products |
| Shopping Cart | Add/remove/update, table layout, order summary |
| Wishlist | Heart toggle, dedicated wishlist page |
| Checkout | Address form, payment options, tax calc, success screen |

## 📂 Structure

```
src/
├── components/     # Reusable UI (Navbar, ProductCard, Counter, Hero…)
├── context/        # CartContext (cart + wishlist global state)
├── hooks/          # useProducts, useCart, useDebounce
├── layout/         # MainLayout (Banner + Navbar + Footer)
├── pages/          # Home, Products, ProductDetail, Cart, Wishlist, Checkout
└── services/       # api.js (FakeStoreAPI axios client)
```

## 🔗 Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/products` | Product listing with filters |
| `/products/:id` | Product detail |
| `/wishlist` | Saved products |
| `/cart` | Shopping cart |
| `/checkout` | Checkout & order summary |

## 🔧 Tech Stack

- React 19 + Vite
- React Router DOM v7
- Tailwind CSS v4
- Context API (global cart + wishlist)
- Axios + FakeStoreAPI
- react-hot-toast
- lucide-react
