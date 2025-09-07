import React, { Component } from "react";
import web3 from "../web3";
import { getFulfilledAuctions } from "../AuctionContract";

class FulfilledAuctions extends Component {
  state = { auctions: [] };

  async componentDidMount() {
    const auctions = await getFulfilledAuctions();
    this.setState({ auctions });
  }

  render() {
    return (
      <section>
        <h2>Fulfilled auctions</h2>
        {this.state.auctions.map((a) => (
          <p key={a.id}>
            Seller: {a.seller} | Title: {a.title} | Final Price:{" "}
            {web3.utils.fromWei(a.highestBid, "ether")} ETH
          </p>
        ))}
      </section>
    );
  }
}

export default FulfilledAuctions;
