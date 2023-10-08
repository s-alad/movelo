const hre = require("hardhat")

async function main() {
  await hre.run('compile')

    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);

    // Deploy BadgeCreator contract
    const BadgeCreator = await ethers.getContractFactory('BadgeCreator');
    const badgeCreator = await upgrades.deployProxy(BadgeCreator, { kind: 'uups' });
    await badgeCreator.deployed();
    console.log('BadgeCreator deployed to:', badgeCreator.address);

    // Deploy Movelo contract
    const Movelo = await ethers.getContractFactory('Movelo');
    const movelo = await upgrades.deployProxy(Movelo, [badgeCreator.address], { kind: 'uups' });
    await movelo.deployed();
    console.log('Movelo deployed to:', movelo.address);



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })