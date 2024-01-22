const { ethers, upgrades } = require('hardhat');
const { Conflux, util } = require('connex-framework');

async function main() {
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

    // Connect to VeChain using Connex
    const connex = new Conflux({
        url: 'https://testnet.veblocks.net',
        defaultGasPrice: 180
    });
    const connexProvider = new connex.Provider('https://testnet.veblocks.net');

    // Deploy proxy contract
    const Proxy = await ethers.getContractFactory('Proxy');
    const proxy = await Proxy.deploy(movelo.address);
    await proxy.deployed();
    console.log('Proxy deployed to:', proxy.address);

    // ... (interactions using Connex if needed)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });