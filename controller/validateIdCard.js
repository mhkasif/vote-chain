const Voter = require("../Model/VoterModel");

const validateIdCard = async (req, res) => {
  const { voter_id, expiry_date } = req.body;

  try {
    const response = await Voter.findOne({ voter_id, expiry_date });
    console.log(response);
    if (!response) {
      return res.status(404).json({ error: "Id card not valid" });
    }
    if (response.vote_casted)
      res.status(404).json({ error: "Vote is already casted" });
    else res.status(200).json({ data: "validated" });
  } catch (error) {
    res.status(404).json({ error: error });
    console.log(error);
  }
};


module.exports=validateIdCard