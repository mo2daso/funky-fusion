import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Funky Fusion - Trendy & Affordable Accessories",
  description:
    "Discover trendy and affordable accessories for girls who love to stand out. From elegant rhinestone pieces to playful enamel charms.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${poppins.variable} font-poppins`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
