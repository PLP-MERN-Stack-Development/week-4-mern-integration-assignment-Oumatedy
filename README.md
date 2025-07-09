# Dev Task Manager

A full-stack MERN (MongoDB, Express, React, Node.js) task management application with authentication, protected routes, and full CRUD for tasks.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [How to Use](#how-to-use)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Project Overview
Dev Task Manager is a productivity web app that allows users to securely manage their personal tasks. It demonstrates a complete MERN stack integration with modern best practices, including JWT authentication, protected API routes, and a responsive React UI.

---

## Features
- User registration and login (JWT authentication)
- Protected routes (frontend and backend)
- Add, edit, complete, and delete tasks (CRUD)
- Dashboard with task list and status
- Responsive design with dark/light mode toggle
- User profile menu with logout
- Toast notifications for actions
- Clean, modern UI

---

## Screenshots
> _Add screenshots to a `/screenshots` folder and reference them here._

- ![Login Page](screenshots/login.png)
- ![Dashboard](screenshots/dashboard.png)
- ![Add Task Dialog](screenshots/add-task.png)
- ![Dark Mode](screenshots/dark-mode.png)

---

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- pnpm (or npm/yarn)

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Setup the Server
```sh
cd server
cp .env.example .env # Fill in your MongoDB URI and JWT secret
pnpm install # or npm install
pnpm start   # or npm start
```

### 3. Setup the Client
```sh
cd ../client
cp .env.example .env # (if needed, for Vite config)
pnpm install # or npm install
pnpm dev     # or npm start
```

### 4. Open the App
- Client: http://localhost:5173
- Server: http://localhost:5000

---

## API Documentation

### Auth Endpoints
- `POST /api/auth/signup` — Register a new user
  - Body: `{ "email": "user@example.com", "password": "yourpassword" }`
- `POST /api/auth/login` — Log in
  - Body: `{ "email": "user@example.com", "password": "yourpassword" }`
  - Returns: `{ "token": "<jwt>" }`

### Task Endpoints _(require Authorization header: `Bearer <token>`)_
- `GET /api/tasks` — Get all tasks for the logged-in user
- `POST /api/tasks` — Create a new task
  - Body: `{ "title": "Task title", "description": "Task details" }`
- `PUT /api/tasks/:id` — Update a task (e.g., mark complete)
  - Body: `{ "title?": "...", "description?": "...", "completed?": true }`
- `DELETE /api/tasks/:id` — Delete a task

#### Example: Authenticated Request
```
GET /api/tasks
Authorization: Bearer <your_token_here>
```

---

## Environment Variables

### server/.env.example
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### client/.env.example
```
# (Usually not needed unless you use Vite env vars)
VITE_API_URL=http://localhost:5000/api
```

---

## Folder Structure
```
week-4-mern-integration-assignment-Oumatedy/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── README.md
```

---

## How to Use
1. Register a new account or log in.
2. Add, edit, complete, or delete your tasks from the dashboard.
3. Use the theme toggle for dark/light mode.
4. Log out from the profile menu.

---

## Troubleshooting
- **Port in use:** Change the `PORT` in `.env` if 5000 is busy.
- **MongoDB connection error:** Check your `MONGO_URI` in `.env`.
- **JWT errors:** Ensure `JWT_SECRET` is set and matches in your `.env`.
- **CORS issues:** Make sure both client and server are running on allowed origins.
- **API 404/401:** Ensure you are sending the correct `Authorization` header and the backend is running.

---

## License
This project is for educational purposes.

---

**Happy coding!**