const web3 = require("../web3");
const VoteChain = require("../VoteChain.js");
const casteVote = async (req, res) => {
  const { voter_id, partyName } = req.body;
  console.log(voter_id, partyName);
  try {
    const account = await web3.eth.getAccounts();
    VoteChain.methods
      .casteVote(voter_id, partyName)
      .send({ from: account[0], gas: "2000000" })
      .then((e) => res.status(200).json({ error: "vote casted successfully" }))
      .catch((e) => res.status(401).json({ error: "vote already casted" }));

    // }
  } catch (error) {
    res.status(404).json({ error: error });
    // console.log(error);
  }
};
const isVoted = async (req, res) => {
  const { voter_id } = req.body;
  try {
    console.log(voter_id, req.body);
    const account = await web3.eth.getAccounts();
    console.log(account);
    VoteChain.methods
      .voted(voter_id)
      .call({ from: account[0] })
      .then((e) => {
        console.log(e);
        if (e) res.status(200).json({ error: e, text: "vote already casted" });
        else res.status(200).json({ error: "Vote Not Casted yet" });
      })
      .catch((e) => res.status(404).json({ error: e }));
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
};
const voteCount = async (req, res) => {
  try {
    const account = await web3.eth.getAccounts();
    console.log(account);
    VoteChain.methods
      .votecountofparties("PTI", "PMLN", "PPP")
      .call({ from: account[0] })
      .then((e) => {
        console.log(e);
        res
          .status(200)
          .json({
            status: {
              PTI: Object.values(e)[0],
              PMLN: Object.values(e)[1],
              PPP: Object.values(e)[2],
            },
          });
      })
      .catch((e) => res.status(404).json({ error: e }));
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
};
module.exports = { casteVote, isVoted, voteCount };