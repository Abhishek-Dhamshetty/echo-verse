import { createContext, useState,useEffect } from 'react';

export const userAutherContextObj = createContext();

function userAutherContext({ children }) {
  let [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImageUrl: "",
    role: "",
    blocked:''
  });

  useEffect(() => {
    const userInStorage = localStorage.getItem('currentuser');
    if (userInStorage) {
      setCurrentUser(JSON.parse(userInStorage))
    }
  }, [])


  return (
    <userAutherContextObj.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </userAutherContextObj.Provider>
  );
}

export default userAutherContext;