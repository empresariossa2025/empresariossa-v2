"use client"
import { useState } from "react"
import { Sun, Moon, LogOut, User, ChevronDown } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import { useThemedStyles } from "@/hooks/use-themed-styles"

interface SimpleHeaderProps {
  title?: string
  area?: 'admin' | 'member'
}

export function SimpleEnhancedHeader({ title = "Dashboard", area = "admin" }: SimpleHeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const { colors } = useThemedStyles()
  const [showDropdown, setShowDropdown] = useState(false)

  const ProfileImage = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" style={{ borderRadius: '50%' }}>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="18" fill="url(#grad)" />
      <text x="18" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">
        MC
      </text>
    </svg>
  )

  return (
    <header style={{
      backgroundColor: colors.bg.primary,
      borderBottom: `1px solid ${colors.border.primary}`,
      padding: '16px 32px',
      width: '100%',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: area === 'member' ? 'flex-end' : 'space-between',
      transition: 'all 0.3s ease',
      position: 'relative'
    }}>
      {area === 'admin' && (
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: colors.text.primary,
          margin: 0
        }}>
          {title}
        </h1>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: colors.bg.tertiary,
            border: `1px solid ${colors.border.primary}`,
            color: colors.text.secondary,
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '40px',
            height: '40px'
          }}
        >
          {theme === 'light' ? (
            <Moon style={{ width: '18px', height: '18px' }} />
          ) : (
            <Sun style={{ width: '18px', height: '18px' }} />
          )}
        </button>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              background: colors.bg.tertiary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            <ProfileImage />
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: colors.text.primary
              }}>
                Marco Carvalho
              </div>
              <div style={{
                fontSize: '12px',
                color: colors.text.tertiary
              }}>
                {area === 'member' ? 'Membro Ativo' : 'Administrador'}
              </div>
            </div>
            <ChevronDown style={{ 
              width: '16px', 
              height: '16px', 
              color: colors.text.tertiary,
              transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} />
          </button>

          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: colors.bg.primary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              padding: '8px',
              minWidth: '200px',
              zIndex: 1000
            }}>
              <div
                onClick={() => setShowDropdown(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  color: '#8b5cf6',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#faf5ff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <User style={{ width: '16px', height: '16px', color: '#8b5cf6' }} />
                Gestione Profilo
              </div>

              <div style={{
                height: '1px',
                background: colors.border.primary,
                margin: '8px 0'
              }} />

              <button
                onClick={() => {
                  setShowDropdown(false)
                  logout()
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'none',
                  border: 'none',
                  color: '#8b5cf6',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  width: '100%',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#faf5ff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <LogOut style={{ width: '16px', height: '16px', color: '#8b5cf6' }} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {showDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  )
}
