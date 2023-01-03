// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "./IRERC721.sol";

contract Rental is Ownable, IERC721Receiver {
    using Counters for Counters.Counter;
    string defaultTokenURI = "https://ronin.rest/ronin/axie/9953568";

    address RENTED_ERC721_CONTRACT = address(0);

    mapping(address => mapping(uint256 => bool)) assetDeposited; // Indicates if asset is deposited

    struct rent {
        address assetContract;
        uint256 assetId;
        uint256 minDays;
        uint256 maxDays;
        uint256 pricePerDay;
        address assetOwner;
        address rentedBy;
        uint256 rentExpireBlockTimeStamp;
        bool active;
    }

    Counters.Counter rentIdCounter;
    mapping(uint256 => rent) rents; // List of rents by rentId

    mapping(address => mapping(uint256 => bool)) assetOnActiveRent; // Indicates if asset has an active rent

    constructor(address _rentedERC721Contract) {
        RENTED_ERC721_CONTRACT = _rentedERC721Contract;
    }

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
     * @param _assetContract The contract address of the asset to be deposited.
     * @param _assetId The Id of the asset to be deposited.
     **/
    function depositAsset(address _assetContract, uint256 _assetId) public {
        IERC721 assetContract = IERC721(_assetContract);
        assetContract.safeTransferFrom(msg.sender, address(this), _assetId);
        assetDeposited[_assetContract][_assetId] = true;
    }

    /**
     * @dev Retrieves an asset from the contract for lending. The rental contract requires approval from the asset contract.
     * @param _assetContract The contract address of the asset to be retrieved.
     * @param _assetId The Id of the asset to be retrieved.
     **/
    function retrieveAsset(address _assetContract, uint256 _assetId) public {
        require(assetDeposited[_assetContract][_assetId]);
        require(!assetOnActiveRent[_assetContract][_assetId]);

        IERC721 assetContract = IERC721(_assetContract);
        assetContract.safeTransferFrom(address(this), msg.sender, _assetId);
        assetDeposited[_assetContract][_assetId] = false;
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
        require(assetDeposited[_assetContract][_assetId]);
        require(!assetOnActiveRent[_assetContract][_assetId]);
        //IERC721 assetContract = IERC721(_assetContract);
        rent storage newRent = rents[rentIdCounter.current()];
        newRent.assetContract = _assetContract;
        newRent.assetId = _assetId;
        newRent.assetOwner = msg.sender;
        newRent.minDays = _minDays;
        newRent.maxDays = _maxDays;
        newRent.pricePerDay = _pricePerDay;
        newRent.active = true;
        rentIdCounter.increment();
        assetOnActiveRent[_assetContract][_assetId] = true;
    }

    /**
     * @dev Ends a rental. Requires the asset to be deposited in the contract.
     * @param rentId The Id of the rent to be ended.
     **/
    function endRent(uint256 rentId) public {
        rent storage activeRent = rents[rentId];
        require(activeRent.assetOwner == msg.sender);
        require(assetDeposited[activeRent.assetContract][activeRent.assetId]);
        require(
            assetOnActiveRent[activeRent.assetContract][activeRent.assetId]
        );
        assetOnActiveRent[activeRent.assetContract][activeRent.assetId] = true;
        activeRent.active = false;
    }

    /**
     * @dev Rents an asset. Requires the asset to be deposited in the contract.
     * @param rentId The Id of the rent to be ended.
     **/
    function rentAsset(uint256 rentId, uint256 rentDays) public {
        rent storage activeRent = rents[rentId];
        require(activeRent.active);
        require(
            rentDays >= activeRent.minDays && rentDays <= activeRent.maxDays
        );
        activeRent.rentedBy = msg.sender;
        activeRent.rentExpireBlockTimeStamp = block.timestamp + rentDays;

        IRERC721 rentedERC721Contract = IRERC721(RENTED_ERC721_CONTRACT);
        try rentedERC721Contract.ownerOf(activeRent.assetId) returns (
            address assetOwner
        ) {
            rentedERC721Contract.safeTransferFrom(
                assetOwner,
                msg.sender,
                activeRent.assetId
            );
        } catch Error(string memory reason) {
            require(
                keccak256(abi.encodePacked(reason)) ==
                    keccak256(
                        abi.encodePacked(
                            "Returned error: execution reverted: ERC721: invalid token ID"
                        )
                    ),
                reason
            );
            rentedERC721Contract.safeMint(
                msg.sender,
                defaultTokenURI,
                activeRent.assetId
            );
        }
    }
}
