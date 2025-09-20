"use client"
import { SimpleEnhancedHeader } from "./simple-enhanced-header"
import { Sidebar } from "./sidebar"
import { useThemedStyles } from "@/hooks/use-themed-styles"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { colors } = useThemedStyles()
  
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: colors.bg.secondary,
      transition: 'background-color 0.3s ease'
    }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SimpleEnhancedHeader area="admin" />
        <main style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          backgroundColor: colors.bg.secondary,
          transition: 'background-color 0.3s ease'
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}
