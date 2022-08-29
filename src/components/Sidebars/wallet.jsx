import { useLocation, useParams } from "react-router-dom";
import {
  contractAddress,
  contractAbi,
} from "../../utils/MarketplaceContract.js";
import './wallet.style.css';
import axios from "axios";
import { useState } from "react";
import { providers, Contract, utils } from "ethers";
import { useAuth } from "../../contexts/AuthContext";
import WalletsList from "../ConnectWallet/index.jsx";
import { useGlobalState } from "../../contexts/GlobalContext.jsx";

export default function WalletSidebar() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");
  const { walletConnected } = useAuth();
  const { walletSidebarOpen } = useGlobalState();

  if (!walletConnected)
      return (
        <div className={walletSidebarOpen ? "profile-sidebar-wrap transition-03s open" : "profile-sidebar-wrap transition-03s"}>
          <WalletsList />
        </div>
      );

  async function getNFTData(tokenId) {
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new Contract(contractAddress, contractAbi, signer);

    //create an NFT Token
    let transaction = await contract.getMyNFTs();

    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        sumPrice += Number(price);
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <div className={walletSidebarOpen ? "profile-sidebar-wrap transition-03s open" : "profile-sidebar-wrap transition-03s"}>
      <div className="profileClass dark-bg">
        <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
          <div className="mb-5">
            <h2 className="font-bold">Wallet Address</h2>
           
            {address !== "0x"
          ? "Connected to"
          : "Not Connected. Please login to view NFTs"}{" "}
        {address !== "0x"
          ? `${address.substring(0, 5)}...${address.substring(37, 100)}`
          : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
