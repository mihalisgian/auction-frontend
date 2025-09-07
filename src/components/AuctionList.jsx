import React, { Component } from "react";
import web3 from "../web3";
import contract, { getLiveAuctions } from "../AuctionContract";

class AuctionList extends Component {
  state = { auctions: [] };

  async componentDidMount() {
    const auctions = await getLiveAuctions();
    this.setState({ auctions });
  }

  bid = async (id, value) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.bid(id).send({
      from: accounts[0],
      value: web3.utils.toWei(value.toString(), "ether"),
    });
    const updated = await getLiveAuctions();
    this.setState({ auctions: updated });
  };

  cancel = async (id) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.cancelAuction(id).send({ from: accounts[0] });
    const updated = await getLiveAuctions();
    this.setState({ auctions: updated });
  };

  fulfill = async (id) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.fulfillAuction(id).send({ from: accounts[0] });
    const updated = await getLiveAuctions();
    this.setState({ auctions: updated });
  };

  render() {
    return (
      <section>
        <h2>Live auctions</h2>
        {this.state.auctions.map((a) => (
          <div key={a.id}>
            <p>
              Seller: {a.seller} | Title: {a.title} | Price:{" "}
              {web3.utils.fromWei(a.startPrice, "ether")} ETH
            </p>
            <input type="text" placeholder="Your bid" id={`bid-${a.id}`} />
            <button
              className="btn-success"
              onClick={() =>
                this.bid(a.id, document.getElementById(`bid-${a.id}`).value)
              }
            >
              Bid
            </button>
            <button className="btn-danger" onClick={() => this.cancel(a.id)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={() => this.fulfill(a.id)}>
              Fulfill
            </button>
          </div>
        ))}
      </section>
    );
  }
}

export default AuctionList;
