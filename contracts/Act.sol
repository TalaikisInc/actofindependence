pragma solidity ^0.4.21;


contract Act {

    bytes32 public symbol;
    bytes32 public  name;
    string public act = "";
    bool internal reentrancyLock = false;
    address public recipient;

    function Act() public {
        symbol = "ACT";
        name = "ActoOfIndependenceOfLithuania";
        // Forward funds to Ethereum foundation
        recipient = 0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359;
    }

    function () public payable {
        uint256 _weiAmount = msg.value;
        address _beneficiary = msg.sender;
        require(_beneficiary != address(0));
        require(_weiAmount > 0);
        require(!reentrancyLock);
        reentrancyLock = true;
        recipient.transfer(_weiAmount);
        reentrancyLock = false;
    }

}
