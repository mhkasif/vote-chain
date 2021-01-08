const Web3 =require('web3');
const dotenv=require('dotenv')
dotenv.config({path:"./config.env"})
const HDWalletProvider = require("@truffle/hdwallet-provider");
// const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider({
  mnemonic: {
    phrase:
        process.env.MNEMONIC,
    //   "together hotel expose elbow spoil rule never sketch code shine chunk item",
  },
  providerOrUrl:
    process.env.INFURA_URL
    // "http://localhost:7545"

});

const web3 = new Web3(provider);
module.exports=web3
