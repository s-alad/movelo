const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy the BadgeCreator contract first
    const BadgeCreator = await hre.ethers.getContractFactory("BadgeCreator");
    const badgeCreator = await BadgeCreator.deploy();
    await badgeCreator.deployed();
    console.log("BadgeCreator deployed to:", badgeCreator.address);

    // Deploy the Movelo contract using the BadgeCreator's address
    const Movelo = await hre.ethers.getContractFactory("Movelo");
    const movelo = await Movelo.deploy(badgeCreator.address);
    await movelo.deployed();
    console.log("Movelo deployed to:", movelo.address);

    // Deploy Proxy contract using the Movelo's address
    const Proxy = await hre.ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy(movelo.address);
    await proxy.deployed();
    console.log("Proxy deployed to:", proxy.address);
}

// Recommended pattern for error handling
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });