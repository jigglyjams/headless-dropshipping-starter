import { usePrepareContractWrite } from "wagmi";
import { parseEther } from 'viem';
import {
  abi,
  paymentTerminal,
  ETH_TOKEN_ADDRESS,
  DEFAULT_MIN_RETURNED_TOKENS,
  DEFAULT_PREFER_CLAIMED_TOKENS,
  DEFAULT_DELEGATE_METADATA
} from "../lib/juicebox-pay";

type PayJuiceboxProjectInputs = {
  projectId: number;
  value: number;
  callerAddress: string;
  memo: string;
};

export function usePayJuiceboxProject(inputs: PayJuiceboxProjectInputs) {
  const valueInWei = parseEther(inputs.value.toString());
  const { config } = usePrepareContractWrite({
    address: paymentTerminal.goerli,
    abi: [ abi ],
    functionName: "pay",
    args: [
      inputs.projectId,               // projectId
      valueInWei,                     // value
      ETH_TOKEN_ADDRESS,              // token
      inputs.callerAddress,           // beneficiary
      DEFAULT_MIN_RETURNED_TOKENS,    // minReturnedTokens
      DEFAULT_PREFER_CLAIMED_TOKENS,  // preferClaimedTokens
      inputs.memo || "",              // memo
      DEFAULT_DELEGATE_METADATA,      // delegateMetadata
    ],
    value: valueInWei,
  });
  return config;
}