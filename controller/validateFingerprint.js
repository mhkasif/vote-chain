const Voter = require("../Model/VoterModel");
const axios = require("axios").default;
const Form = require("form-data");
const fs = require("fs");
const validateFingerprint = async (req, res) => {
  console.log(req.body, req.file);
  console.log("fingerprint controller");
  const { voter_id, index } = req.body;
  //TODO:destruct the value indexOfFinger and voter_id and send to afis api
  try {
    const response = await Voter.findOne({ voter_id });
    if (response) {
      const data = new Form();
      data.append("url", response[index]);

      data.append("file", req.file.buffer, {
        filename: `${req.file.fieldname}.${req.file.mimetype.split("/")[1]}`,
        contentType: req.file.mimetype,
      })

      // const formHeader = data.getHeaders();

      //  const resp =await axios.post("http://localhost:8800/test", data, {
      const prox = "https://cors-anywhere.herokuapp.com/";
      const url = "https://vote-chain-app.herokuapp.com/upload/";
      // const url="http://localhost:8800/test"
      data.submit(url, (err, resp) => {
        if (err) {
          res.status(200).json({ err: err });
        } else {
          console.log(resp.statusCode);
          if(resp.statusCode===200){
            res.status(200).json({ data: "matched" });
          }
          if(resp.statusCode===400){
            res.status(200).json({ data: "unmatched" });
          }
          res.status(200).json({ error: "error" });
        }
      });
      // const resp = await axios.post((url),
      // // axios.post((url),
      //   data,
      //   {
      //     // headers: { "Access-Control-Allow-Origin": "*","Accept":"*" },
      //     // headers: {"X-Frame-Options":"DENY","X-Content-Type-Options":"nosniff","Referrer-Policy":"same-origin","Server":"gunicorn/20.0.4","Allow":"POST,OPTIONS","Content-Type":"application/json" },
      //     headers: {...formHeader},
      //   }
      // )
      // .then(x=>console.log(x)).catch(e=>console.log(e));
      // console.log(resp);

      // res.status(200).json({ data: "resp" });
    } else res.status(200).json({ error: "voter does not exist" });
  } catch (error) {
    console.log(error)
    res.status(200).json({ error: error });
  }
};

module.exports = validateFingerprint;
