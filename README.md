# Smart Leads Dashboard

A production-grade full-stack CRM and Lead Management Dashboard built using the MERN stack with scalable architecture, modern UI, secure authentication, role-based access control, advanced filtering, pagination, CSV export, and Docker support.

---

# Live Demo

Frontend: https://your-frontend-url.com

Backend API: https://your-api-url.com

---

# Features

## Authentication & Authorization

* JWT Authentication
* Refresh Token Strategy
* Secure HTTP-only Cookies
* User Registration
* User Login
* Protected Routes
* Persistent Authentication
* Role-Based Access Control
* Logout System

## Roles

### Admin

* Full Lead CRUD
* View All Leads
* Delete Leads
* Access Dashboard Analytics

### Sales User

* Create Leads
* View Leads
* Update Assigned Leads
* Limited Permissions

---

# Lead Management Features

* Create Lead
* Update Lead
* Delete Lead
* View Single Lead
* View Leads List
* Pagination
* Advanced Filtering
* Debounced Search
* Sorting
* CSV Export

---

# Advanced Filtering

Supports combined filters:

* Search by Name
* Search by Email
* Search by Company
* Filter by Status
* Filter by Source
* Date Range Filter
* Sorting

  * Latest
  * Oldest

Example:

```bash id="xzmlpw"
status=Qualified&source=Instagram&search=Rahul
```

---

# Dashboard Features

* Leads Statistics
* Qualified Leads
* Lost Leads
* Conversion Rate
* Leads by Source Chart
* Leads Growth Chart
* Recent Leads
* Responsive Analytics Cards

---

# Tech Stack

## Frontend

* React.js
* TypeScript
* Vite
* TailwindCSS
* React Router DOM
* TanStack Query
* Zustand
* React Hook Form
* Zod
* Axios
* Framer Motion
* Recharts
* React Hot Toast

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Zod
* Helmet
* CORS
* Cookie Parser

## DevOps

* Docker
* Docker Compose

---

# Folder Structure

## Frontend

```bash id="xzmlpw"
frontend/
├── src/
│   ├── api/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
```

## Backend

```bash id="xqwert"
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   ├── validations/
│   ├── app.ts
│   └── index.ts
```

---

# Installation & Setup

## 1. Clone Repository

```bash id="xbvmsl"
git clone https://github.com/your-username/smart-leads-dashboard.git

cd smart-leads-dashboard
```

---

# Backend Setup

## 2. Navigate to Backend

```bash id="xmnvsl"
cd backend
```

## 3. Install Dependencies

```bash id="xqwert"
npm install
```

## 4. Setup Environment Variables

Create `.env` file:

```bash id="x111op"
cp .env.example .env
```

## 5. Run Backend

```bash id="xpoeir"
npm run dev
```

Backend runs on:

```bash id="xslkdf"
http://localhost:5000
```

---

# Frontend Setup

## 6. Navigate to Frontend

```bash id="x908sd"
cd frontend
```

## 7. Install Dependencies

```bash id="xasjdl"
npm install
```

## 8. Setup Frontend Environment

```bash id="xkjfsl"
cp .env.example .env
```

## 9. Run Frontend

```bash id="xslkdj"
npm run dev
```

Frontend runs on:

```bash id="xzlkdf"
http://localhost:5173
```

---

# Docker Setup

## Run Full Application Using Docker

```bash id="x123zx"
docker compose up --build
```

## Docker Services

* frontend
* backend
* mongodb

---

# API Documentation

Base URL:

```bash id="xasd12"
http://localhost:5000/api/v1
```

---

# Authentication APIs

## Register User

### POST `/auth/register`

Request:

```json id="xasda1"
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "sales"
}
```

Response:

```json id="xasda2"
{
  "success": true,
  "data": {
    "user": {
      "_id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales"
    }
  }
}
```

---

## Login User

### POST `/auth/login`

Request:

```json id="xasda3"
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Response:

```json id="xasda4"
{
  "success": true,
  "data": {
    "accessToken": "jwt_token",
    "user": {
      "_id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales"
    }
  }
}
```

---

## Logout User

### POST `/auth/logout`

Response:

```json id="xasda5"
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Refresh Token

### POST `/auth/refresh`

Response:

```json id="xasda6"
{
  "success": true,
  "data": {
    "accessToken": "new_access_token"
  }
}
```

---

# Leads APIs

## Create Lead

### POST `/leads`

Request:

```json id="xlead1"
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "Qualified",
  "source": "Instagram",
}
```

Response:

```json id="xlead2"
{
  "success": true,
  "data": {
    "_id": "lead_id"
  }
}
```

---

## Get All Leads

### GET `/leads`

Query Params:

```bash id="xlead3"
?page=1
&limit=10
&search=rahul
&status=Qualified
&source=Instagram
&sort=latest
```

Response:

```json id="xlead4"
{
  "success": true,
  "data": {
    "leads": [],
    "pagination": {
      "total": 50,
      "page": 1,
      "pages": 5,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## Get Single Lead

### GET `/leads/:id`

Response:

```json id="xlead5"
{
  "success": true,
  "data": {
    "_id": "lead_id",
    "name": "Rahul Sharma"
  }
}
```

---

## Update Lead

### PATCH `/leads/:id`

Request:

```json id="xlead6"
{
  "status": "Contacted"
}
```

Response:

```json id="xlead7"
{
  "success": true,
  "message": "Lead updated successfully"
}
```

---

## Delete Lead

### DELETE `/leads/:id`

Response:

```json id="xlead8"
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

---

# CSV Export API

## Export Leads CSV

### GET `/leads/export/csv`

Response:

* Downloads CSV file automatically

---

# Security Features

* Helmet Security Headers
* JWT Authentication
* Password Hashing
* HTTP-only Cookies
* Request Validation
* MongoDB Injection Prevention
* CORS Protection
* Environment Variables
* Centralized Error Handling

---

# UI Features

* Dark Mode
* Responsive Design
* Skeleton Loaders
* Toast Notifications
* Animated Modals
* Reusable Components
* Empty States
* Error States
* Protected Routes

---

# Scripts

## Backend

```bash id="xback1"
npm run dev
npm run build
npm run start
```

## Frontend

```bash id="xfront1"
npm run dev
npm run build
```

---

# Deployment

Frontend:

* Vercel

Backend:

* Render

Database:

* MongoDB Atlas

---

# Future Improvements

* Email Notifications
* Real-time Updates
* Team Collaboration
* Activity Logs
* AI Lead Scoring
* Webhooks
* Audit Logs

---

# Author

Subham Mondal

GitHub:

```bash id="xasd12"
https://github.com/Subhammondal2004
```