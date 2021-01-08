const express = require("express");
const multer = require("multer");
const validateFingerprint = require("./controller/validateFingerprint");
const validateIdCard = require("./controller/validateIdCard");
const app = express();
const {isVoted,casteVote,voteCount}=require('./controller/casteVote')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
      console.log(req.body)
    const ext = file.mimetype.split("/")[1];
    cb(null, `${req.body.voter_id}-${req.body.finger}_${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else {
    cb("Not an image", false);
  }
};

const upload = multer({
  storage:multerStorage,
  fileFilter:multerFilter
});

app.use(express.json());

app.post("/validate", validateIdCard);
app.post("/is-voted",  isVoted);
app.post("/caste-vote",  casteVote);
app.get("/vote-count",  voteCount);
app.post("/fingerprint", upload.single("data"), validateFingerprint);


module.exports = app;
