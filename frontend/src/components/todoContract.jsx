import { ethers } from "ethers";
import ConnectWallet from "./connectWallet";
const Artifact = require("../utils/Todo.json");

const TodoContract = async () => {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  try {
    const connectWallet = await ConnectWallet();
    const signer = connectWallet;

    const contract = new ethers.Contract(contractAddress, Artifact.abi, signer);
    // console.log(contract);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export default TodoContract;
