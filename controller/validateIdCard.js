const Voter = require("../Model/VoterModel");
const VoteChain = require("../VoteChain.js");

const web3 = require("../web3");
const validateIdCard = async (req, res) => {
  const { voter_id, expiry_date } = req.body;
  console.log(voter_id);
  try {
    // const response = await Voter.findOne({ voter_id, expiry_date });
    const response = await Voter.findOne({ voter_id });
    console.log(response);
    if (!response) {
      return res.status(404).json({ error: "Id card not valid" });
    }
    if (response.vote_casted)
      res.status(404).json({ error: "Vote is already casted" });
    else {
      const account = await web3.eth.getAccounts();
      console.log(account);
      // const votecount = await VoteChain.methods.votecountofparty("PTI").call();
      // console.log(votecount);
      VoteChain.methods
        .casteVote(voter_id, "PTI")
        .send({ from: account[0], gas: "2000000" })
        .then((e) => console.log(e))
        .catch((e) => console.log(e));
      // VoteChain.methods
      //   .voted(voter_id)
      //   .call({ from: account[0] })
      //   .then((e) => {
      //     if (e) res.status(200).json({ data: "vote casted" });
      //   })
        // .catch((e) => console.log(e));
      //  const vote=await VoteChain.methods.voted(voter_id).call({from:account[0]})
      // console.log(voted);
      res.status(200).json({ data: "validated" });
    }
  } catch (error) {
    res.status(404).json({ error: error });
    // console.log(error);
  }
};

module.exports = validateIdCard;
