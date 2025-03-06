// app/layout.tsx

import { Provider } from "@/public/components/provider"; // ton composant Provider
import { WagmiProvider } from "wagmi";  // Assure-toi que WagmiProvider est bien importé
import { config } from "@/config"; // Assure-toi que config est bien importé

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
