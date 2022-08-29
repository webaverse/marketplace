import React, { useContext, useState, useEffect } from "react";
import { metamaskService } from "../utils/metamask-util";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("0x");
  const [walletType, setWalletType] = useState(undefined);

  const [signer, setSigner] = useState();
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  const connectWallet = (wType) => {
    if (wType === "metamask") {
      metamaskService.connectWallet().then((data) => {
        if (data?.address) {
          console.log("User Data: ", data);
          setWalletType("metamask");
          setWalletAddress(data?.address);
          setWalletConnected(true);
        }
      });
    } else {
      console.log("Invalid wallet type: ", wType);
    }
  };

  useEffect(() => {
    metamaskService.isConnected().then((res) => {
      if (res) {
        setWalletConnected(true);
        setLoading(false);
      } else {
        setWalletConnected(false);
        setLoading(false);
      }
    });
    window.ethereum.on("accountsChanged", (accounts) => {
      // does f5 if the chain changes
      window.location.replace(location.pathname);
    });
  });

  const value = {
    connectWallet,
    walletConnected,
    walletAddress,
    walletType,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
