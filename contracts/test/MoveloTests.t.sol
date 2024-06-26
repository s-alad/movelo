// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {Movelo} from "../src/Movelo.sol";

contract MoveloTest is Test {
    Movelo movelo;
    Movelo.Campaign test = Movelo.Campaign(address(this), "test", "test", "testURL", 0, 0, 1, 0, 0);

    event newCampaign(address creator, uint256 index);

    function setUp() public {
        movelo = new Movelo();
    }

    function testCreateCampaign_works() public {
        vm.expectEmit();
        emit newCampaign(test.sponsor, 0);
        movelo.createCampaign(test.name, test.description, test.imageURL, test.endBlock, test.vetPerMile);
        //assertEq(movelo.getNumberOfCampaignsOfAddress(address(this)), 1);
    }

    function testfundCampaign_works() public {
        testCreateCampaign_works();
        assertEq(movelo.getCampaign(address(this), 0).budget, 0);
        vm.deal(address(this), 100);
        movelo.fundCampaign{value: 100}(0);
        assertEq(movelo.getCampaign(address(this), 0).budget, 100);
    }

    function testfundCampaign_outOfBoundsIndex() public {
        vm.deal(address(this), 100);
        vm.expectRevert(Movelo.NoCampaignExists.selector);
        movelo.fundCampaign{value: 100}(0);
    }

    function testUpdateCampaign_updateOnlyName() public {
        testfundCampaign_works();

        string memory newName = "test2";
        string memory oldDescription = movelo.getCampaign(address(this), 0).description;
        movelo.updateCampaign(0, newName, "", "", 1, 0);
        assertEq(newName, movelo.getCampaign(address(this), 0).name);
        assertEq(oldDescription,  movelo.getCampaign(address(this), 0).description);  
    }

    function testPayout_works() public {
        testfundCampaign_works();

        uint256 miles = 1;
        uint256 expectedPayout = miles * test.vetPerMile;
        movelo.payout(address(this), 0, payable(address(1)), 1);
        assertEq(address(1).balance, expectedPayout);
    }

    function testPayout_onlyOwner() public {
        testfundCampaign_works();

        vm.prank(address(1));
        vm.expectRevert(Movelo.OnlyOwner.selector);
        movelo.payout(address(this), 0, payable(address(1)), 1);
    }

    function testWithdrawFunds_works() public {
        testfundCampaign_works();

        movelo.withdrawFunds(0);
        assertEq(100, address(this).balance);
        assertEq(movelo.getCampaign(address(this), 0).budget, 0);
    }

    fallback() external payable {}

    receive() external payable {}

}