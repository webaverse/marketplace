import { ethers } from "ethers";

export const metamaskService = {
  connectWallet,
  isConnected
};

const requiredChainId = "0x5";
const requiredNetworkName = "Goerly";

async function connectWallet() {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  if (chainId !== requiredChainId) {
    console.log(
      `Incorrect network! Switch your metamask network to ${requiredNetworkName}, sending request to change.`
    );
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: requiredChainId }],
    });
  }
  return await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then(() => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = signer.getAddress();
      const userData = {
        address: addr,
      };
      return userData;
    });
}

async function isConnected() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();
  return accounts.length > 0 ? true : false;
};

async function fetchUsersss() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = provider.listAccounts();
    const signer = provider.getSigner();
    const addr = signer.getAddress();
    const userData = {
      address: addr,
    };
    console.log("AAAAAA", accounts);
    return userData;
  };
