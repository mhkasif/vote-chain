const mongoose = require("mongoose");
const voterSchema = require("../Schemas/VoterSchema");

const Voter = mongoose.model("Voter", voterSchema);
// // const gender=['male','female']
// // // for(var i=0;i<500;i++){
// // //     const voter=new Voter({
// // //         voter_id:Math.floor(Math.random()*10e13),
// // //         expiry_date:"01/01/2021",
// // //         gender:gender[Math.floor(Math.random()*2)]
// // //     }).save().then(s=>console.log('saved',s)).catch(e=>console.log(e))
// // // }
// Voter.deleteMany({expiry_date:'01/01/2021'}).then(c=>console.log(c)).catch((e)=>console.log(e))
module.exports = Voter;
