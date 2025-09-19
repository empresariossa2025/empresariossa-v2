"use client"
import { Bell, RotateCcw, ChevronDown, Sun, Moon, LogOut } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import { useThemedStyles } from "@/hooks/use-themed-styles"

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { colors } = useThemedStyles()

  return (
    <header style={{
      backgroundColor: colors.bg.primary,
      borderBottom: `1px solid ${colors.border.primary}`,
      padding: '16px 24px',
      width: '100%',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          background: colors.brand.gradient,
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          Empresariossa
        </div>
      </div>

      {/* Right side controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: colors.bg.tertiary,
            border: `1px solid ${colors.border.primary}`,
            color: colors.text.secondary,
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '40px',
            height: '40px'
          }}
          title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
        >
          {theme === 'light' ? (
            <Moon style={{ width: '18px', height: '18px' }} />
          ) : (
            <Sun style={{ width: '18px', height: '18px' }} />
          )}
        </button>

        {/* User info & logout */}
        {user && (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: colors.text.primary,
              fontSize: '14px'
            }}>
              <div style={{
                backgroundColor: colors.brand.primary,
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <span>{user.firstName} {user.lastName}</span>
              <span style={{ 
                fontSize: '12px', 
                color: colors.text.secondary,
                textTransform: 'uppercase'
              }}>
                ({user.role})
              </span>
            </div>
            
            <button
              onClick={logout}
              style={{
                backgroundColor: colors.bg.tertiary,
                border: `1px solid ${colors.border.primary}`,
                color: colors.text.secondary,
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '40px',
                height: '40px'
              }}
              title="Logout"
            >
              <LogOut style={{ width: '18px', height: '18px' }} />
            </button>
          </>
        )}
      </div>
    </header>
  )
}
