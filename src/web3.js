
import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && window.ethereum) {
  web3 = new Web3(window.ethereum);

} else if (typeof window !== "undefined" && window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {

  console.warn("No web3 provider found. Install MetaMask.");
}

export default web3;
