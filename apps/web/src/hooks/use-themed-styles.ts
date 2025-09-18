import { useTheme } from '@/contexts/theme-context'
import { themes, ThemeColors } from '@/themes/colors'

export function useThemedStyles() {
  const { theme } = useTheme()
  const colors = themes[theme]
  
  return {
    colors,
    theme,
    // Helper functions for common style patterns
    getCardStyle: (elevated = false) => ({
      backgroundColor: colors.bg.primary,
      border: `1px solid ${colors.border.primary}`,
      borderRadius: '12px',
      padding: '16px', // ✅ AGGIUNTO: Padding uniforme con le cards colorate
      boxShadow: elevated ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease'
    }),
    getButtonStyle: (variant: 'primary' | 'secondary' | 'ghost' = 'secondary') => {
      switch (variant) {
        case 'primary':
          return {
            background: colors.brand.gradient,
            color: colors.text.inverse,
            border: 'none',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
          }
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: colors.text.secondary,
            border: 'none'
          }
        default:
          return {
            backgroundColor: colors.bg.tertiary,
            color: colors.text.primary,
            border: `1px solid ${colors.border.primary}`
          }
      }
    }
  }
}
