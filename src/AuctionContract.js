import web3 from "./web3";
import AuctionABI from "./AuctionABI.json";


const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const contract = new web3.eth.Contract(AuctionABI.abi, CONTRACT_ADDRESS);


export const getLiveAuctions = async () => {
  const count = await contract.methods.auctionCount().call();
  const auctions = [];
  for (let i = 0; i < count; i++) {
    const a = await contract.methods.auctions(i).call();
    if (!a.fulfilled && !a.canceled) auctions.push({ id: i, ...a });
  }
  return auctions;
};

export const getFulfilledAuctions = async () => {
  const count = await contract.methods.auctionCount().call();
  const auctions = [];
  for (let i = 0; i < count; i++) {
    const a = await contract.methods.auctions(i).call();
    if (a.fulfilled) auctions.push({ id: i, ...a });
  }
  return auctions;
};

export const getCanceledAuctions = async () => {
  const count = await contract.methods.auctionCount().call();
  const auctions = [];
  for (let i = 0; i < count; i++) {
    const a = await contract.methods.auctions(i).call();
    if (a.canceled) auctions.push({ id: i, ...a });
  }
  return auctions;
};

export default contract;
