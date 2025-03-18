# EchoVerse

A full-stack blogging platform where users can create, manage, and explore blogs. The platform includes user authentication using **Clerk**, an intuitive dashboard, and an engaging reading experience.

## Features

### Frontend
1. **User Authentication**
   - Users can register and log in using **Clerk Authentication**.
   - Admin authentication with restricted access to manage blogs.
   
2. **Blog Dashboard**
   - Display a list of published blogs with search and filter options.
   - Categorized blogs for easy navigation.
   
3. **Blog Creation & Management**
   - Users can create, edit, and delete their blogs.
   - Rich text editor for seamless content writing.
   
4. **Comments & Engagement**
   - Users can comment on blogs to interact with authors.
   - Real-time updates for new comments and interactions.
   
5. **Responsive Design**
   - Optimized for desktops, tablets, and mobile devices.

### Backend
1. **Authentication API**
   - Secure authentication handled by **Clerk Authentication**.
   
2. **Blog Management API**
   - CRUD operations for blog creation, editing, and deletion.
   - Role-based access control for admin privileges.
   
3. **Real-Time Updates**
   - WebSockets for real-time updates on new comments and blog interactions.
   
4. **Database**
   - User and blog data is stored efficiently in **MongoDB Atlas**.

## Deployment

### Frontend Hosting
- Deployed on **Vercel** for free-tier hosting.

### Backend Hosting
- Deployed on **Render** for free-tier hosting.

### Database
- **MongoDB Atlas** (Free Plan) is used for database hosting.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas account for the database.
- Clerk account for authentication setup.

### Steps to Run Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/echoverse.git
   cd echoverse
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file and configure **Clerk Authentication** and **MongoDB Atlas** settings.

4. Start the development server:
   ```sh
   npm start
   ```

5. Open your browser and visit `https://echo-verse-theta.vercel.app/` to access the application.

