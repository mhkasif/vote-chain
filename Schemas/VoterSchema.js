const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
    voter_id: {
      type: String,
      required: true,
      unique: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    vote_casted:{
      default:false,
type:Boolean
    },
    l1:String
  });
  module.exports=voterSchema