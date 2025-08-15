import type React from "react"
import "./globals.css"
// Added PricingProvider import for dynamic pricing
import { PricingProvider } from "@/lib/pricing-context"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrapped children with PricingProvider for dynamic pricing */}
        <PricingProvider>{children}</PricingProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
