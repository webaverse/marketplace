import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobalState } from "../../contexts/GlobalContext";
import "./connectwallet.style.css";

function ConnectWallet(data) {
  // Example: connectWallet("metamask")
  const { connectWallet, walletConnected } = useAuth();
  const { navigate } = useGlobalState();
  console.log(window.location);
  useEffect(() => {
    if (walletConnected) {
      const referrer = window.location.search.split("?");
      navigate(`/${referrer[1]}`)
    }
  }, walletConnected);
  return (
    <div className="wallet-list-wrap">
      <h1>Connect your wallet.</h1>
      <ul>
        <li onClick={() => connectWallet("metamask")}>
          <h3>Metamask</h3>
        </li>
      </ul>
    </div>
  );
}

export default ConnectWallet;
