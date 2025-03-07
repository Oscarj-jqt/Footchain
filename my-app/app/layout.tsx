import { Provider } from "@/public/components/Provider";
import { WagmiProvider } from "wagmi";  
import { config } from "@/public/config";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Le Provider doit envelopper ici */}
        <WagmiProvider config={config}>
          <Provider>{children}</Provider>
        </WagmiProvider>
      </body>
    </html>
  );
}
