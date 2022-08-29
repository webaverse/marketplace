import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellNFT from "./routes/SellNFT";
import Marketplace from "./routes/Marketplace";
import Profile from "./routes/Profile";
import NFTPage from "./routes/NFTPage";
import Navbar from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import WalletSidebar from "./components/Sidebars/wallet";
import ConnectWallet from "./components/ConnectWallet";
import { GlobalProvider } from "./contexts/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <Navbar />
          <WalletSidebar />
          <div className="main-content-wrap">
            <Routes>
              <Route path="/" element={<Marketplace />} />
              <Route path="/asset/:tokenId" element={<NFTPage />} />
              <Route path="/connect-wallet" element={<ConnectWallet />} />
              <Route
                exact
                path="/sellNFT"
                element={<PrivateRoute component={SellNFT} />}
              />
              <Route
                exact
                path="/profile"
                element={<PrivateRoute component={Profile} />}
              />
            </Routes>
          </div>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
