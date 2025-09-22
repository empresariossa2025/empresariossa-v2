"use client"
import { useState } from "react"
import { useResponsive } from "@/hooks/responsive/use-responsive"
import { MobileHeader } from "./mobile-header"
import { ResponsiveSidebar } from "./responsive-sidebar"
import { SimpleEnhancedHeader } from "../simple-enhanced-header"

interface ResponsiveLayoutProps {
  children: React.ReactNode
  title?: string
}

export function ResponsiveLayout({ children, title = "Dashboard" }: ResponsiveLayoutProps) {
  const { isMobile, isTablet } = useResponsive()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar - sempre visibile su desktop/tablet, overlay su mobile */}
      {(isMobile ? isSidebarOpen : true) && (
        <ResponsiveSidebar 
          isOpen={isSidebarOpen} 
          onClose={closeSidebar} 
        />
      )}

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 0 // Prevents flex item from overflowing
      }}>
        {/* Header */}
        {isMobile ? (
          <MobileHeader 
            onMenuToggle={toggleSidebar}
            isMenuOpen={isSidebarOpen}
            title={title}
          />
        ) : (
          <SimpleEnhancedHeader 
            title={title} 
            area="member" 
          />
        )}

        {/* Page Content */}
        <main style={{ 
          flex: 1, 
          padding: isMobile ? '16px' : '24px 32px',
          overflowY: 'auto' 
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}
