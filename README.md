# EchoVerse

A full-stack blogging platform where users can create, manage, and explore blogs. The platform includes user authentication, an intuitive dashboard, an engaging reading experience, and is deployed on free-tier hosting services.

## Features

### Frontend
1. **User Authentication**
   - Users can register and log in.
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
   - The platform is optimized for desktops, tablets, and mobile devices.

### Backend
1. **Authentication API**
   - Secure authentication using JWT for user login and registration.
   
2. **Blog Management API**
   - CRUD operations for blog creation, editing, and deletion.
   - Role-based access control for admin privileges.
   
3. **Real-Time Updates**
   - WebSockets for real-time updates on new comments and blog interactions.
   
4. **Database**
   - User and blog data is stored efficiently in MongoDB or Planetscale.

## Deployment

### Frontend Hosting
- Deployed on [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com) for free-tier hosting.

### Backend Hosting
- Deployed on [Render](https://render.com) or [Railway.app](https://railway.app) for free-tier hosting.

### Database
- MongoDB Atlas (Free Plan) or Planetscale (Free Plan) is used for database hosting.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas or Planetscale account for the database.

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/echoverse.git
   cd echoverse
   ```

