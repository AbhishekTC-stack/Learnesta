<div align="center">

## 🎓 Learnesta

### A Modern Online Learning Platform Built with the MERN Stack

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<br/>

> **Learnesta** is a full-stack online learning platform that enables students to enroll in courses, access structured study materials, complete activities, and earn certificates — all within a secure, role-based environment.

<br/>

[🚀 Live Demo](#) · [📹 Watch Demo Video](#youtube-demo) · [🐛 Report Bug](#) · [💡 Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [How It Works](#️-how-it-works)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [API Reference](#-api-reference)
- [Installation](#-installation)
- [Running with Docker](#-running-with-docker)
- [Environment Variables](#-environment-variables)
- [YouTube Demo](#-youtube-demo)

---

## 🌟 About the Project

Learnesta is a task-based online learning platform designed to provide a complete learning experience without relying on video content. Students get access to structured text-based study materials, course activities, and a certificate system — all managed by a single admin.

The platform follows a **freemium model** — every student gets **30 days of free access** after registration. Once the trial expires, students are directed to a UPI payment page. After payment confirmation, the admin activates their account manually.

Unlike passive video-based learning, Learnesta promotes **active learning** through activity submission and admin-verified course completion — making it closer to how platforms like Google Classroom and GitHub Learning Lab work.

---

## ⚙️ How It Works

```
┌─────────────────────────────────────────────────────────┐
│                      STUDENT FLOW                        │
│                                                           │
│  Sign Up → 30-Day Free Trial Starts                      │
│       ↓                                                   │
│  Browse Courses → Enroll                                 │
│       ↓                                                   │
│  Dashboard → Start Learning                              │
│       ↓                                                   │
│  Study Materials + Activities per Course                 │
│       ↓                                                   │
│  Trial Expires → Payment Page (UPI ₹999)                 │
│       ↓                                                   │
│  Admin Verifies Payment → Account Activated              │
│       ↓                                                   │
│  Admin Issues Certificate → Student Views It             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                       ADMIN FLOW                          │
│                                                           │
│  Login → Admin Dashboard                                 │
│       ↓                                                   │
│  Add / Update / Delete Courses                           │
│       ↓                                                   │
│  Upload Study Materials (text-based)                     │
│       ↓                                                   │
│  Add Activities / Tasks with Due Dates                   │
│       ↓                                                   │
│  View Enrolled Students → Issue Certificates             │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Features

### 👨‍🎓 Student
- 🔐 Secure signup and login with JWT authentication
- 📚 Browse and enroll in courses
- 📖 Access text-based study materials per course
- ✅ View assigned activities with due dates
- 🏆 View and download certificates (after admin approval)
- ⏳ 30-day free trial with automatic expiry detection
- 💳 UPI payment page with QR code after trial expiry

### 👨‍💼 Admin
- 🛠️ Add, update, and delete courses
- 📋 Course management dashboard
- 📝 Upload study materials per course
- 📌 Add activities and tasks with due dates
- 🎓 Issue certificates to students after completion
- 👥 View students enrolled in each course

### 🔒 Security
- JWT tokens stored in `httpOnly` cookies (XSS-safe)
- bcrypt password hashing (10 salt rounds)
- Role-based protected routes (student vs admin)
- No admin signup page — admin created directly in MongoDB

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI component library |
| **Vite** | Fast build tool and dev server |
| **React Router DOM v6** | Client-side routing |
| **Tailwind CSS** | Utility-first styling |
| **Context API** | Global auth state management |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT (jsonwebtoken)** | Stateless authentication |
| **bcrypt** | Password hashing |
| **cookie-parser** | HTTP cookie middleware |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |
| **Multer** | File upload middleware |

### DevOps & Tools
| Tool | Purpose |
|------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **Postman** | API testing and documentation |
| **MongoDB Compass** | Database GUI |
| **Git & GitHub** | Version control |




## 🚀 Installation

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas
- Git

### Step 1 — Clone the repository
```bash
git clone https://github.com/yourusername/learnesta.git
cd learnesta
```

### Step 2 — Backend Setup
```bash
cd server
npm install
```

Create `.env` file inside `server/`:
```env
PORT=8000
SECRET_KEY=learnesta
MONGO_URI=mongodb://127.0.0.1:27017/learnesta
```

Start MongoDB:
```bash
sudo systemctl start mongod
```

Create admin user in MongoDB shell:
```bash
mongosh
use learnesta
db.users.insertOne({
  FirstName: "Admin",
  LastName: "Learnesta",
  UserName: "admin",
  Password: "$2b$10$4SPuhy7yHl.YBwTBzEb/buZkne9UqCSftiKIV1Do7H5F0p30uPa/e",
  UserRole: "admin",
  EnrolledCourses: [],
  TrialStartDate: new Date(),
  IsPaid: true
})
```

> 🔑 Admin credentials — `username: admin` | `password: password`

Start the backend:
```bash
node index.js
```

Expected output:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:8000
```

### Step 3 — Frontend Setup
```bash
cd UI
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## 🐳 Running with Docker

Make sure Docker and Docker Compose are installed.

### Start all containers
```bash
docker-compose up --build
```

### Run in background
```bash
docker-compose up -d --build
```

### Stop all containers
```bash
docker-compose down
```

### View running containers
```bash
docker ps
```

### View logs
```bash
# All containers
docker-compose logs

# Backend only
docker-compose logs server

# Frontend only
docker-compose logs client
```

### Rebuild after code changes
```bash
docker-compose up --build --force-recreate
```

### Docker Services
| Service | Container | Port |
|---------|-----------|------|
| Frontend (React) | `learnesta-client` | `5173` |
| Backend (Express) | `learnesta-server` | `8000` |
| Database (MongoDB) | `learnesta-mongo` | `27017` |

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `8000` |
| `SECRET_KEY` | JWT signing secret key | `learnesta` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/learnesta` |

---

## 📹 Video Demo

<div align="center">

>_[https://drive.google.com/file/d/18J4XvFnrU-5Hx5rVgM6sa3eixjtQqwkb/view?usp=drive_link]_

</div>

| Video | Description |
|-------|-------------|
| 🎬 [Full Project Demo](#) | Complete walkthrough of Learnesta |
| 👨‍💼 [Admin Dashboard Demo](#) | Course management, materials, certificates |
| 👨‍🎓 [Student Flow Demo](#) | Signup, enroll, learn, get certificate |
| 🔐 [Authentication Demo](#) | JWT login, protected routes, trial system |

---


<div align="center">



[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)

</div>

---


