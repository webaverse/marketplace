import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import WvIcon from "../../assets/icons";
import { ethers } from "ethers";
import { useAuth } from '../../contexts/AuthContext';
import "./style.css";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  const { connectWallet } = useAuth();

  return (
    <div className="navigation-wrap">
      <div className="inner-wrap">
        <Link to={"/"} className="logo v-centered">
          <WvIcon icon="logoHorizontal" size={50} />
        </Link>
        <ul className="user-navigation v-centered">
          <li>
            <button onClick={connectWallet}>
              {connected ? "Connected" : "Connect Wallet"}
            </button>
          </li>
          <li>
            <button>
              <WvIcon icon="iconSearch" size={26} />
            </button>
          </li>
          <li>
            <button onClick={connectWallet}>
            <Link to="/profile">
              <WvIcon icon="iconWallet" size={36} />
              </Link>
            </button>
          </li>
          <li>
            <button>
            <Link to="/profile">
              <WvIcon icon="iconUser" size={30} />
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
