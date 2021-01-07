const mongoose = require("mongoose");
const voterSchema = require("../Schemas/VoterSchema");

const Voter = mongoose.model("Voter", voterSchema);

// for(var i=0;i<500;i++){
//     const voter=new Voter({
//         voter_id:Math.floor(Math.random()*10e13),
//         expiry_date:new Date(new Date().setHours(Math.random()*10e4))
//     }).save().then(s=>console.log('saved',s)).catch(e=>console.log(e))
// }
module.exports=Voter