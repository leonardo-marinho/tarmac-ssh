// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

contract Exemple {
  int public amount;
  string public userHash;

  function getAmount() view public returns(int) {
    return amount;
  }
  function getUserHash() view public returns(string memory) {
    return userHash;
  }
}
