const web3 = require("../web3");
const VoteChain = require("../VoteChain.js");
const Voter = require("../Model/VoterModel");
const casteVote = async (req, res) => {
  const { voter_id, partyName } = req.body;
  console.log(voter_id, partyName);
  try {
    const account = await web3.eth.getAccounts();
    VoteChain.methods
      .casteVote(voter_id, partyName)
      .send({ from: account[0], gas: "2000000" })
      .then(async (e) => {
        console.log(e);
        const newV = await Voter.findOneAndUpdate(
          { voter_id },
          { vote_casted: true },
          { new: true }
        );
        res.status(200).json({
          text: "vote casted successfully",
          transactionId: e.transactionHash,
          votedTo: e.events.voteCasted.returnValues.partname,
        });
      })
      .catch((e) => res.status(200).json({ text: "vote already casted" }));
  } catch (error) {
    res.status(200).json({ error: error });
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
    const stats = await Voter.aggregate([
      {
        // $match: { $and: [{ gender: "male" }, { vote_casted: true }] },
        $match: { vote_casted: true },
      },
      {
        $group: {
          _id: "$gender",
          num: { $sum: 1 },
        },
      },
    ]);

    const youngAge = new Date().getFullYear() - 28;
    const middleAge = new Date().getFullYear() - 48;
    // const oldAge=new Date().getFullYear()-28;
    console.log(youngAge);
    const ageGroup = await Voter.aggregate([
      {
        $match: {
          vote_casted: true,
        },
      },
      {
        $facet: {
          young: [
            {
              $match: {
                dob: {
                  $gte: new Date(`${youngAge}-01-01`),
                },
              },
            },
            {
              $group: {
                _id: "young",
                num: { $sum: 1 },
              },
            },
          ],
          middle: [
            {
              $match: {
                dob: {
                  $gte: new Date(`${middleAge}-01-01`),
                  $lte: new Date(`${youngAge}-01-01`),
                },
              },
            },
            {
              $group: {
                _id: 'middle',
                num: { $sum: 1 },
              },
            },
          ],
          old: [
            {
              $match: {
                dob: {
                  // $gte: new Date(`${middleAge}-01-01`),
                  $lte: new Date(`${middleAge}-01-01`),
                },
              },
            },
            {
              $group: {
                _id: 'old',
                num: { $sum: 1 },
              },
            },
          ],
        },
        // $match: { $and: [{ gender: "male" }, { vote_casted: true }] },
      },
      // {
      //   // $match: { $and: [{ gender: "male" }, { vote_casted: true }] },
      //   $match: {
      //     dob: {
      //       $gte: new Date(middleAge),
      //       $lte: new Date(youngAge),
      //     },
      //   },
      // },
      // {
      //   $group: {
      //     _id: null,
      //     num: { $sum: 1 },
      //   },
      // },
      // {
      //   $match: {
      //     dob: {
      //       $lte: new Date(middleAge),
      //     },
      //   },
      // },
      // {
      //   $group: {
      //     _id: null,
      //     num: { $sum: 1 },
      //   },
      // }
    ]);
    console.log(ageGroup[0].young[0].num,ageGroup[0].middle[0].num,ageGroup[0].old[0].num);
    const account = await web3.eth.getAccounts();
    console.log(account);
    VoteChain.methods
      .votecountofparties("PTI", "PMLN", "PPP")
      .call({ from: account[0] })
      .then((e) => {
        console.log(e);
        res.status(200).json({
          status: {
            PTI: Object.values(e)[0],
            PMLN: Object.values(e)[1],
            PPP: Object.values(e)[2],
            female: stats.filter((e) => e._id === "female")[0].num + "",
            male: stats.filter((e) => e._id === "male")[0].num + "",
            young:ageGroup[0].young[0].num+'',
            middle:ageGroup[0].middle[0].num+'',
            old:ageGroup[0].old[0].num+''
          },
        });
      })
      .catch((e) => res.status(200).json({ error: e }));
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: error });
  }
};
module.exports = { casteVote, isVoted, voteCount };
