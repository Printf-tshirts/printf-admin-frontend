import React, { useContext, useState, useEffect } from "react";
import { loginAPI } from "../api/users/login.api";
import { message } from "antd";
import { getUserAPI } from "../api/users/users.api";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  let history = useHistory();
  async function getUser() {
    const token = sessionStorage.getItem("token");
    if (token) {
      const response = await getUserAPI();
      setCurrentUser(response.data.user);
    }
    setLoading(false);
  }
  async function login(email, password) {
    return loginAPI(email, password)
      .then(async (res) => {
        if (res.status === 200) {
          sessionStorage.setItem("token", res.data.token);
          message.success("Login successful");
          await getUser();
          history.push("/");
        } else {
          message.error("Login failed");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
      });
  }
  function logout() {
    sessionStorage.removeItem("token");
    setCurrentUser(null);
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getUser();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
