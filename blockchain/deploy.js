const HDWalletProvider=require('truffle-hdwallet-provider')
const Web3=require('web3')
const {interface,bytecode}=require('./compile')

const provider=new HDWalletProvider(
'basic force exit twice pulp kitten dolphin describe blast lemon flip unhappy',
"https://rinkeby.infura.io/v3/590e4cc3d6b7477c8d6e3b0db79e079d"
    )

const web3=new Web3(provider)

const deploy=async()=>{
const accounts=await web3.eth.getAccounts()
console.log('deploy ffrom acc',accounts[0]);
const result=await new web3.eth.Contract(JSON.parse(iterface))
.deploy({data:bytecode,arguments:['Hi there']})
.send({gas:'1000000',from:accounts[0]})

console.log('deployed to',result.options.address)
}
deploy()