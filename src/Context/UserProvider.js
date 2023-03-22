import React, { useEffect } from "react";
import { useState, createContext } from "react";
import { getCurrentUser, isAdmin, isLoggedIn } from "../Services/auth";

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState({
    data: null,
    login: false,
    isAdmin: false,
  });

  useEffect(() => {
    if (isLoggedIn()) {
      setUser({
        data: getCurrentUser(),
        login: true,
        isAdmin: isAdmin(),
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
