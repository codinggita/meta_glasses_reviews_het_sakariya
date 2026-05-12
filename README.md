# Meta Glasses Reviews API & Analytics Dashboard

A full-stack review analytics and management system built with Node.js, Express.js, MongoDB, React, Redux Toolkit, Tailwind CSS, and Material UI.

## Overview

This project is based on a real-world Meta Glasses Reviews dataset and is designed to handle large-scale review data with secure authentication, advanced filtering, search, sorting, pagination, aggregation, and dashboard analytics.

It includes a production-style backend architecture with MVC structure, middleware chaining, role-based access control, and RESTful API design.

## Key Features

- Complete CRUD APIs for review data.
- JWT-based authentication and protected routes.
- Admin and user dashboard support.
- Advanced filtering, search, sorting, and pagination.
- MongoDB aggregation pipelines for analytics.
- Request validation and centralized error handling.
- API rate limiting and secure middleware flow.
- Role-based access control.
- Real-world dataset modeling and seeding support.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv
- cors
- morgan
- express-rate-limit
- express-validator

### Frontend
- React.js
- Vite
- Redux Toolkit
- Tailwind CSS
- Material UI
- Axios
- React Router DOM
- Formik
- Yup
- React Helmet

## Project Structure

- `backend/` - Express API, MongoDB schemas, controllers, routes, middleware, and docs.
- `frontend/` - React dashboard UI, state management, services, and pages.

## Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api/v1
```

## API Documentation

Detailed API routes, schema design, and project notes are available in the `docs/` folder.

- `docs/api-documentation.md`
- `docs/database-schema.md`

## Testing

Backend APIs can be tested using:
- Postman
- Thunder Client

## Author

Het Sakariya

## License

This project is for educational and portfolio purposes.