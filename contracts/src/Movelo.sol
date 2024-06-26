// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Movelo {
    error OnlyOwner();
    error NoCampaignExists();
    error NotEnoughBudget();
    error TransactionFailed();
    error CampaignNotActive();
    error NoReentrancy();

    struct Campaign {
        address sponsor;
        string name;
        string description;
        string imageURL;
        uint256 budget;
        uint256 endBlock;
        uint256 vetPerMile;
        uint256 totalMiles;
        uint256 totalTrips;
    }


    address immutable i_OWNER;
    mapping(address => Campaign[]) addressToCampaigns;
    bool entered = false;

    modifier onlyOwner() {
        if (msg.sender != i_OWNER) {
            revert OnlyOwner();
        }
        _;
    }

    modifier existsAndActive(uint256 _index) {
        if (addressToCampaigns[msg.sender].length == 0) {
            revert NoCampaignExists();
        }

        if (addressToCampaigns[msg.sender].length - 1 < _index) {
            revert NoCampaignExists();
        }

        if(addressToCampaigns[msg.sender][_index].endBlock > block.number && addressToCampaigns[msg.sender][_index].endBlock != 0){
            revert CampaignNotActive();
        }
        _;
    }

    modifier reentrancyGuard() {
        if(entered = true){
            revert NoReentrancy();
        }
        entered = true;
        _;
        entered = false;
    }

    //add reentrancy check

    event newCampaign(address creator, uint256 index);

    constructor() {
        i_OWNER = msg.sender;
    }

    /**
     * 
     * @param _name Name of the campaign
     * @param _description Description of campaign
     * @param _imageUrl URL of the campaign logo
     * @param _blockDuration Number of blocks to keep the campaign open, set to 0 for infinite
     * @param _vetPerMile Wei per 0.000001 miles
     */
    function createCampaign(
        string memory _name,
        string memory _description,
        string memory _imageUrl,
        uint256 _blockDuration,
        uint256 _vetPerMile
    ) external payable {
        uint256 endBlock;

        if (_blockDuration == 0) {
            endBlock = 0;
        } else {
            endBlock = block.number + _blockDuration;
        }

        addressToCampaigns[msg.sender].push(
            Campaign(
                msg.sender,
                _name,
                _description,
                _imageUrl,
                msg.value,
                endBlock,
                _vetPerMile,
                0,
                0
            )
        );

        emit newCampaign(msg.sender, addressToCampaigns[msg.sender].length - 1);
    }

   /**
    * 
    * @param _index Index of campaign in users array of campaigns
    */
    function fundCampaign(uint256 _index) external payable existsAndActive(_index) {
        addressToCampaigns[msg.sender][_index].budget += msg.value;
    }


    /**
     * 
     * @param _index Index of campaign in users array of campaigns
     * @param _name Name to update campaign to
     * @param _description Decription to update campaign to
     * @param _imageUrl URL of logo to to update campaign to
     * @param _blocksToAdd Number of blocks to add to duration. Can be 0 to set length to infinite
     * @param _vetPerMile Wei per 0.000001 miles to update campaign to
     * @dev To only update one variable leave all others in default state ("" for strings, 0 for uint, 1 for blocksToAdd)
     */
    function updateCampaign(
        uint256 _index,
        string memory _name,
        string memory _description,
        string memory _imageUrl,
        uint256 _blocksToAdd,
        uint256 _vetPerMile
    ) 
        external 
        existsAndActive(_index) 
    {

        Campaign memory temp = addressToCampaigns[msg.sender][_index];
        Campaign memory updatedCampaign = Campaign(
            msg.sender,
            "",
            "",
            "",
            0,
            0,
            0,
            temp.totalMiles,
            temp.totalTrips
        );

        if (
            keccak256(abi.encodePacked(_name)) ==
            keccak256(abi.encodePacked(""))
        ) {
            updatedCampaign.name = temp.name;
        } else {
            updatedCampaign.name = _name;
        }

        if (
            keccak256(abi.encodePacked(_description)) ==
            keccak256(abi.encodePacked(""))
        ) {
            updatedCampaign.description = temp.description;
        } else {
            updatedCampaign.description = _description;
        }

        if (
            keccak256(abi.encodePacked(_imageUrl)) ==
            keccak256(abi.encodePacked(""))
        ) {
            updatedCampaign.description = temp.description;
        } else {
            updatedCampaign.imageURL = _imageUrl;
        }

        if (_blocksToAdd == 1) {
            updatedCampaign.endBlock = temp.endBlock;
        } else {
            updatedCampaign.endBlock = temp.endBlock + _blocksToAdd;
        }

        if (_vetPerMile == 0) {
            updatedCampaign.vetPerMile = temp.vetPerMile;
        } else {
            updatedCampaign.vetPerMile = _vetPerMile;
        }

        addressToCampaigns[msg.sender][_index] = updatedCampaign;
    }

    /**
     * 
     * @param _sponsor Sponsor of campaign's address
     * @param _index Index of campaign in sponsors array of campaigns
     * @param _recipient Address to payout to
     * @param _miles Number of miles completed by recipient
     */
    function payout(
        address _sponsor,
        uint256 _index,
        address payable _recipient,
        uint256 _miles
    ) 
        external 
        onlyOwner 
        existsAndActive(_index)
    {
        uint256 amountToBePaid = _miles * addressToCampaigns[_sponsor][_index].vetPerMile;

        if(amountToBePaid > addressToCampaigns[_sponsor][_index].budget){
            revert NotEnoughBudget();
        }

        (bool success,) = _recipient.call{value: amountToBePaid}("");

        if(!success){
            revert TransactionFailed();
        }

        addressToCampaigns[_sponsor][_index].budget -= amountToBePaid;
        addressToCampaigns[_sponsor][_index].totalMiles += _miles;
        addressToCampaigns[_sponsor][_index].totalTrips++;
    }

    /**
     * 
     * @param _index Index of campaign in users array of campaigns
     */
    function withdrawFunds(uint256 _index) external reentrancyGuard {

        (bool success,) = payable(msg.sender).call{value: addressToCampaigns[msg.sender][_index].budget}("");
        
        if(!success){
            revert TransactionFailed();
        }

        addressToCampaigns[msg.sender][_index].budget = 0;
    }

    /**
     * 
     * @param _sponsor Sponsor of campaign's address
     * @param _index Index of campaign in sponsors array of campaigns
     */
    function getCampaign(address _sponsor, uint256 _index) external view returns(Campaign memory) {
        return addressToCampaigns[_sponsor][_index];
    }

    /**
     * 
     * @param _sponsor Sponsor of campaign's address
     */
    function getNumberOfCampaignsOfAddress(address _sponsor) external view returns(uint256){
        return addressToCampaigns[_sponsor].length;
    }
}
