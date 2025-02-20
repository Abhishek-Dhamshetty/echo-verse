import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Rootlayout from './components/Rootlayout.jsx';
import Home from './components/common/Home.jsx';
import SignIn from './components/common/Signin.jsx';
import SignUp from './components/common/Signup.jsx';
import ArticleById from './components/common/ArticleById.jsx';
import Articles from './components/common/Articles.jsx';
import AuthorProfile from './components/author/AuthorProfile.jsx';
import PostArticle from './components/author/PostArticle.jsx';
import UserProfile from './components/user/UserProfile.jsx';
import UserAuthorContext from "./contexts/UserAuthorContext.jsx";
import Success from "./components/common/Success.jsx";
import AdminProfile from "./components/admin/AdminProfile.jsx";

// ✅ Admin Protected Route
const AdminProtectedRoute = ({ children }) => {
    const role = localStorage.getItem("role"); // Fetch role from local storage
    if (role !== "admin") {
        return <Navigate to="/signin" replace/>; // Redirect if not admin
    }
    return children;
};

const browserRouterObj = createBrowserRouter([
  {
    path: '/',
    element: <Rootlayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "user-profile/:email",
        element: <UserProfile />,
        children: [
          { path: "articles", element: <Articles /> },
          { path: ":articleId", element: <ArticleById /> },
          { path: "", element: <Navigate to="articles" /> },
          { path: "/user-profile/:email/:articleId/success", element: <Success /> }
        ]
      },
      {
        path: "admin-profile",
        element: (
          <AdminProtectedRoute>
            <AdminProfile />
          </AdminProtectedRoute>
        )
      },
      {
        path: "author-profile/:email",
        element: <AuthorProfile />,
        children: [
          { path: "articles", element: <Articles /> },
          { path: ":articleId", element: <ArticleById /> },
          { path: "article", element: <PostArticle /> },
          { path: "", element: <Navigate to="articles" /> }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserAuthorContext>
    <RouterProvider router={browserRouterObj} />
  </UserAuthorContext>
);
