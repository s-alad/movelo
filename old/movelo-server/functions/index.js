/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { ethers } = require('ethers');
const { log } = require("console");
const Driver = require('@vechain/connex.driver-nodejs');
const driver = new Driver('https://sync-testnet.vechain.org');
const connex = new Connex({ driver });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.getAddress = onRequest((request, response) => {
    logger.info("Hello logs!", {structuredData: true});
    console.log(request.query);
    logger.info(request.query, {structuredData: true});
    //get mnemonic from request
    const m = request.query.mnemonic;
    //strip the extra quotes
    const mnemonic = m.replace(/"/g, "");
    logger.info("HI: " + mnemonic, {structuredData: true});
    /* const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    console.log(wallet.address);
    response.send(wallet.address); */
    try {
        const wallet = ethers.Wallet.fromMnemonic(mnemonic);
        const privateKey = wallet.privateKey;
        console.log(wallet.address);
        logger.info(wallet.address, {structuredData: true});
        logger.info(privateKey, {structuredData: true});
        response.send(
            {
                "address": wallet.address,
                "private": privateKey,
                "mnemonic": mnemonic
            }
        );
    } catch (error) {
        console.log(error);
        response.send(
            {
                "error": "Invalid mnemonic"
            }
        );
    }
});

exports.delegateFee = onRequest(async (request, response) => {


  let to = request.query.to;
  let value = request.query.value;
  let data = request.query.data;
  let gasPayer = request.query.gasPayer;
  let gasPriceCoef = request.query.gasPriceCoef;
  let gas = request.query.gas;
  let dependsOn = request.query.dependsOn;
  let nonce = request.query.nonce;
  let signature = request.query.signature;
  let gasPayerSig = request.query.gasPayerSig;

  const clause = {
    to: to,  // Contract address
    value: value,  // Value to transfer
    data: data  // Encoded contract method call
};

const delegatedTx = {
    ...clause,
    gasPayer: gasPayer,  // Gas payer address
    gasPriceCoef: 0,
    gas: 21000,
    dependsOn: null,
    nonce: 12345,  // Unique nonce
    signature: signature,  // User's signature
    gasPayerSig: gasPayerSig  // Gas payer's signature
};
const result = await connex.thor.transaction(delegatedTx).commit();
});


exports.createSponsorship = onRequest((request, response) => {

    // Set up a provider (e.g., a connection to a test network)
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/7a4319061db849c3ac8c04cde995e81e');
    
    // Set up a signer (e.g., a wallet with a private key)
    const wallet = new ethers.Wallet('9eadccbca90b3efbfc8bc6cb6aea89758b6979c19d881d2782ac0d3b9f2072ae', provider);
    // The address of your deployed Movelo contract
    const moveloAddress = '0x818aDEE33B683D90556685bef6f7b4cB6763014F';
    
    // The ABI (Application Binary Interface) of your Movelo contract
    const moveloAbi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "badgeId",
              "type": "uint256"
            }
          ],
          "name": "BadgeEarned",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "activator",
              "type": "address"
            }
          ],
          "name": "EmergencyStopActivated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "activator",
              "type": "address"
            }
          ],
          "name": "EmergencyStopDeactivated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "sponsorshipId",
              "type": "uint256"
            }
          ],
          "name": "Payout",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "sponsorshipId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "sponsor",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "budget",
              "type": "uint256"
            }
          ],
          "name": "SponsorshipCreated",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "imageURI",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "sponsor",
              "type": "address"
            }
          ],
          "name": "awardBadge",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "campaignId",
              "type": "uint256"
            }
          ],
          "name": "campaignRunning",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "campaigns",
          "outputs": [
            {
              "internalType": "address",
              "name": "sponsor",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imageURL",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "budget",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ratePerMile",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalMiles",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalTrips",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imgeURL",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "duration",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ratePerMile",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "allowedAddresses",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "locationLatitudes",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "locationLongitudes",
              "type": "uint256[]"
            }
          ],
          "name": "createSponsorship",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "milesTraveled",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "nftContract",
          "outputs": [
            {
              "internalType": "contract BadgeCreator",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "miles",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "sponsorshipId",
              "type": "uint256"
            }
          ],
          "name": "payout",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "userBadges",
          "outputs": [
            {
              "internalType": "string",
              "name": "imageURI",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "dateEarned",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sponsor",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "userCampaigns",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "campaignId",
              "type": "uint256"
            }
          ],
          "name": "withdrawUnspentFunds",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];  // Paste your contract's ABI here
    
    // Create a contract instance
    const movelo = new ethers.Contract(moveloAddress, moveloAbi, wallet);
    const name = "Test Sponsorship";
    const description = "A test sponsorship for demonstrating the Movelo app.";
    const imageURL = "https://example.com/image.jpg";
    const duration = 7 * 24 * 60 * 60;  // 7 days in seconds
    const ratePerMile = ethers.utils.parseEther('0.01');  // 0.01 VET per mile
    const allowedAddresses = [];  // Empty array means all addresses are allowed
    const locationLatitudes = [];
    const locationLongitudes = [];
    async function addSponsorship() {
      const tx = await movelo.createSponsorship(
        name,
        description,
        imageURL,
        duration,
        ratePerMile,
        allowedAddresses,
        locationLatitudes,
        locationLongitudes,
        { value: ethers.utils.parseEther('10'), gasLimit: 3000000 }
      );
    
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log('Transaction mined:', receipt.transactionHash);
    
      // Output the SponsorshipCreated event (if any)
      const event = receipt.events.find(e => e.event === 'SponsorshipCreated');
      if (event) {
        console.log('SponsorshipCreated event:', event.args);
      }
    }
    
    // Run the function
    addSponsorship().catch(console.error);
});

