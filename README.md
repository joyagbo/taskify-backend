# Taskify Backend API

Taskify is a simple RESTful Task Management API built with **Node.js**, **Express**, and **MongoDB**. It allows users to create, update, delete, and manage their tasks with automatic status updates based on due dates and activity.

## Features

- User registration and login (JWT authentication)
- Role-based access control
- Create, read, update, delete (CRUD) tasks
- Auto-set task status: `pending`, `in-progress`, `overdue`, `completed`
- Pagination, filtering, and sorting support
- Auto-log day of task creation
- Follows REST API best practices
- Admin features for managing users and roles


## Live API
Base URL: `https://taskify-backend-984v.onrender.com`

## Roles

- **User**: Can create, view, update, and delete their own tasks.
- **Admin**:
  - Has full access to all users and tasks.
  - Can update user roles.
  - Can delete any user or task.

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT (JSON Web Token)
- Bcrypt for password hashing
- Postman for API testing
- Git for version control

## Folder Structure

```
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── app.js
```

## Authentication

- Uses JWT for securing endpoints.
- Passwords are hashed using bcrypt.
- Example: After login, include the token in headers:

```
Authorization: Bearer <your_token_here>
```

## Task Status Logic

- `status` auto-updates based on:
  - If task is marked `completed`
  - If `dueDate` has passed → `overdue`
  - If task was updated → `in-progress`
  - Else → `pending`

This is handled inside the task schema’s `pre("save")` hook.

## API Endpoints

| Method | Endpoint              | Description                      | Access        |
| ------ | --------------------- | -------------------------------- | ------------- |
| POST   | `/api/auth/register`  | Register new user                | Public        |
| POST   | `/api/auth/login`     | Login and get JWT token          | Public        |
| GET    | `/api/users`          | Get all users (admin only)       | Admin         |
| PATCH  | `/api/users/:id/role` | Update a user's role             | Admin         |
| POST   | `/api/tasks`          | Create a new task                | Authenticated |
| GET    | `/api/tasks`          | Get all tasks for logged-in user | Authenticated |
| PATCH  | `/api/tasks/:id`      | Update a task                    | Authenticated |
| DELETE | `/api/tasks/:id`      | Delete a task                    | Authenticated |

## Testing

Use [Postman](https://www.postman.com/) or any API client to test endpoints.

To test locally:

1. Clone repo
2. Create `.env` with your Mongo URI and JWT secret
3. Install dependencies
   ```bash
   npm install
   ```
4. Run server
   ```bash
   npm run dev
   ```

## .env Example

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskify
JWT_SECRET=your_jwt_secret_key
```

## Todo

- [ ] Add unit, integration, and E2E tests
- [ ] Add CI/CD with GitHub Actions
- [ ] Add Swagger API documentation
- [ ] Deploy to Render/Heroku/Netlify (backend)

## Author

Built with ❤️ by Joy Agbo
