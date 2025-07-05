# 🏟️ Turf Booking Portal

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application that allows users to browse, book, and manage turf ground reservations with ease.

---

## 📌 Features

* 🔐 User Registration & Login
* 📅 Turf Scheduling & Time Slot Selection
* 🧾 Booking Management for Users and Admins
* 🏟️ Turf Listing with Availability Status
* 📊 Admin Dashboard for Turf Owners

---

## 🛠️ Tech Stack

### Frontend:

* **React.js**
* **Redux**
* **Tailwind CSS**

### Backend:

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**

---

## 📁 Project Structure

```
Turf-Booking-Portal/
│
├── admin/               # Admin panel frontend
│   └── ...              # Admin-related components and pages
│
├── client/               # React frontend
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
├── package.json         

```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v14+)
* MongoDB (local or Atlas)
* Git

### Clone the Repository

```bash
git clone https://github.com/OmkarYelve/Turf-Booking-Portal.git
cd Turf-Booking-Portal
```

### Backend Setup

```bash
cd server
npm install
touch .env
```

Add environment variables to `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

### Frontend Setup

```bash
cd ../client
npm install
npm start
```



---

## 🧪 Future Enhancements

* ✅ Payment Gateway Integration
* 📱 PWA support for mobile users
* 🗺️ Map-based Turf Selection
* 📊 Real-time Booking Analytics

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request



## 👨‍💻 Author

**Omkar Yelve**
[GitHub](https://github.com/OmkarYelve)

---

