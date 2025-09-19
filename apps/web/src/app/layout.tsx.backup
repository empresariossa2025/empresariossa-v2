import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"

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
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
