import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = React.createContext();

export function useGlobalState() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {

  const [walletSidebarOpen, setWalletSidebarOpen] = useState(false);

  const navigate = useNavigate();
  
  const value = {
    navigate,
    walletSidebarOpen,
    setWalletSidebarOpen
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
