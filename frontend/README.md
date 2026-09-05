# 🍽️ Tadka — Food Ordering System

A modern, full-stack food ordering web application built with **React, Node.js, Express, and MongoDB**. Tadka provides a responsive customer ordering experience along with a management interface for maintaining food items.

🔗 **Live Demo:** https://food-ordering-system-jade.vercel.app/

---

## 📌 Overview

**Tadka** is a full-stack food ordering platform designed to simulate a real-world restaurant ordering system.

Customers can browse food items, search and filter the menu, add items to their cart, manage quantities, and proceed through a demo checkout flow.

The application also includes a management interface that allows restaurant staff to add, update, delete, and manage the availability of food items.

The project demonstrates the integration of a **React frontend, REST API backend, and MongoDB database** into a complete deployed web application.

---

## ✨ Features

### 👤 Customer Experience

- Browse available food items
- Search dishes by name and description
- Filter food by category
- View detailed food information
- Add items to cart
- Increase or decrease item quantities
- Remove items from cart
- View order summary
- Favorites / wishlist functionality
- Responsive checkout experience
- Demo order placement flow
- Loading, empty, and error states
- Responsive design for desktop, tablet, and mobile

### 👨‍💼 Food Management

- Add new food items
- Edit existing food items
- Delete food items
- Toggle food availability
- View all food items
- Manage food categories
- Search and filter food items
- Management dashboard interface

### ⚡ Technical Features

- RESTful API architecture
- MongoDB database integration
- Mongoose data modeling
- React component-based architecture
- Centralized API service layer
- Client-side cart state management
- Environment-based configuration
- CORS support
- Responsive UI
- Vercel deployment
- GitHub-based continuous deployment

---

## 🛠️ Tech Stack

### Frontend

- **React**
- **Vite**
- **React Router**
- **JavaScript**
- **CSS**

### Backend

- **Node.js**
- **Express.js**
- **Mongoose**
- **MongoDB**
- **CORS**
- **dotenv**

### Tools & Deployment

- **Git**
- **GitHub**
- **Vercel**
- **MongoDB Atlas**
- VS Code



🏗️ Project Architecture

text
                    ┌─────────────────────┐
                    │       Customer      │
                    │      Web Browser    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       + Vite        │
                    └──────────┬──────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │      Node.js        │
                    └──────────┬──────────┘
                               │
                         Mongoose ODM
                               │
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    └─────────────────────┘
