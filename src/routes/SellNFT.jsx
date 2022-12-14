import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
import { contractAddress, contractAbi } from "../utils/MarketplaceContract.js";
import { useLocation } from "react-router";
import { providers, Contract, utils } from "ethers";


export default function SellNFT() {
  const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' });
  const [fileURL, setFileURL] = useState(null);
  const [message, updateMessage] = useState('');
  const [hasUploaded, setHasUploaded] = useState(false);
  const location = useLocation();//to return user to main page

  /**@dev uploads the NFT image to IPFS*/
  const OnChangeFile = async (e) => {
    console.log("New file detected!");
    const file = e.target.files[0];

    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Image uploaded to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
        // show the user that the img has been uploaded to piñata
        setHasUploaded(true);
      }
    }
    catch (e) {
      console.log("Error during file upload", e);
    }
  };


  /**@dev uploads the the metadata to IPFS*/
  const uploadMetadataToIPFS = async () => {
    const { name, description, price } = formParams;
    //Make sure that none of the fields are empty
    if (!(name || description || price || fileURL))
      return;

    const nftJSON = {
      name: name,
      description: description,
      price: price,
      image: fileURL
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    }
    catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  };


  /**@dev Upload the NFT's metadata to the contract storage */
  const listNFT = async (e) => {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage("Please wait.. uploading (up to 5 mins)");

      //Pull the deployed contract instance
      let contract = new Contract(contractAddress, contractAbi, signer);

      //massage the params to be sent to the create NFT request
      const price = utils.parseUnits(formParams.price, 'ether');
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();

      //create the NFT on-chain
      let transaction = await contract.createToken(metadataURL, price, { value: listingPrice });
      await transaction.wait();

      alert("Successfully listed your NFT!");
      updateMessage("");
      updateFormParams({ name: '', description: '', price: '' });
      //? sends user to the main page
      window.location.replace("/");
    }
    catch (err) {
      console.log("Error T.T", err);
      alert("Upload error");
    }
  };


  return (
    <div className="custom-bg">
      <div className="flex flex-col place-items-center mt-10" id="nftForm">
        <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3>
          <div className="mb-4">
            <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
            <input onChange={e => updateFormParams({ ...formParams, name: e.target.value })} value={formParams.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" ></input>
          </div>
          <div className="mb-6">
            <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
            <textarea onChange={e => updateFormParams({ ...formParams, description: e.target.value })} value={formParams.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection"  ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({ ...formParams, price: e.target.value })}></input>
          </div>
          <div>
            <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
            <input type={"file"} onChange={(e) => OnChangeFile(e)}></input>
            <p className="font-extrabold">{hasUploaded ? "Image has been uploaded" : "Image has not been uploaded, your nft won't have img linked to it!"}</p>
          </div>
          <br></br>
          <div className="text-green text-center">{message}</div>
          <button onClick={listNFT} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
            List NFT
          </button>
        </form>
      </div>
    </div>
  );
}