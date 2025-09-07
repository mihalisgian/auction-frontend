import React, { Component } from "react";
import web3 from "../web3";
import contract from "../AuctionContract";

class Header extends Component {
  state = {
    currentAccount: "",
    owner: "",
    balance: "0",
    fees: "0",
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const owner = await contract.methods.owner().call();
    const balance = await web3.eth.getBalance(contract.options.address);
    const fees = await contract.methods.collectedFees().call();

    this.setState({
      currentAccount: accounts[0],
      owner,
      balance: web3.utils.fromWei(balance, "ether"),
      fees: web3.utils.fromWei(fees, "ether"),
    });


    window.ethereum.on("accountsChanged", async () => {
      const accounts = await web3.eth.getAccounts();
      this.setState({ currentAccount: accounts[0] });
    });

    contract.events.FeesUpdated().on("data", async () => {
      const balance = await web3.eth.getBalance(contract.options.address);
      const fees = await contract.methods.collectedFees().call();
      this.setState({
        balance: web3.utils.fromWei(balance, "ether"),
        fees: web3.utils.fromWei(fees, "ether"),
      });
    });
  }

  render() {
    return (
      <section>
        <h1>Auction DApp</h1>
        <p>
          <b>Current Address:</b> {this.state.currentAccount}
        </p>
        <p>
          <b>Owner's Address:</b> {this.state.owner}
        </p>
        <p>
          <b>Balance:</b> {this.state.balance} ETH
        </p>
        <p>
          <b>Collected fees:</b> {this.state.fees} ETH
        </p>
      </section>
    );
  }
}

export default Header;
