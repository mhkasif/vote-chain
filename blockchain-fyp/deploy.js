const dotenv=require('dotenv')
dotenv.config({path:"./config.env"})
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
// const { interface, bytecode } = require("./compile");

const compiledVotechain= require("./build/VoteChain.json");
const interface=(compiledVotechain).abi;
const bytecode=(compiledVotechain).evm.bytecode.object

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

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
web3.eth.getBalance(accounts[0]).then((e)=>console.log(e));
    console.log("deploy from acc", accounts[0]);
    const result = await new web3.eth.Contract(interface)
      .deploy({ data: bytecode, arguments: [] })
      .send({ from: accounts[0], gas: "1000000", gasLimit: "3000000" });

    console.log("deployed to", result.options.address);
  } catch (error) {
    console.log(error);
  }
};
deploy();
