import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [walletConnected, setWalletConnected] = useState(false);
  const [currAddress, setCurrAddress] = useState("0x");
  const [loading, setLoading] = useState(true);
  
  const getAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    setCurrAddress(addr);
  };

  const connectWallet = async () => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x5") {
      console.log(
        "Incorrect network! Switch your metamask network to Goerly, sending request to change"
      );
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        getAddress();
        window.location.replace(location.pathname);
      });
  };

  useEffect(() => {
    
    const val = window.ethereum.isConnected();

    if (val) {
      console.log("connecting wallet");
      getAddress();
      setWalletConnected(val);
      setLoading(false);
    }

    window.ethereum.on("accountsChanged", (accounts) => {
      // does f5 if the chain changes
      window.location.replace(location.pathname);
    });
  });

  const value = {
    connectWallet,
    getAddress,
    walletConnected,
    currAddress
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
