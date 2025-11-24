# Smart Hospital Management System - Project Context

## Project Overview
This project is a **Smart Hospital Management System** built using the **Next.js 14/15 App Router** architecture. It facilitates secure registration, login, and appointment management for patients and doctors.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **ORM**: Mongoose
- **Styling**: Tailwind CSS, shadcn/ui (Radix UI)
- **Authentication**: Custom JWT-based auth (currently using `localStorage` for session management).
- **Forms**: React Hook Form + Zod

## Architecture

### Directory Structure
- **`app/`**: Contains the application routes and API endpoints.
    - **`api/`**: Backend API routes (e.g., `auth/login`).
    - **`auth/`**: Authentication related pages (login/register).
    - **`doctor/`**: Doctor-specific dashboard and pages.
    - **`patient/`**: Patient-specific dashboard and pages.
- **`models/`**: Mongoose schemas for data modeling.
    - `Doctor.ts`: Schema for doctor profiles.
    - `Patient.ts`: Schema for patient profiles.
- **`lib/`**: Utility functions and shared logic.
    - `db.ts`: MongoDB connection logic (singleton pattern).
    - `auth.ts`: Client-side authentication manager (handles `localStorage`).
- **`components/`**: Reusable UI components (shadcn/ui).

### Authentication Flow
1.  **Login**: User submits credentials via the login form.
2.  **Server**: `app/api/auth/login/route.ts` verifies credentials against MongoDB.
3.  **Response**: Server returns a JSON response with user details.
4.  **Client**: `lib/auth.ts` stores the session token and user info in `localStorage`.
    > **Note**: The initial project summary mentioned cookies, but the current implementation uses `localStorage`.

### Database
- **Connection**: Managed by `lib/db.ts` which ensures a cached connection to MongoDB Atlas to prevent multiple connections in serverless environments.
- **Schemas**: Defined in `models/` using Mongoose.

## Key Files
- **`package.json`**: Lists all dependencies and scripts.
- **`.env`**: Stores environment variables (e.g., `MONGO_URI`).
- **`app/layout.tsx`**: Root layout for the application.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env` file in the root directory with the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## Development Notes
- **Linting**: Run `npm run lint` to check for code quality issues.
- **Building**: Run `npm run build` to create a production build.
