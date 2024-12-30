import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Retrieved user from localStorage:', storedUser); // Debug log
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('User state set to:', JSON.parse(storedUser)); // Debug log
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User logged in and stored in localStorage:', userData); // Debug log
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
