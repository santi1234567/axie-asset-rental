// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IRERC721 is IERC721 {
    function safeMint(
        address to,
        string memory uri,
        uint256 tokenId
    ) external;
}
