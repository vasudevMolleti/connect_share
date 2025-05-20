
# Hive Backend API

This is the backend API for the Hive social media application.

## Getting Started

### Prerequisites

- Node.js (v20.x or later)
- npm or yarn

### Installation

1. Install dependencies:
```
npm install
```

2. Run the development server:
```
npm run dev
```

The server will be available at http://localhost:5000.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `POST /api/auth/google`: Google OAuth login

### Users

- `GET /api/users/:id`: Get user profile
- `PUT /api/users/:id`: Update profile
- `POST /api/users/:id/follow`: Follow/unfollow user
- `GET /api/users?q=query`: Search for users

### Posts

- `POST /api/posts`: Create post
- `GET /api/posts`: Get feed (paginated)
- `GET /api/posts/:id`: Get single post
- `PUT /api/posts/:id/like`: Like/unlike post
- `POST /api/posts/:id/comment`: Add comment

## Tech Stack

- Express.js - Web server framework
- Morgan - HTTP request logger
- Helmet - Security headers
- Express Rate Limit - Rate limiting middleware
- CORS - Cross-Origin Resource Sharing

## Future Improvements

- Add real database (MongoDB)
- Add JWT authentication
- Add user password hashing with bcrypt
- Add WebSocket for real-time features
- Add file uploads with multer
