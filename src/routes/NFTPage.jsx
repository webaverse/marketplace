import { useLocation, useParams } from 'react-router-dom';
import { contractAddress, contractAbi } from "../utils/MarketplaceContract.js";
import axios from "axios";
import { providers, Contract, utils } from "ethers";
import { useState, useRef, useEffect } from "react";
import bg from '../assets/images/item-bg.png';
import table from '../assets/images/item-table.png';
import podium from '../assets/images/item-podium.png';
import item from '../assets/images/item-view-1.png';
import { tokenApiService } from '../utils/tokens-api-util.js';

export default function NFTPage(props) {

    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");

    const tableRef = useRef();
    const podiumRef = useRef();
    const itemRef = useRef();

    async function getNFTData(tokenId) {
        const provider = new providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        //Pull the deployed contract instance
        let contract = new Contract(contractAddress, contractAbi, signer);
        //create an NFT Token
        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);

        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        };
        console.log(item);
        updateData(item);
        updateDataFetched(true);
        console.log("address", addr);
        updateCurrAddress(addr);
    }

    async function buyNFT(tokenId) {
        try {
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            //Pull the deployed contract instance
            let contract = new Contract(contractAddress, contractAbi, signer);
            const salePrice = utils.parseUnits(data.price, 'ether');
            updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
            //run the executeSale function
            let transaction = await contract.executeSale(tokenId, { value: salePrice });
            await transaction.wait();

            alert('You successfully bought the NFT!');
            updateMessage("");
        }
        catch (e) {
            alert("Upload Error" + e);
        }
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if (!dataFetched)
        getNFTData(tokenId);
        /*
        useEffect(() => {
            setTimeout(() => {
                tableRef.current.style.opacity = 1;
                tableRef.current.style.top = "80px";
                podiumRef.current.style.opacity = 1;
                podiumRef.current.style.width = "52%";
            }, 600);
        }, [dataFetched, table, podium]);

        useEffect(() => {
            setTimeout(() => {
                itemRef.current.style.top = "60px";
                podiumRef.current.style.filter = "grayscale(0)";
            }, 1600);
        }, [item]);
        */
        console.log(window.location)
        const id = window.location.pathname;
       
    useEffect(() => {
        tokenApiService.fetchToken(id.replace("/asset/","")).then((res) => {
            updateDataFetched(res);
            console.log(res)
        })
    }, [])


    return (
        <div className="image-background" style={{ color: "#FFF", maxWidth: "800px", margin: "100px auto"}}>
            <h1 style={{fontSize: "24px"}}>{dataFetched.name}</h1>
            <h1 style={{fontSize: "24px"}}>{dataFetched.description}</h1>
        </div>
    );
}