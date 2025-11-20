📘 Community Health Portal – MERN Stack Project

A full-stack Community Health Portal built using the MERN stack (MongoDB, Express.js, React (Vite), and Node.js).

The application allows users to register, log in, and access health-related features, while administrators can manage users, publish articles, and view reports from a robust admin dashboard.

🚀 Project Features
👤 User Features

User registration & login (JWT authentication)

Secure password hashing using bcrypt

View health articles and community updates

Access personalized dashboard

Responsive UI built using React + TailwindCSS

Toast notifications & client-side validation

🛡 Admin Features

Dedicated Admin Login

Manage users (view, update, delete)

Add, edit, and delete health articles

View dashboard metrics & reports

Protected admin-only routes (role-based access control)

🏗 Technology Stack
Frontend (Client)

React (Vite)

React Router DOM

TailwindCSS

Axios

Context API for Authentication

Toast notifications (react-hot-toast)

Backend (Server)

Node.js + Express.js

MongoDB + Mongoose

JWT Authentication

Bcrypt for password hashing

Role-based authorization

CORS + dotenv configuration

Database

MongoDB (Local or Cloud – Atlas)

📁 Project Structure
Client Folder Structure
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   │   └── useApi.js
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
└── postcss.config.js

Server Folder Structure
Server/
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middleware/
│   ├── authMiddleware.js
│   └── isAdmin.js
├── models/
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── adminSetup.js (temporary to create first admin)
├── .env
└── server.js

🔑 Environment Variables
Client (.env)
VITE_API_URL=http://localhost:5000/api

Server (.env)
PORT=5000
MONGO_URI=mongodb://localhost:27017/community_health_portal
JWT_SECRET=your_jwt_secret_key

📦 Installation & Setup
Prerequisites

Node.js installed

MongoDB installed or MongoDB Atlas account

npm or yarn

1️⃣ Clone the Repository
git clone https://github.com/yourusername/community-health-portal.git
cd community-health-portal

🖥 Backend Setup
cd Server
npm install

Start backend server:
npm run dev

If MongoDB is not running

Start MongoDB local service:

net start MongoDB

🌐 Frontend Setup
cd client
npm install

Start frontend:
npm run dev


The app runs on:

Frontend: http://localhost:5173

Backend: http://localhost:5000

🔐 Creating the First Admin

Once backend is running, visit:

http://localhost:5000/api/setup/create-admin


This will generate:

email: admin@example.com

password: Admin@123

role: admin

⚠️ Remove the file (adminSetup.js) after admin creation.

🛡 Authentication Flow

User/admin registers or logs in

Server returns JWT + role

React saves token in localStorage

Protected routes check:

If user is authenticated

If admin has correct role

Admin pages use:

if (role !== "admin") redirect();


Backend routes use:

authMiddleware → isAdmin

📡 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login & get token
User Management
Method	Endpoint	Protected	Description
GET	/api/users	Admin	Get all users
GET	/api/users/:id	Auth	Get single user
DELETE	/api/users/:id	Admin	Delete a user
Articles

(If implemented)

Method	Endpoint	Protected	Description
POST	/api/articles	Admin	Create article
GET	/api/articles	Public	List articles
📊 Admin Dashboard Features

Total users count

Total articles

Recently registered users

Edit/delete user accounts

Publish health articles

View system usage stats

Clean Tailwind-powered admin UI
