const {ethers} = require("ethers");

const ConnectWallet = async() => {
    try {
        const {ethereum} = window;

        if (!ethereum) {
            alert("Get Metamask Wallet!");
        }

        await ethereum.request({method: "eth_accounts"});
        await ethereum.request({method: "eth_requestAccounts"});

        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = provider.getSigner();
        return signer;
    } catch (error) {
        console.log(error);
    }
}

export default ConnectWallet;