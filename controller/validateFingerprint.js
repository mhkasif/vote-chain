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
    // console.log(response);
    if (response) {
      // console.log(req.file)
      const data = new Form();
      data.append("link", response[index]);
      // data.append("file" ,req.file.buffer,{filename: `${req.file.fieldname}.${req.file.mimetype.split('/')[0]}`, contentType: req.file.mimetype});
      data.append("file", req.file.buffer, {
        filename: `${req.file.fieldname}.${req.file.mimetype.split("/")[1]}`,
        contentType: req.file.mimetype,
      });
      // // data.append({url:response[index]})
      const formHeader = data.getHeaders();
      // const r = await axios({
      //   method: "POST",
      //   // headers: { "Content-Type": "multipart/form-data" },
      //   // url: "https://vote-chain95.herokuapp.com/test",
      //   url: "http://localhost:8800/test",
      //   data
      // });
      // console.log(r)
      await axios.post("http://localhost:8800/test", data, {
        headers: { ...formHeader },
      });
      res.json({ voter: response });
    } else res.json({ voter: "does not exist" });
  } catch (error) {
    console.log(error, "xxx");
    res.json({ error });
  }
};

module.exports = validateFingerprint;
