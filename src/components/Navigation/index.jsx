import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import WvIcon from "../../assets/icons";
import { ethers } from "ethers";
import { useAuth } from '../../contexts/AuthContext';
import "./style.css";
import { useGlobalState } from "../../contexts/GlobalContext";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  const { connectWallet } = useAuth();
  const { setWalletSidebarOpen, walletSidebarOpen } = useGlobalState();

  const toggleWalletSidebar = () => {
    setWalletSidebarOpen(walletSidebarOpen ? false : true);
  }

  const [resources, toggleResources] = useState(false);
  const [profile, toggleProfile] = useState(false);

  return (
    <div className="navigation-wrap">
      <div className="inner-wrap">
        <Link to={"/"} className="logo v-centered">
          <WvIcon icon="logoHorizontal" size={50} />
        </Link>
        
        <div className="v-centered search-wrap">
        <WvIcon icon="iconSearch" size={26} className="icon v-centered" />
        <input type={"text"} placeholder="Search items, accounts" />
        </div>

        <ul className="user-navigation v-centered">
        <li>
            <button>
              Explore
            </button>
          </li>
          <li>
            |
          </li>
          <li>
            <button>
              Sell
            </button>
          </li>
          <li>
            |
          </li>
          <li>
            <button onClick={() => toggleResources(resources ? false : true)}>
              Resources
            </button>
            {resources && (
              <ul className="dropdown">
                <li>Support</li>
                <li>Partners</li>
                <li>Newsletter</li>
                <li>Social Pages</li>
              </ul>
            )}
          </li>
          <li>
            |
          </li>
          <li>
            <button onClick={() => toggleProfile(profile ? false : true)}>
              <WvIcon icon="iconUser" size={30} />
            </button>
            {profile && (
              <ul className="dropdown">
                <li>Profile Settings</li>
                <li>My Store</li>
                <li>Sign Out</li>
              </ul>
            )}
          </li>
          <li>
            <button onClick={() => toggleWalletSidebar()}>
              <WvIcon icon="iconWallet" size={36} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
