// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC721.sol";

contract Movelo {
    address public owner;
    
    struct Campaign {
        address sponsor;
        string name;
        string description;
        string imageURL;
        uint256 budget;
        uint256 endTime;
        uint256 ratePerMile; // In VET
        address[] allowedAddresses;
        uint256[] locationLatitudes;
        uint256[] locationLongitudes; 
        uint256 totalMiles; 
        uint256 totalTrips;
    }

    struct Badge {
        string imageURI;
        string description;
        uint256 dateEarned;
        address sponsor;
    }

    BadgeCreator public nftContract;  // The NFT contract.
    Campaign[] public campaigns;  // Array to track all sponsorships.
    mapping(address => uint256) public milesTraveled;  // User profile tracking miles.
    mapping(address => Badge[]) public userBadges;
    mapping(address => uint256[]) public userCampaigns;

    event SponsorshipCreated(uint256 sponsorshipId, address sponsor, uint256 budget);
    event Payout(address user, uint256 amount, uint256 sponsorshipId);
    event BadgeEarned(address user, uint256 badgeId);
    event EmergencyStopActivated(address activator);
    event EmergencyStopDeactivated(address activator);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this");
        _;
    }


    constructor(address _nftContractAddress) {
        nftContract = BadgeCreator(_nftContractAddress);
        owner = msg.sender;
    }

    function createSponsorship(
        uint256 budget, 
        string memory name,
        string memory description,
        string memory imgeURL,
        uint256 duration, 
        uint256 ratePerMile, 
        address[] memory allowedAddresses,
        uint256[] memory locationLatitudes,
        uint256[] memory locationLongitudes
        ) external {
        Campaign memory newCampaign = Campaign({
            sponsor: msg.sender,
            budget: budget,
            name: name,
            description: description,
            imageURL: imgeURL,
            endTime: block.timestamp + duration,
            ratePerMile: ratePerMile,
            allowedAddresses: allowedAddresses,
            locationLatitudes: locationLatitudes,
            locationLongitudes: locationLongitudes,
            totalMiles: 0,
            totalTrips: 0
        });

        campaigns.push(newCampaign);
        emit SponsorshipCreated(campaigns.length - 1, msg.sender, budget);
    }

    function payout(uint256 miles, uint256 sponsorshipId) external {
        require(sponsorshipId < campaigns.length, "Invalid sponsorshipId");
        Campaign storage campaign = campaigns[sponsorshipId];

        require(block.timestamp <= campaign.endTime, "Sponsorship has ended");
        require (campaign.budget > 0, "No funds left in this sponsorship");

        // Check if this address is allowed for this sponsorship
        if (campaign.allowedAddresses.length > 0) {
            require(isAddressInList(msg.sender, campaign.allowedAddresses), "Not allowed for this sponsorship");
        }

        uint256 amount = miles * campaign.ratePerMile;
        require(amount <= campaign.budget, "Not enough funds left in the sponsorship");

        campaign.budget -= amount;  // Deduct from sponsorship
        payable(msg.sender).transfer(amount);  // Pay the user

        milesTraveled[msg.sender] += miles;  // Update user profile
        campaign.totalMiles += miles;  // Update campaign
        campaign.totalTrips += 1;  // Update campaign

        emit Payout(msg.sender, amount, sponsorshipId);
    }

    function awardBadge(address user, string memory imageURI, string memory description, address sponsor) external onlyOwner {
        Badge memory newBadge = Badge({
            imageURI: imageURI,
            description: description,
            dateEarned: block.timestamp,
            sponsor: sponsor
        });

        userBadges[user].push(newBadge);
        uint256 badgeId = userBadges[user].length - 1;
        nftContract.mint(user, badgeId);

        emit BadgeEarned(user, badgeId);
    }

    function isAddressInList(address user, address[] memory list) private pure returns (bool) {
        for (uint i = 0; i < list.length; i++) {
            if (list[i] == user) {
                return true;
            }
        }
        return false;
    }

    function campaignRunning(uint256 campaignId) external returns (bool) {
        require(campaignId < campaigns.length, "Invalid campaignId");
        Campaign storage campaign = campaigns[campaignId];

        if (block.timestamp <= campaign.endTime && campaign.budget > 0) {
            return true;
        } else {
            address campaignOwner = campaigns[campaignId].sponsor;  // Retrieve the owner's address of this campaign
            uint256[] storage ownedCampaigns = userCampaigns[campaignOwner];
            for (uint256 i = 0; i < ownedCampaigns.length; i++) {
                if (ownedCampaigns[i] == campaignId) {
                    // Swap the campaign to delete with the last campaign in the array
                    ownedCampaigns[i] = ownedCampaigns[ownedCampaigns.length - 1];
                    // Decrease the array length by 1 to remove the last item
                    ownedCampaigns.pop();
                    break;
                }
            }
            return false;
        }
    }

    function withdrawUnspentFunds(uint256 campaignId) external {
        require(campaignId < campaigns.length, "Invalid sponsorshipId");
        Campaign storage campaign = campaigns[campaignId];

        require(msg.sender == campaign.sponsor, "Only the sponsor can withdraw");
        require(block.timestamp > campaign.endTime, "Sponsorship is still active");
        require(campaign.budget > 0, "No funds left to withdraw");

        uint256 amount = campaign.budget;
        campaign.budget = 0;  // Set the budget to zero to prevent double withdrawals

        payable(msg.sender).transfer(amount);
    }

}