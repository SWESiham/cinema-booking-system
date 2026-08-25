import { React, useState, useContext, createContext } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLogin", "true");
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");
    setUser(null);
  };
  return <>
      <AuthContext.Provider value={{ user, login, logout, isLogin: !!user }}>
          {children}
    </AuthContext.Provider>
  </>;
};


export const useAuth = () => useContext(AuthContext);