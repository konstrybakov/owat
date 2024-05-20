import type { Metadata } from "next"
import "./globals.css"
import { FontSans, FontSerif } from "./fonts"

export const metadata: Metadata = {
  title: "OWAT!",
  description: "Oh! What a tracker!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${FontSerif.variable} ${FontSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
