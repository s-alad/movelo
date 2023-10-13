[
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
      "inputs": [],
      "name": "getAllCampaignLatsLongs",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "uint256ToString",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
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