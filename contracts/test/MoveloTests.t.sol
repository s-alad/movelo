// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {Movelo} from "../src/Movelo.sol";

contract MoveloTest is Test {
    Movelo movelo;

    function setUp() public {
        movelo = new Movelo();
    }

    function testUpdateCampaign_indexDoesnExist() public {
        movelo.updateCampaign(1,"","","",0,0);
        //vm.expectRevert(movelo.NoCampaignExists.selector);
    }

}