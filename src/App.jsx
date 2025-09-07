import React, { Component } from "react";
import Header from "./components/Header";
import AuctionForm from "./components/AuctionForm";
import AuctionList from "./components/AuctionList";
import FulfilledAuctions from "./components/FulfilledAuctions";
import CanceledAuctions from "./components/CanceledAuctions";
import ControlPanel from "./components/ControlPanel";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AuctionForm />
        <AuctionList />
        <FulfilledAuctions />
        <CanceledAuctions />
        <ControlPanel />
      </div>
    );
  }
}

export default App;
