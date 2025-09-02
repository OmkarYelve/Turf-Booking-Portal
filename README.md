# 🏟️ Turf Booking Portal

![GitHub repo size](https://img.shields.io/github/repo-size/OmkarYelve/Turf-Booking-Portal)
![GitHub last commit](https://img.shields.io/github/last-commit/OmkarYelve/Turf-Booking-Portal)
![GitHub issues](https://img.shields.io/github/issues/OmkarYelve/Turf-Booking-Portal)
![GitHub forks](https://img.shields.io/github/forks/OmkarYelve/Turf-Booking-Portal?style=social)
![GitHub stars](https://img.shields.io/github/stars/OmkarYelve/Turf-Booking-Portal?style=social)

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application that allows users to browse, book, and manage turf ground reservations with ease.


A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application that allows users to browse, book, and manage turf ground reservations with ease. Admins have access to a dashboard to manage bookings and turf availability.

> 🌐 Live Site: [turf-booking-portal-hb1k.vercel.app](https://turf-booking-portal-hb1k.vercel.app)

---

## 📌 Features

- 🔐 User Registration & Authentication
- 📅 Turf Scheduling & Time Slot Selection
- 🧾 Booking Management for Users and Admins
- 🏟️ Turf Listing with Availability Status
- 📊 Admin Dashboard for Turf Owners

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js
- Redux
- Tailwind CSS

### 🖥 Backend
- Node.js
- Express.js
- MongoDB with Mongoose

---

## 🖼️ Project Screenshots

### 🏠 Home Page
![Home Page](./images/home-page.png)

---

### ⚽ Grounds Listing Page
![Grounds Page](./images/grounds-page.png)

---

### 📅 User Bookings Page
![Check Bookings](./images/check-bookings.png)

---

### 🔧 Admin Dashboard – Home
![Admin Home](./images/admin-home.png)

---

### 📋 Admin Dashboard – Bookings Overview
![Admin Bookings](./images/admin-bookings.png)

---

## 📁 Project Structure

```

Turf-Booking-Portal/
│
├── admin/               # Admin panel frontend
│   └── ...              # Admin-related components and pages
│
├── client/              # React frontend (user)
│   └── ...              # Components, pages, assets, etc.
│
├── server/              # Backend (Node.js + Express)
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── config/
│   └── server.js
│
├── .gitignore
├── .env
├── README.md
└── package.json

````

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

---

### 📦 Clone the Repository

```bash
git clone https://github.com/OmkarYelve/Turf-Booking-Portal.git
cd Turf-Booking-Portal
````

---

### 🔌 Backend Setup

```bash
cd server
npm install
touch .env
```

Add environment variables to `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm start
```

---

### 💻 Frontend Setup (User)

```bash
cd ../client
npm install
npm run dev
```

### 🔐 Admin Panel Setup

```bash
cd ../admin
npm install
npm run dev
```

---

## 🔮 Future Enhancements

* 💳 Payment Gateway Integration (Stripe/Razorpay)
* 📱 PWA Support for mobile experience
* 🗺️ Map-based Turf Discovery (Google Maps API)
* 📊 Real-time Admin Analytics & Graphs
* 📩 Email/SMS Booking Confirmations

---

## 🤝 Contributing

Want to improve the project?

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request ✅

---

## 👨‍💻 Author

**Omkar Yelve**
[GitHub Profile](https://github.com/OmkarYelve)

---

> ⭐ If you like this project, consider starring the repo to show support!

````

