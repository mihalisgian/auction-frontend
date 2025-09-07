import React, { Component } from "react";
import web3 from "../web3";
import contract from "../AuctionContract";

class ControlPanel extends Component {
  state = { newOwner: "", banSeller: "" };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  withdraw = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.withdrawFees().send({ from: accounts[0] });
  };

  changeOwner = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.transferOwnership(this.state.newOwner).send({ from: accounts[0] });
  };

  banSeller = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.banSeller(this.state.banSeller).send({ from: accounts[0] });
  };

  destroy = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.destroy().send({ from: accounts[0] });
  };

  render() {
    return (
      <section>
        <h2>Control Panel</h2>
        <button onClick={this.withdraw}>Withdraw</button>
        <div>
          <input
            type="text"
            name="newOwner"
            placeholder="Enter new owner's wallet"
            value={this.state.newOwner}
            onChange={this.handleChange}
          />
          <button onClick={this.changeOwner}>Change Owner</button>
        </div>
        <div>
          <input
            type="text"
            name="banSeller"
            placeholder="Enter seller address"
            value={this.state.banSeller}
            onChange={this.handleChange}
          />
          <button onClick={this.banSeller}>Ban Seller</button>
        </div>
        <button className="btn-danger" onClick={this.destroy}>
          Destroy
        </button>
      </section>
    );
  }
}

export default ControlPanel;
