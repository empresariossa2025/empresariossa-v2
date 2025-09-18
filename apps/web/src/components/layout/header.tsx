"use client"
import { Bell, RotateCcw, ChevronDown, Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useThemedStyles } from "@/hooks/use-themed-styles"

export function Header() {
  const { theme, toggleTheme } = useTheme()
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
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ marginLeft: '8px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: colors.text.primary,
            margin: 0,
            marginBottom: '2px',
            transition: 'color 0.3s ease'
          }}>
            Dashboard Admin
          </h1>
          <p style={{
            fontSize: '14px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Bem-vindo de volta! Aqui está o resumo do seu negócio.
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor: colors.bg.tertiary,
              border: `1px solid ${colors.border.primary}`,
              color: colors.text.secondary,
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              width: '40px',
              height: '40px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.bg.hover
              e.currentTarget.style.color = colors.text.primary
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.bg.tertiary
              e.currentTarget.style.color = colors.text.secondary
            }}
            title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
          >
            {theme === 'light' ? (
              <Moon style={{ width: '18px', height: '18px' }} />
            ) : (
              <Sun style={{ width: '18px', height: '18px' }} />
            )}
          </button>

          {/* Backup Button */}
          <button style={{
            backgroundColor: '#faf5ff',
            border: '1px solid #e9d5ff',
            color: '#7c3aed',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}>
            <RotateCcw style={{ width: '16px', height: '16px' }} />
            Backup Dados
          </button>

          {/* Notifications */}
          <button style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            padding: '8px',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.bg.tertiary
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}>
            <Bell style={{ width: '20px', height: '20px', color: colors.text.secondary }} />
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              backgroundColor: '#ef4444',
              borderRadius: '50%'
            }} />
          </button>

          {/* User Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#dcfce7',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px' }}>AS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: colors.text.primary,
                transition: 'color 0.3s ease'
              }}>
                Admin Sistema
              </span>
              <ChevronDown style={{ 
                width: '16px', 
                height: '16px', 
                color: colors.text.secondary,
                transition: 'color 0.3s ease'
              }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
