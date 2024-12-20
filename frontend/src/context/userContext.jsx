import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../middleware/axiosMiddleware.js";
import { API } from "../api/index.js";
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${API.users.getUser}`);
          setUser(response.data.user);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    loading,
    handleLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
