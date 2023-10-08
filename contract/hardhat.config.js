require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@vechain/hardhat-vechain");
require("@vechain/web3-providers-connex");
require("@vechain/hardhat-web3");

module.exports = {
  defaultNetwork: "vechain",
  networks: {
    localhost: {
      url: "https://localhost:8669",
    },
    vechain: {
      url: "http://127.0.0.1:8669/",
      accounts: [`${process.env.PRIVATE_KEY}`],  
    },
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  plugins: [
    "@vechain/web3-providers-connex",
    "@vechain/hardhat-vechain",
    "@vechain/hardhat-web3",
    "@vechain/hardhat-ethers",
  ],
};
