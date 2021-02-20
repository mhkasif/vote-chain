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
      return res.status(200).json({ error: "Id card not valid" });
    }
    if (response.vote_casted)
    return  res.status(200).json({ error: "Vote is already casted" });
    else {
      res.status(200).json({ data: "validated" });
    }
  } catch (error) {
    res.status(200).json({ error: error });
    // console.log(error);
  }
};

module.exports = validateIdCard;
