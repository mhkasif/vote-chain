const HDWalletProvider = require("@truffle/hdwallet-provider");
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
// const { interface, bytecode } = require("../compile");
const compiledVotechain= require("../build/VoteChain.json");
const interface=(compiledVotechain).abi;
const bytecode=(compiledVotechain).evm.bytecode.object
console.log(interface)
const provider = new HDWalletProvider({
  mnemonic: {
    phrase:

      "together hotel expose elbow spoil rule never sketch code shine chunk item",
  },
  providerOrUrl:
    // process.env.INFURA_URL
    "http://localhost:7545"

});
const web3 = new Web3(provider);
let accounts;
let VoteChain;
beforeEach(async () => {
  //Get list of all accounts
  accounts = await web3.eth.getAccounts();
  console.log(accounts);
  //use one address to deploye the contract
  VoteChain = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: "1000000", gasLimit: "3000000" });
});

describe("VoteChain", () => {
  it("deploys a contract", () => {
    assert.ok(VoteChain.options.address);
  });
  it("has a Manager", async () => {
    const manager = await VoteChain.methods.manager().call();
    console.log(manager);
    assert.equal(manager, accounts[0]);
  });
  it("cast vote", async () => {
    const x = await VoteChain.methods
      .casteVote("8881212", "PTI")
      .send({ from: accounts[0], gas: "2000000" });

    const votecount = await VoteChain.methods.votecountofparty("PTI").call();
    const voted = await VoteChain.methods.voted("8881212").call();
    assert.equal(voted, true);
    assert.equal(votecount, 1);
  });
  it("failed to vote if not manager manager", async () => {
    try {
      await VoteChain.methods
        .casteVote("8881212", "PTI")
        .send({ from: accounts[1], gas: "2000000" });

      const votecount = await VoteChain.methods.votecountofparty("PTI").call();
      const voted = await VoteChain.methods.voted("8881212").call();
      assert.equal(voted, true);
      assert.equal(votecount, 1);
      assert.ok(false);
    } catch (error) {
      assert.ok(error);
    }
  });
  it("failed if already voted", async () => {
    try {
      await VoteChain.methods
        .casteVote("8881212", "PTI")
        .send({ from: accounts[0], gas: "2000000" });
      await VoteChain.methods
        .casteVote("8881212", "PTI")
        .send({ from: accounts[0], gas: "2000000" });

       await VoteChain.methods.votecountofparty("PTI").call();



      assert.ok(false);
    } catch (error) {
      assert.ok(error);
      // console.log(error)
    }
  });
});
