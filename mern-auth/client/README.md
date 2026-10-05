# Task Management System

A full-stack Task Management System built using the MERN stack.

## Features

- User registration and login
- JWT authentication
- Protected routes
- Role-based access control
- Admin and User roles
- Create, view, update and delete tasks
- Users can manage their own tasks
- Admin can manage all tasks
- MongoDB database integration
- Responsive React frontend

## Technologies Used

- React.js
- Vite
- Axios
- React Router
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Authentication

The application uses JWT authentication.

After login, the server generates a JWT token. The frontend sends this token with protected API requests.

## Role-Based Access

### User
- Can create tasks
- Can view their own tasks
- Can update their own tasks
- Can delete their own tasks

### Admin
- Can view all tasks
- Can update all tasks
- Can delete all tasks

The backend checks task ownership to prevent users from modifying other users' tasks.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Get user profile |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | Get tasks |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Project Structure

```text
mern-auth/
├── client/
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── model/
    ├── routes/
    └── server.js