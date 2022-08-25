import { contractAddress, contractAbi } from "../utils/MarketplaceContract";
import axios from "axios";
import { useEffect, useState } from "react";
import { providers, Contract, utils } from "ethers";
import { tokenApiService } from "../utils/tokens-api-util";
import TokenCard from "../components/TokenListItem";

export default function Marketplace() {
  const sampleData = [
    {
      "name": "NFT#1",
      "description": "Alchemy's First NFT",
      "website": "http://axieinfinity.io",
      "image": "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      "price": "0.03ETH",
      "currentlySelling": "True",
      "address": "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];
  const [data, setData] = useState(sampleData);
  const [dataFetched, setDataFetched] = useState(false);

  async function getAllNFTs() {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // Contract instance 
    let contract = new Contract(contractAddress, contractAbi, signer);
    // Create an NFT Token
    let transaction = await contract.getAllNFTs();

    // Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async (i) => {
      const tokenURI = await contract.tokenURI(i.tokenId);
      let meta = await axios.get(tokenURI);
      meta = meta.data;

      let price = utils.formatUnits(i.price.toString(), 'ether');
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
      };
      return item;
    }));

    setDataFetched(true);
    setData(items);
  }

  if (!dataFetched)
    //? Just a bool to avoid the function being called infinitetly
    getAllNFTs();

  useEffect(() => {
    tokenApiService.fetchTokens(0,12).then((res) => {
      setData(res);
      console.log(res)
    })
  }, [])

  return (
    <div className="custom-bg">
      <div className="flex flex-col place-items-center mt-20">
        <div className="md:text-xl font-bold text-white">
          Top NFTs
        </div>
        <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
          {data.map((value, index) => {
            return <TokenCard data={value} key={index} />;
          })}
        </div>
      </div>
    </div>
  );

}