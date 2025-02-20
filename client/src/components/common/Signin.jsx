import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn, useUser } from '@clerk/clerk-react';
import axios from 'axios';

function SignInPage() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && user) {
      axios.get(`http://localhost:3000/user-api/get-user/${user.primaryEmailAddress.emailAddress}`)
        .then(res => {
          const role = res.data.role;
          localStorage.setItem("role", role); // ✅ Store role in localStorage

          if (role === "admin") {
            navigate("/admin-dashboard");  // ✅ Redirect to Admin Dashboard
          } else if (role === "author") {
            navigate(`/author-profile/${user.primaryEmailAddress.emailAddress}`);
          } else {
            navigate(`/user-profile/${user.primaryEmailAddress.emailAddress}`);
          }
        })
        .catch(err => console.error("Error fetching user role:", err));
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <SignIn />
    </div>
  );
}

export default SignInPage;
