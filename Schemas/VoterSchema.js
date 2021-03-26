const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  voter_id: {
    type: String,
    required: true,
    unique: true,
  },
  expiry_date: {
    type: String,
    required: true,
  },
  vote_casted: {
    default: false,
    type: Boolean,
  },
  gender:{
    type:String,
    default:'male'
  },
  l1: {default:"none",type:String},
  l2: {default:"none",type:String},
  l3: {default:"none",type:String},
  l4: {default:"none",type:String},
  l5: {default:"none",type:String},
  r1: {default:"none",type:String},
  r2: {default:"none",type:String},
  r3: {default:"none",type:String},
  r4: {default:"none",type:String},
  r5: {default:"none",type:String}
});
module.exports = voterSchema;
