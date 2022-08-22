import './App.css';
import Marketplace from './routes/Marketplace';
import Profile from './routes/Profile';
import SellNFT from './routes/SellNFT';
import NFTPage from './routes/NFTpage';
import {
  Routes,
  Route,

} from "react-router-dom";


function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/nftPage" element={<NFTPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sellNFT" element={<SellNFT />} />
      </Routes>
    </div>
  );
}

export default App;
