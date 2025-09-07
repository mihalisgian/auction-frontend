import React, { useState } from "react";
import web3 from "../web3";
import auctionContract from "../AuctionContract";

const AuctionForm = () => {
  const [title, setTitle] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [duration, setDuration] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const createAuction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      const priceInWei = web3.utils.toWei(startPrice, "ether");

    
      await auctionContract.methods
        .createAuction(title, priceInWei, duration)
        .send({ from: accounts[0] });

      setMessage("Auction created successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error creating auction. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Create Auction</h2>
      <form onSubmit={createAuction}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Starting Price (ETH)"
          value={startPrice}
          onChange={(e) => setStartPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duration (blocks)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Auction"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuctionForm;
