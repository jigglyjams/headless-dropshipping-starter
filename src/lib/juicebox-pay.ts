export const ETH_TOKEN_ADDRESS = "0x000000000000000000000000000000000000eeee";
export const DEFAULT_MIN_RETURNED_TOKENS = 0;
export const DEFAULT_PREFER_CLAIMED_TOKENS = false;
export const DEFAULT_DELEGATE_METADATA = "0x";

export const paymentTerminal = {
  mainnet: "",
  goerli: "0xd89Ed8008961F68Aab849f49e122f9a1266240Db",
}

export const abi = {
  inputs: [
    {
      internalType: "uint256",
      name: "_projectId",
      type: "uint256"
    },
    {
      internalType: "uint256",
      name: "_amount",
      type: "uint256"
    },
    {
      internalType: "address",
      name: "_token",
      type: "address"
    },
    {
      internalType: "address",
      name: "_beneficiary",
      type: "address"
    },
    {
      internalType: "uint256",
      name: "_minReturnedTokens",
      type: "uint256"
    },
    {
      internalType: "bool",
      name: "_preferClaimedTokens",
      type: "bool"
    },
    {
      internalType: "string",
      name: "_memo",
      type: "string"
    },
    {
      internalType: "bytes",
      name: "_metadata",
      type: "bytes"
    }
  ],
  name: "pay",
  outputs: [
    {
      internalType: "uint256",
      name: "",
      type: "uint256"
    }
  ],
  stateMutability: "payable",
  type: "function"
};