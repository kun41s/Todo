const { ethers } = require("hardhat");

async function main() {
    const TodoContract = await ethers.getContractFactory("Todo");
    const todo = await TodoContract.deploy();
    console.log("Contract Address ", todo.address);
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });