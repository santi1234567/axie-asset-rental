// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Rental is Ownable, IERC721Receiver {
    using Counters for Counters.Counter;

    mapping(address => mapping(uint256 => bool)) assetDeposited; // Lists deposited assets by address

    struct rent {
        address assetContract;
        uint256 assetId;
        uint256 minDays;
        uint256 maxDays;
        uint256 pricePerDay;
        address assetOwner;
        address rentedBy;
        uint256 rentExpireBlock;
    }

    Counters.Counter rentIdCounter;
    mapping(uint256 => rent) rents; // List of rents by rentId

    // Public functions

    // Funtion override to allow contract to recieve NFTs
    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /**
     * @dev Deposits an asset in the contract for lending. The rental contract requires approval from the asset contract.
     * @param _assetContract The contract address of the asset to be rented.
     * @param _assetId The Id of the asset to be rented.
     **/
    function depositAsset(address _assetContract, uint256 _assetId) public {
        IERC721 assetContract = IERC721(_assetContract);
        assetContract.safeTransferFrom(msg.sender, address(this), _assetId);
        assetDeposited[_assetContract][_assetId] = true;
    }

    /**
     * @dev Publishes a rental for a specific asset. Requires the asset to be deposited in the contract.
     * @param _assetContract The contract address of the asset to be rented.
     * @param _assetId The Id of the asset to be rented.
     **/
    function createRent(
        address _assetContract,
        uint256 _assetId,
        uint256 _minDays,
        uint256 _maxDays,
        uint256 _pricePerDay
    ) public {
        rent storage newRent = rents[rentIdCounter.current()];
        rentIdCounter.increment();
        newRent.assetOwner = msg.sender;
        newRent.depositedAsset = depositedAsset(_assetContract, _assetId);
    }
}
