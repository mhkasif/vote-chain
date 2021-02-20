const Voter = require("../Model/VoterModel");
const axios = require("axios").default;
const Form = require("form-data");
const fs = require("fs");
const validateFingerprint = async (req, res) => {
  // console.log(req.body, req.file);
  // console.log("fingerprint controller");
  const { voter_id, index } = req.body;
  //TODO:destruct the value indexOfFinger and voter_id and send to afis api
  try {
    const response = await Voter.findOne({ voter_id });
    if (response) {
      const data = new Form();
      data.append("link", response[index]);

      data.append("file", req.file.buffer, {
        filename: `${req.file.fieldname}.${req.file.mimetype.split("/")[1]}`,
        contentType: req.file.mimetype,
      });

    //   const formHeader = data.getHeaders();

    //  const resp =await axios.post("http://localhost:8800/test", data, {
    //     headers: { ...formHeader },
    //   });
    //   console.log(resp)
      res.status(200).json({ data: "matched" });
    } else res.status(200).json({ error: "voter does not exist" });
  } catch (error) {
    console.log(error, "not matched");
    res.status(200).json({ error:"not matched" });
  }
};

module.exports = validateFingerprint;
