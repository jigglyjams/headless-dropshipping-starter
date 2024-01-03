import { WagmiConfig, createConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import WalletCheckout from "../components/WalletCheckout";

const config = createConfig(
  getDefaultConfig({
    infuraId: process.env.NEXT_PUBLIC_INFURA_KEY,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: "Snipcart Wallet",
    chains: [goerli],
  }),
);

export default function Wallet () {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <WalletCheckout />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
