import { useState } from "react";
import { ethers } from "ethers";
import AuctionABI from "./AuctionABI.json";


const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; 

function AuctionComponent() {
  const [title, setTitle] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [auctionId, setAuctionId] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const [status, setStatus] = useState("");

  const getContract = async () => {
    if (!window.ethereum) throw new Error("⚠️ Install MetaMask first!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, AuctionABI, signer);
  };

  const createAuction = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.createAuction(title, ethers.parseEther(startPrice), duration);
      await tx.wait();
      setStatus("✅ Auction created successfully!");
    } catch (err) {
      setStatus("❌ " + err.message);
    }
  };

  const placeBid = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.bid(auctionId, { value: ethers.parseEther(bidAmount) });
      await tx.wait();
      setStatus("✅ Bid placed successfully!");
    } catch (err) {
      setStatus("❌ " + err.message);
    }
  };

  const endAuction = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.fulfillAuction(auctionId);
      await tx.wait();
      setStatus("✅ Auction ended successfully!");
    } catch (err) {
      setStatus("❌ " + err.message);
    }
  };

  return (
    <div className="auction-container">
      
      <div className="section">
        <h2>Create Auction</h2>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Start Price (ETH)" onChange={(e) => setStartPrice(e.target.value)} />
        <input type="text" placeholder="Duration (seconds)" onChange={(e) => setDuration(e.target.value)} />
        <button onClick={createAuction}>Start Auction</button>
      </div>

      <div className="section">
        <h2>Place Bid</h2>
        <input type="text" placeholder="Auction ID" onChange={(e) => setAuctionId(e.target.value)} />
        <input type="text" placeholder="Bid Amount (ETH)" onChange={(e) => setBidAmount(e.target.value)} />
        <button onClick={placeBid}>Place Bid</button>
      </div>

      <div className="section">
        <h2>End Auction</h2>
        <input type="text" placeholder="Auction ID" onChange={(e) => setAuctionId(e.target.value)} />
        <button onClick={endAuction}>End Auction</button>
      </div>

      <p className="status">{status}</p>
    </div>
  );
}

export default AuctionComponent;
