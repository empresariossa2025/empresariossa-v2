import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Empresariossa v2.0",
  description: "Sistema de gestão empresarial moderno",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
