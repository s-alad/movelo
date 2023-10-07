// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC721.sol";

contract Movelo {
    address public owner;

    struct Sponsorship {
        address sponsor;
        uint256 budget;
        uint256 endTime;
        uint256 ratePerMile; // In VET
        address[] allowedAddresses;
        uint256[] locationLatitudes;
        uint256[] locationLongitudes; 
    }

    struct Badge {
        string imageURI;
        string description;
        uint256 dateEarned;
        address sponsor;
    }

    BadgeCreator public nftContract;  // The NFT contract.
    Sponsorship[] public sponsorships;  // Array to track all sponsorships.
    mapping(address => uint256) public milesTraveled;  // User profile tracking miles.
    mapping(address => Badge[]) public userBadges;

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
        uint256 duration, 
        uint256 ratePerMile, 
        address[] memory allowedAddresses,
        uint256[] memory locationLatitudes,
        uint256[] memory locationLongitudes
        ) external {
        Sponsorship memory newSponsorship = Sponsorship({
            sponsor: msg.sender,
            budget: budget,
            endTime: block.timestamp + duration,
            ratePerMile: ratePerMile,
            allowedAddresses: allowedAddresses,
            locationLatitudes: locationLatitudes,
            locationLongitudes: locationLongitudes
        });

        sponsorships.push(newSponsorship);
        emit SponsorshipCreated(sponsorships.length - 1, msg.sender, budget);
    }

    function payout(uint256 miles, uint256 sponsorshipId) external {
        require(sponsorshipId < sponsorships.length, "Invalid sponsorshipId");
        Sponsorship storage sponsorship = sponsorships[sponsorshipId];

        require(block.timestamp <= sponsorship.endTime, "Sponsorship has ended");
        require(sponsorship.budget > 0, "No funds left in this sponsorship");

        // Check if this address is allowed for this sponsorship
        if (sponsorship.allowedAddresses.length > 0) {
            require(isAddressInList(msg.sender, sponsorship.allowedAddresses), "Not allowed for this sponsorship");
        }

        uint256 amount = miles * sponsorship.ratePerMile;
        require(amount <= sponsorship.budget, "Not enough funds left in the sponsorship");

        sponsorship.budget -= amount;  // Deduct from sponsorship
        payable(msg.sender).transfer(amount);  // Pay the user

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

    function withdrawUnspentFunds(uint256 sponsorshipId) external {
        require(sponsorshipId < sponsorships.length, "Invalid sponsorshipId");
        Sponsorship storage sponsorship = sponsorships[sponsorshipId];

        require(msg.sender == sponsorship.sponsor, "Only the sponsor can withdraw");
        require(block.timestamp > sponsorship.endTime, "Sponsorship is still active");
        require(sponsorship.budget > 0, "No funds left to withdraw");

        uint256 amount = sponsorship.budget;
        sponsorship.budget = 0;  // Set the budget to zero to prevent double withdrawals

        payable(msg.sender).transfer(amount);
    }

}