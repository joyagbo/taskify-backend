# Taskify Backend API

Taskify is a production-grade RESTful Task Management API built with **Node.js**, **Express**, and **MongoDB**. It allows users to create, update, delete, and manage their tasks with automatic status updates based on due dates and activity.

## Live API
**Base URL:** `https://taskify-backend-984v.onrender.com`  
**Interactive Docs:** `https://taskify-backend-984v.onrender.com/api-docs`

## Features

- User registration and login with JWT authentication
- Role-based access control (User and Admin roles)
- Create, read, update, delete (CRUD) tasks
- Auto-set task status: `pending`, `in-progress`, `overdue`, `completed`
- Pagination, filtering, and sorting support
- Auto-log day of task creation
- Interactive API documentation with Swagger UI
- Follows REST API best practices

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Documentation:** Swagger UI (OpenAPI 3.0)
- **Deployment:** Render

## Folder Structure

```
src/
├── config/
│   ├── db.js
│   └── swagger.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── taskModel.js
│   ├── tokenBlacklistModel.js
│   └── userModel.js
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   └── taskRoutes.js
└── services/
    ├── admin.service.js
    ├── auth.service.js
    └── task.service.js
```

## Roles

| Role | Permissions |
|------|-------------|
| **User** | Create, view, update, and delete their own tasks |
| **Admin** | Full access to all users and tasks, update roles, delete any user or task |

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

Tokens expire after **24 hours**. Logged-out tokens are immediately invalidated via a server-side blacklist — even before expiry.

## Task Status Logic

Status auto-updates based on the following rules, handled inside the task schema's `pre("save")` hook:

- If task is marked `completed` → `completed`
- If `dueDate` has passed → `overdue`
- If task was recently updated → `in-progress`
- Otherwise → `pending`

## API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/auth/register` | Register a new user | Public |
| POST | `/api/v1/auth/login` | Login and receive JWT token | Public |

### Tasks
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/tasks/create-task` | Create a new task | Authenticated |
| GET | `/api/v1/tasks` | Get all tasks (supports pagination and filtering) | Authenticated |
| GET | `/api/v1/tasks/:id` | Get a single task by ID | Authenticated |
| PUT | `/api/v1/tasks/:id` | Update a task | Authenticated |
| DELETE | `/api/v1/tasks/:id` | Delete a task | Authenticated |

### Admin
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/admin/users` | Get all users | Admin |
| GET | `/api/v1/admin/tasks` | Get all tasks | Admin |
| PUT | `/api/v1/admin/user/:id/role` | Update a user's role | Admin |
| DELETE | `/api/v1/admin/user/:id` | Delete a user | Admin |
| DELETE | `/api/v1/admin/task/:id` | Delete any task | Admin |

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Local Setup

1. Clone the repository
```bash
git clone https://github.com/joyagbo/taskify-backend.git
cd taskify-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the development server
```bash
npm run dev
```

5. Visit `http://localhost:3000/api-docs` to explore the API documentation

## API Documentation

This API is fully documented with Swagger UI. You can explore and test all endpoints interactively at:

```
https://taskify-backend-984v.onrender.com/api-docs
```

## Author

Built by [Joy Agbo](https://github.com/joyagbo)