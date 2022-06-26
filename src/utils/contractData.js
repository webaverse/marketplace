export const contractAddress = "0xa613248C7f494eb8B928fFE87903aA88d5cBB503";
export const contractAbi = [
  { "type": "constructor", "payable": false, "inputs": [] },
  {
    "type": "event",
    "anonymous": false,
    "name": "Approval",
    "inputs": [
      { "type": "address", "name": "owner", "indexed": true },
      { "type": "address", "name": "approved", "indexed": true },
      { "type": "uint256", "name": "tokenId", "indexed": true }
    ]
  },
  {
    "type": "event",
    "anonymous": false,
    "name": "ApprovalForAll",
    "inputs": [
      { "type": "address", "name": "owner", "indexed": true },
      { "type": "address", "name": "operator", "indexed": true },
      { "type": "bool", "name": "approved", "indexed": false }
    ]
  },
  {
    "type": "event",
    "anonymous": false,
    "name": "TokenListedSuccess",
    "inputs": [
      { "type": "uint256", "name": "tokenId", "indexed": true },
      { "type": "address", "name": "owner", "indexed": false },
      { "type": "address", "name": "seller", "indexed": false },
      { "type": "uint256", "name": "price", "indexed": false },
      { "type": "bool", "name": "currentlyListed", "indexed": false }
    ]
  },
  {
    "type": "event",
    "anonymous": false,
    "name": "Transfer",
    "inputs": [
      { "type": "address", "name": "from", "indexed": true },
      { "type": "address", "name": "to", "indexed": true },
      { "type": "uint256", "name": "tokenId", "indexed": true }
    ]
  },
  {
    "type": "function",
    "name": "approve",
    "constant": false,
    "payable": false,
    "inputs": [
      { "type": "address", "name": "to" },
      { "type": "uint256", "name": "tokenId" }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "balanceOf",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "address", "name": "owner" }],
    "outputs": [{ "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "createToken",
    "constant": false,
    "stateMutability": "payable",
    "payable": true,
    "inputs": [
      { "type": "string", "name": "tokenURI" },
      { "type": "uint256", "name": "price" }
    ],
    "outputs": [{ "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "executeSale",
    "constant": false,
    "stateMutability": "payable",
    "payable": true,
    "inputs": [{ "type": "uint256", "name": "tokenId" }],
    "outputs": []
  },
  {
    "type": "function",
    "name": "getAllNFTs",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "components": [
          { "type": "uint256", "name": "tokenId" },
          { "type": "address", "name": "owner" },
          { "type": "address", "name": "seller" },
          { "type": "uint256", "name": "price" },
          { "type": "bool", "name": "currentlyListed" }
        ]
      }
    ]
  },
  {
    "type": "function",
    "name": "getApproved",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "uint256", "name": "tokenId" }],
    "outputs": [{ "type": "address" }]
  },
  {
    "type": "function",
    "name": "getCurrentToken",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [{ "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getLatestIdToListedToken",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "type": "uint256", "name": "tokenId" },
          { "type": "address", "name": "owner" },
          { "type": "address", "name": "seller" },
          { "type": "uint256", "name": "price" },
          { "type": "bool", "name": "currentlyListed" }
        ]
      }
    ]
  },
  {
    "type": "function",
    "name": "getListPrice",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [{ "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getListedTokenForId",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "uint256", "name": "tokenId" }],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "type": "uint256", "name": "tokenId" },
          { "type": "address", "name": "owner" },
          { "type": "address", "name": "seller" },
          { "type": "uint256", "name": "price" },
          { "type": "bool", "name": "currentlyListed" }
        ]
      }
    ]
  },
  {
    "type": "function",
    "name": "getMyNFTs",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "components": [
          { "type": "uint256", "name": "tokenId" },
          { "type": "address", "name": "owner" },
          { "type": "address", "name": "seller" },
          { "type": "uint256", "name": "price" },
          { "type": "bool", "name": "currentlyListed" }
        ]
      }
    ]
  },
  {
    "type": "function",
    "name": "isApprovedForAll",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [
      { "type": "address", "name": "owner" },
      { "type": "address", "name": "operator" }
    ],
    "outputs": [{ "type": "bool" }]
  },
  {
    "type": "function",
    "name": "name",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [{ "type": "string" }]
  },
  {
    "type": "function",
    "name": "ownerOf",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "uint256", "name": "tokenId" }],
    "outputs": [{ "type": "address" }]
  },
  {
    "type": "function",
    "name": "safeTransferFrom",
    "constant": false,
    "payable": false,
    "inputs": [
      { "type": "address", "name": "from" },
      { "type": "address", "name": "to" },
      { "type": "uint256", "name": "tokenId" }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "safeTransferFrom",
    "constant": false,
    "payable": false,
    "inputs": [
      { "type": "address", "name": "from" },
      { "type": "address", "name": "to" },
      { "type": "uint256", "name": "tokenId" },
      { "type": "bytes", "name": "_data" }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "setApprovalForAll",
    "constant": false,
    "payable": false,
    "inputs": [
      { "type": "address", "name": "operator" },
      { "type": "bool", "name": "approved" }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "supportsInterface",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "bytes4", "name": "interfaceId" }],
    "outputs": [{ "type": "bool" }]
  },
  {
    "type": "function",
    "name": "symbol",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [{ "type": "string" }]
  },
  {
    "type": "function",
    "name": "tokenURI",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "uint256", "name": "tokenId" }],
    "outputs": [{ "type": "string" }]
  },
  {
    "type": "function",
    "name": "transferFrom",
    "constant": false,
    "payable": false,
    "inputs": [
      { "type": "address", "name": "from" },
      { "type": "address", "name": "to" },
      { "type": "uint256", "name": "tokenId" }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "updateListPrice",
    "constant": false,
    "stateMutability": "payable",
    "payable": true,
    "inputs": [{ "type": "uint256", "name": "_listPrice" }],
    "outputs": []
  }
];

