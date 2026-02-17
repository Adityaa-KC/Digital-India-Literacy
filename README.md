# Digital Literacy Platform

This is a full-stack application built with React, Express, and Drizzle ORM.

## Local Setup

### 1. Prerequisites
- Node.js (v20 or higher)
- PostgreSQL database

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your database URL:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
```

### 4. Database Setup
Push the schema to your local database:
```bash
npm run db:push
```

### 5. Running the App
Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5000`.

## Deployment to GitHub

1. Create a new repository on GitHub.
2. In your local terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
