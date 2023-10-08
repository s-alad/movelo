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
const ethers = require('ethers');
const { log } = require("console");

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

exports.createSponsorship = onRequest((request, response) => {
    //take private key from params
    /* const privateKey = request.query.private; */
    const privateKey = "0x01b40fd5a9d5469664271404bb1b2d584872eee1f59c09506afb00dc0f90f1a1"

    const provider = new ethers.providers.JsonRpcProvider('https://node-testnet.vechaindev.energy');

    const wallet = new ethers.Wallet(privateKey, provider);

    const contractAddress = "0x8161ffc13309613f9De0a3bc56e2586c92a4D6dE";

    const abi = [
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
      ]

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    async function makeSponsor() {
        try {
            const data = await contract.createSponsorship(
                "test", "desc", "img", 100, 5, [], [100], [100]
            );
            console.log(data);
            logger.info(data, {structuredData: true});
        } catch (error) {
            console.log(error);
            logger.info(error, {structuredData: true});
        }
    }

    makeSponsor();
});

