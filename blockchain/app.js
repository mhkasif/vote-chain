console.log('started')
const Web3 = require("web3");
const web3 = new Web3(
  "https://mainnet.infura.io/v3/590e4cc3d6b7477c8d6e3b0db79e079d"
);
console.log(web3.utils.randomHex(32));
