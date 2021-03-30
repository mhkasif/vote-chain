const mongoose = require("mongoose");
const voterSchema = require("../Schemas/VoterSchema");

const Voter = mongoose.model("Voter", voterSchema);
const gender=['male','female']
const min=new Date().getFullYear()-19
const max=new Date().getFullYear()-120
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (min - max) + max);
  }
// for(var i=0;i<500;i++){

//     var birthDay=new Date( getRandomArbitrary(min, max)+'')
//     const voter=new Voter({
//         voter_id:Math.floor(Math.random()*10e13),
//         expiry_date:"01/01/2021",
//         gender:gender[Math.floor(Math.random()*2)],
//         dob:birthDay
//     }).save().then(s=>console.log('saved',s)).catch(e=>console.log(e))
// }
// Voter.deleteMany({$and:[{expiry_date:'01/01/2021'},{vote_casted:false}]}).then(c=>console.log(c)).catch((e)=>console.log(e))
module.exports = Voter;
