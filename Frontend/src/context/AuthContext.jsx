import { React, useState,useEffect, useContext, createContext } from "react";
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null)
   const [token, setToken] = useState(null)
   const [loading, setLoading] = useState(true)
  // const [user, setUser] = useState(() => {
  //   const savedUser = localStorage.getItem("user");
  //   return savedUser ? JSON.parse(savedUser) : null;
  // });

  useEffect(() => {
    const sToken = localStorage.getItem('token')
    const sUser = JSON.parse(localStorage.getItem('user'));

    if (sToken && sUser) {
      setToken(sToken)
      setUser(sUser)
    };
    setLoading(false)
  }, []);
  
  const login = async (email, password) => {
    // localStorage.setItem("user", JSON.stringify(userData));
    // localStorage.setItem("isLogin", "true");
    // setUser(userData);
    try {
      const res = await api.post('/auth/login', {email,password});
      const { user: lUser, token: lToken } = res.data 
      setUser(lUser);
      setToken(lToken);
      localStorage.setItem('token',lToken)
      localStorage.setItem('user', JSON.stringify(lUser))
      
      return { success: true };
    } catch (error) {
      return {success:false,message:error.response?.data?.message || 'Failed to Login!'}
    }
  };

  const register = async (fullname,email,password) => {
   
    try {
      const res = await api.post('/auth/register', { name : fullname,email,password });
      const { user: lUser, token: lToken } = res.data 
      if (user.status === "Suspended") {
      alert("Your account has been suspended by the administration.");
      return;
    }
      setUser(lUser);
      setToken(lToken);
      localStorage.setItem('token',lToken)
      localStorage.setItem('user', JSON.stringify(lUser))
      
      return { success: true };
    } catch (error) {
      return {success:false,message:error.response?.data?.message || 'Failed to create an account!'}
    }
  };
  const logout = () => {
     setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  return <>
      <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
          {!loading&&children}
    </AuthContext.Provider>
  </>;
};


export const useAuth = () => useContext(AuthContext);