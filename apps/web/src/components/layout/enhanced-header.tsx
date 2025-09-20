"use client"
import { useState } from "react"
import { Bell, Sun, Moon, LogOut, User, Settings, ChevronDown } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import { useThemedStyles } from "@/hooks/use-themed-styles"

interface EnhancedHeaderProps {
  title?: string
  area?: 'admin' | 'member'
}

export function EnhancedHeader({ title = "Dashboard", area = "admin" }: EnhancedHeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { colors } = useThemedStyles()
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const getUserRole = () => {
    if (area === 'member') return 'Membro Ativo'
    return user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 
           user?.role === 'ADMIN' ? 'Administrador' : 'Usuário'
  }

  const getAvatarGradient = () => {
    return area === 'member' 
      ? 'linear-gradient(135deg, #10b981, #059669)'
      : colors.brand.gradient
  }

  return (
    <header style={{
      backgroundColor: colors.bg.primary,
      borderBottom: `1px solid ${colors.border.primary}`,
      padding: '16px 32px',
      width: '100%',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      position: 'relative'
    }}>
      {/* Page Title */}
      <div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: colors.text.primary,
          margin: 0
        }}>
          {title}
        </h1>
      </div>

      {/* Right side controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Search bar (only for admin) */}
        {area === 'admin' && (
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar..."
              style={{
                padding: '8px 12px',
                border: `1px solid ${colors.border.primary}`,
                borderRadius: '8px',
                background: colors.bg.secondary,
                color: colors.text.primary,
                fontSize: '14px',
                width: '200px',
                outline: 'none'
              }}
            />
          </div>
        )}

        {/* Notifications */}
        <button
          style={{
            position: 'relative',
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
          title="Notificações"
        >
          <Bell style={{ width: '18px', height: '18px' }} />
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            background: '#ef4444',
            borderRadius: '50%'
          }} />
        </button>

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

        {/* User Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              background: colors.bg.tertiary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.bg.hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.bg.tertiary
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: getAvatarGradient(),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: colors.text.primary
              }}>
                {user?.firstName} {user?.lastName}
              </div>
              <div style={{
                fontSize: '12px',
                color: colors.text.tertiary
              }}>
                {getUserRole()}
              </div>
            </div>
            <ChevronDown style={{ 
              width: '16px', 
              height: '16px', 
              color: colors.text.tertiary,
              transform: showUserDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} />
          </button>

          {/* Dropdown Menu */}
          {showUserDropdown && (
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
              
                href={area === 'member' ? '/membros/perfil/dados' : '/admin/perfil'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: colors.text.primary,
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.bg.tertiary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <User style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                Meu Perfil
              </a>
              
              
                href={area === 'member' ? '/membros/perfil/config' : '/admin/configuracoes'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: colors.text.primary,
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.bg.tertiary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <Settings style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                Configurações
              </a>

              <div style={{
                height: '1px',
                background: colors.border.primary,
                margin: '8px 0'
              }} />

              <button
                onClick={() => {
                  setShowUserDropdown(false)
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
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '14px',
                  width: '100%',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fee2e2'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <LogOut style={{ width: '16px', height: '16px' }} />
                Sair da Conta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showUserDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowUserDropdown(false)}
        />
      )}
    </header>
  )
}
