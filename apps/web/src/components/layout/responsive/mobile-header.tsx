"use client"
import { useState } from "react"
import { Menu, X, Sun, Moon, User, ChevronDown } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import { useThemedStyles } from "@/hooks/use-themed-styles"

interface MobileHeaderProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
  title?: string
}

export function MobileHeader({ onMenuToggle, isMenuOpen, title }: MobileHeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const { colors } = useThemedStyles()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const ProfileAvatar = () => (
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600'
    }}>
      MC
    </div>
  )

  return (
    <header style={{
      backgroundColor: colors.bg.primary,
      borderBottom: `1px solid ${colors.border.primary}`,
      padding: '12px 16px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Left: Hamburger + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onMenuToggle}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            color: colors.text.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        {title && (
          <h1 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: colors.text.primary,
            margin: 0
          }}>
            {title}
          </h1>
        )}
      </div>

      {/* Right: Theme Toggle + User Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            color: colors.text.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ProfileAvatar />
            <ChevronDown size={12} color={colors.text.tertiary} />
          </button>

          {showUserMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: colors.bg.primary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: '160px',
              zIndex: 1001
            }}>
              <div style={{
                padding: '12px',
                borderBottom: `1px solid ${colors.border.primary}`
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: '600',
                  color: colors.text.primary
                }}>
                  Marco Carvalho
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '12px',
                  color: colors.text.tertiary
                }}>
                  Membro Ativo
                </p>
              </div>
              
              <button
                onClick={() => {
                  setShowUserMenu(false)
                  logout()
                }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: colors.text.primary,
                  fontSize: '14px'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
