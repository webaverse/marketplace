import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SellNFT from './routes/SellNFT';
import Marketplace from './routes/Marketplace';
import Profile from './routes/Profile';
import NFTPage from './routes/NFTPage';
import Navbar from './components/Navigation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/asset/:tokenId" element={<NFTPage />} />
        <Route path="/sellNFT" element={<SellNFT />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

