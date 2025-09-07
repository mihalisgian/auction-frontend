import React, { Component } from "react";
import web3 from "../web3";
import contract, { getCanceledAuctions } from "../AuctionContract";

class CanceledAuctions extends Component {
  state = { auctions: [] };

  async componentDidMount() {
    const auctions = await getCanceledAuctions();
    this.setState({ auctions });
  }

  claim = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.claimRefund().send({ from: accounts[0] });
    const updated = await getCanceledAuctions();
    this.setState({ auctions: updated });
  };

  render() {
    return (
      <section>
        <h2>Canceled auctions</h2>
        {this.state.auctions.map((a) => (
          <p key={a.id}>
            Seller: {a.seller} | Title: {a.title}
          </p>
        ))}
        <button className="btn-primary" onClick={this.claim}>
          Claim
        </button>
      </section>
    );
  }
}

export default CanceledAuctions;
