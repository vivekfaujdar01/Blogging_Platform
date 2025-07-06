import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));

    } catch {
      console.log("Clearing invalid user data from localStorage.");
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (userData, token) => {
  const fullUser = { ...userData, token };
  localStorage.setItem("user", JSON.stringify(fullUser));
  setUser(fullUser);
};



  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;