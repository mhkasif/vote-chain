const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");


const buildPath=path.resolve(__dirname,'build');
fs.removeSync(buildPath)



const votechainPath = path.resolve(__dirname, "contracts", "VoteChain.sol");
const source = fs.readFileSync(votechainPath, 'UTF-8');
const str='VoteChain.sol'
var input = {
    language: 'Solidity',
    sources: {
        [str] : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};
const contract=JSON.parse(solc.compile(JSON.stringify(input))).contracts['VoteChain.sol']['VoteChain'];
// console.log(x.evm.bytecode.object)
fs.ensureDirSync(buildPath);
fs.outputJSONSync(path.resolve(buildPath,'VoteChain.json'),
contract
)
module.exports={
    interface:contract.abi,
    bytecode:contract.evm.bytecode.object
}


// console.log(JSON.parse(solc.compile(JSON.stringify(input))));
// const source = fs.readFileSync(votechainPath, "utf8");
// // const contract=await
// console.log( solc.compile(source, 1))




// for (var contractName in output.contracts) {
//     // code and ABI that are needed by web3
//     console.log(contractName + ': ' + output.contracts[contractName].bytecode)
//     console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface))
// }
// module.exports=solc.compile(source, 1).contracts[':VoteChain']
