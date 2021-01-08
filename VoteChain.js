const web3=require ('./web3')
const compiledVotechain= require("./build/VoteChain.json");
const interface=(compiledVotechain).abi;
const instance=new web3.eth.Contract(interface,process.env.ADDRESS)

module.exports=instance