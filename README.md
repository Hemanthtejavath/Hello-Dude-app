
<h1 align="center">🚀 HelloDude – Real-Time Chat & Video Calling Platform</h1>
---

# 🌟 Project Overview

**HelloDude** is a **full-stack real-time chat and video calling application** that allows users to communicate through messages, voice, and video calls.

The platform provides a **modern interface, secure authentication, and scalable architecture**, making it suitable for real-time communication systems.

---
<p align="center">
  <img src="frontend/public/logo.png" width="950" alt="HelloDude Banner"/>
</p>


<p align="center">
A modern full-stack communication platform for messaging and video calls.
</p>

<p align="center">
<img src="https://img.shields.io/badge/React-Frontend-blue?logo=react"/>
<img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js"/>
<img src="https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb"/>
<img src="https://img.shields.io/badge/TailwindCSS-UI-38bdf8?logo=tailwindcss"/>
<img src="https://img.shields.io/badge/Zustand-State-orange"/>
<img src="https://img.shields.io/badge/TanStack_Query-Data-red"/>
<img src="https://img.shields.io/badge/Stream-Realtime-purple"/>
</p>



# ✨ Key Features

### 💬 Real-Time Messaging

* Instant chat system
* Typing indicators
* Emoji reactions
* Message updates in real time

### 📹 Video Calling

* One-to-one video calls
* Group video calls
* Screen sharing
* Call recording

### 🔐 Authentication & Security

* JWT based authentication
* Protected routes
* Secure login & signup

### 🎨 UI Customization

* 32 unique UI themes
* Responsive design
* TailwindCSS styling

### ⚡ Performance

* Global state management with **Zustand**
* Efficient data fetching with **TanStack Query**

### 🌍 Language Exchange

* Connect with people globally
* Practice languages through real-time chat

---

# 🛠 Tech Stack

## Frontend

* React
* TailwindCSS
* Zustand
* TanStack Query

## Backend

* Node.js
* Express.js
* MongoDB

## Realtime Services

* Stream Chat API
* Stream Video API

---

# 🏗 System Architecture

```text
User Browser
      │
      ▼
React Frontend (Vite + Tailwind)
      │
      ▼
Node.js / Express API
      │
      ▼
MongoDB Database
      │
      ▼
Stream API (Chat & Video Calls)
```

---

# 📂 Project Structure

```
project-root
│
├── backend
│   ├── src
│   ├── routes
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── public
│   │   └── logo.png
│   ├── src
│   └── .env
│
└── README.md
```

---

# 🧪 Environment Variables Setup

## Backend (`backend/.env`)

Create a `.env` file inside the backend folder.

```
PORT=5001

MONGO_URI=your_mongodb_connection_string

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

JWT_SECRET_KEY=your_secret_key

NODE_ENV=development
```

---

## Frontend (`frontend/.env`)

Create a `.env` file inside the frontend folder.

```
VITE_STREAM_API_KEY=your_stream_api_key
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```
git clone https://github.com/your-username/hellodude-chat-app.git
cd hellodude-chat-app
```

---

## 2️⃣ Install Backend

```
cd backend
npm install
npm run dev
```

---

## 3️⃣ Install Frontend

```
cd frontend
npm install
npm run dev
```

# 🚀 Future Improvements

* Push notifications
* Voice messages
* AI chat assistant
* Mobile app version

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a pull request

---

# 👨‍💻 Author

**Hemant Tejavath**
B.Tech 
Indian Institute of Technology Patna

---

# ⭐ Support

If you like this project, please consider **starring the repository ⭐**
