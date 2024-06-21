// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Movelo {
    error OnlyOwner();
    error NoCampaignExists();
    error NotEnoughBudget();
    error TransactionFailed();
    error CampaignNotActive();

    struct Campaign {
        address sponsor;
        string name;
        string description;
        string imageURL;
        uint256 budget;
        uint256 endBlock;
        uint256 vetPerMile; //wei per 0.000001 miles
        uint256 totalMiles;
        uint256 totalTrips;
    }


    address immutable i_OWNER;
    mapping(address => Campaign[]) addressToCampaigns;

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

        if(addressToCampaigns[msg.sender][_index].endBlock > block.number){
            revert CampaignNotActive();
        }
        _;
    }

    event newCampaign(address creator, uint256 index);

    constructor() {
        i_OWNER = msg.sender;
    }

    //Create Campaign
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

   
    function fundCampaign(uint256 _index) external payable {
        addressToCampaigns[msg.sender][_index].budget += msg.value;
    }

    
    function updateCampaign(
        uint256 _index,
        string memory _name,
        string memory _description,
        string memory _imageUrl,
        uint256 _blockDuration,
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
        }

        if (
            keccak256(abi.encodePacked(_description)) ==
            keccak256(abi.encodePacked(""))
        ) {
            updatedCampaign.description = temp.description;
        }

        if (
            keccak256(abi.encodePacked(_imageUrl)) ==
            keccak256(abi.encodePacked(""))
        ) {
            updatedCampaign.description = temp.description;
        }

        //Campaign can be updated to infinite by putting block duration to 0
        if (_blockDuration == 1) {
            updatedCampaign.endBlock = temp.endBlock;
        }

        if (_vetPerMile == 0) {
            updatedCampaign.vetPerMile = temp.vetPerMile;
        }

        addressToCampaigns[msg.sender][_index] = updatedCampaign;
    }

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
    }

    function withdrawFunds(uint256 _index) external {

        (bool success,) = payable(msg.sender).call{value: addressToCampaigns[msg.sender][_index].budget}("");
        
        if(!success){
            revert TransactionFailed();
        }

        addressToCampaigns[msg.sender][_index].budget = 0;
    }

    function getCampaign(address _sponsor, uint256 _index) external view returns(Campaign memory) {
        return addressToCampaigns[_sponsor][_index];
    }
}
