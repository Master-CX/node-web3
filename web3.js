import { ethers } from "ethers";

//let ethers = require("ethers");

const providerETH = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/OwjMYU-HNcTRW9xabt_XAiLageaUnETd");

//const providerARB = new ethers.providers.JsonRpcProvider("https://arb-mainnet.g.alchemy.com/v2/7AYSWY6s35yiR1WHiXBs4pU8uAqQjcuk");

//const providerGOE = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/AcW0x39sng26H94Ot8FMC5xLTbpVTh8R");

const balance = await providerETH.getBalance("d-crypto.eth");

console.log(`ETH余额余额 ${ethers.utils.formatEther(balance)} ETH`);

const network = await providerETH.getNetwork();

console.log(`连接到${network.name}网络`);

const blockNumber = await providerETH.getBlockNumber();
// 查询区块消息
const block = await providerETH.getBlock(0);

console.log(`当前${network.name}网络 网络区块高度为：${blockNumber}`);

const gasPrice = await providerETH.getGasPrice();
console.log(gasPrice)
console.log(`当前${network.name}网络 gas price 为：${gasPrice}`);

const gas = await providerETH.getFeeData();

console.log(`当前${network.name}网络 建议设置gas为：${gas}`);
console.log(gas)

// 根据合约地址查询bytecode 传入参数
const byteCode = await providerETH.getCode("0x89008551Dc4C8fe263fb682Db9CA91AEC26bc501");
const randomWallet = new ethers.Wallet.createRandom();
//const randomWithProvider = randomWallet.connect(providerETH);
const rmnemonic = randomWallet.mnemonic;

const account = new ethers.Wallet("私钥",providerETH);
// 获取助记词和私钥
const mnemonic = account.mnemonic.phrase;
const prikey = account.privateKey;
// 获取钱包交互次数 
const txCount = await account.getTransactionCount();

// 只读合约调用 ethers特殊 引入人类可读abi 输入所需要的函数 ethers自动转换成abi
const abiERC = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (unit)",
];
const abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_maxTxAmount","type":"uint256"}],"name":"MaxTxAmountUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"notbot","type":"address"}],"name":"delBot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"manualsend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"manualswap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"openTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"bots_","type":"address[]"}],"name":"setBots","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"onoff","type":"bool"}],"name":"setCooldownEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]'
// 获取合约消息 后续可通过contractToken调用链上方法 参数：合约地址 ，abi ，provider
const contractToken = new ethers.Contract("0x89008551Dc4C8fe263fb682Db9CA91AEC26bc501" , abi , providerETH) ;

const onlyReadContract = async (addressToken) => {
    // 获取token名字
    const tokenName = await contractToken.name()
    // 获取token标识
    const tokenSymbol = await contractToken.symbol()
    // 获取token总供应量
    const totalSupply = await contractToken.totalSupply()
    console.log(`总供给：${ethers.utils.formatUnits(totalSupply,9)} ${tokenSymbol}`)
    // 查询某地址余额
    const balanceToken = await contractToken.balanceOf(addressToken)
    console.log(`地址：${addressToken} 当前余额：${ethers.utils.formatUnits(balanceToken,9)}`)
}
const sendEth = async (to ,value ) =>{
    console.log(`当前钱包余额：${}余额`)
}
onlyReadContract("0x68cb015699cb565bbe4b08402b6886ac26e43f73")
