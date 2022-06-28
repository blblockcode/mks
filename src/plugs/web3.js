import Web3 from 'web3'
import {FULL_HOST} from "../config/common";

export async function initWeb3(isEnable = true) {
    // 检查是否是新的MetaMask 或 DApp浏览器
    let web3Provider;
    if (window.ethereum) {
        web3Provider = window.ethereum;
        if (isEnable) {
            try {
                // 请求用户授权
                await window.ethereum.enable();
            } catch (error) {
                // 用户不授权时
                console.error("User denied account access")
                alert("User denied account access")
                return null
            }
        }
    } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
        web3Provider = window.web3.currentProvider;
    } else {
        web3Provider = new Web3.providers.HttpProvider(FULL_HOST);
    }
    return new Web3(web3Provider);
}

export async function deployToken() {
    let web3 = await initWeb3()
    let accounts = await web3.eth.getAccounts()
    const encodeData = "0x606060405260408051908101604052600c81527f4d696c6b79737761702e696f00000000000000000000000000000000000000006020820152600090805161004b9291602001906100b1565b5060408051908101604052600381527f4d4b530000000000000000000000000000000000000000000000000000000000602082015260019080516100939291602001906100b1565b506002805460ff1916601217905534156100ac57600080fd5b61014c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100f257805160ff191683800117855561011f565b8280016001018555821561011f579182015b8281111561011f578251825591602001919060010190610104565b5061012b92915061012f565b5090565b61014991905b8082111561012b5760008155600101610135565b90565b6104de8061015b6000396000f3006060604052600436106100825763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde03811461008757806323b872dd14610111578063313ce5671461015a578063512d7cfd1461018357806370a08231146101d657806395d89b4114610214578063a9059cbb14610227575b600080fd5b341561009257600080fd5b61009a610256565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156100d65780820151838201526020016100be565b50505050905090810190601f1680156101035780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561011c57600080fd5b61014673ffffffffffffffffffffffffffffffffffffffff600435811690602435166044356102f4565b604051901515815260200160405180910390f35b341561016557600080fd5b61016d610382565b60405160ff909116815260200160405180910390f35b341561018e57600080fd5b6101d46004602481358181019083013580602081810201604051908101604052809392919081815260200183836020028082843750949650509335935061038b92505050565b005b34156101e157600080fd5b61020273ffffffffffffffffffffffffffffffffffffffff60043516610423565b60405190815260200160405180910390f35b341561021f57600080fd5b61009a610433565b341561023257600080fd5b61014673ffffffffffffffffffffffffffffffffffffffff6004351660243561049e565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102ec5780601f106102c1576101008083540402835291602001916102ec565b820191906000526020600020905b8154815290600101906020018083116102cf57829003601f168201915b505050505081565b600073ffffffffffffffffffffffffffffffffffffffff83161561031757600080fd5b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405190815260200160405180910390a35060019392505050565b60025460ff1681565b60008083519150600090505b8181101561041d578381815181106103ab57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8560405190815260200160405180910390a3600101610397565b50505050565b506a05606db4c034089680000090565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102ec5780601f106102c1576101008083540402835291602001916102ec565b60006104ab3384846102f4565b93925050505600a165627a7a7230582057262f3a3e15bfa9800f63868b9f3cb97c42d3b5e7cd0af377ab9b77c45dd7d00029"
    return new Promise((resolve, reject) => {
        web3.eth.sendTransaction({
            from: accounts[0],
            data: encodeData,
        }, (err, transactionHash) => {
            console.log(transactionHash);
            if (err) {
                reject(err)
            }
            resolve(transactionHash)
        });
    })

}

export async function batchTransferToken(token, users, amount) {
    let web3 = await initWeb3()
    amount = amount + "" + Math.pow(10, 18)
    let accounts = await web3.eth.getAccounts()
    const abi = [{"constant":false,"inputs":[{"name":"_users","type":"address[]"},{"name":"amount","type":"uint256"}],"name":"batchTransferToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];
    const abiToken = new web3.eth.Contract(abi, token);
    let encodeABI = abiToken.methods.batchTransferToken(users, amount).encodeABI()
    console.log({
        from: accounts[0],
        to: token,
        data: encodeABI
    })
    return new Promise((resolve, reject) => {
        web3.eth.sendTransaction({
            from: accounts[0],
            to: token,
            data: encodeABI
        }, (err, transactionHash) => {
            console.log(transactionHash);
            if (err) {
                reject(err)
            }
            resolve(transactionHash)
        });
    })

}