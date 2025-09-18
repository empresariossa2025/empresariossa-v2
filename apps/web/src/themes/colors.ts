export const themes = {
  light: {
    // Backgrounds
    bg: {
      primary: '#ffffff',
      secondary: '#f8fafc', 
      tertiary: '#f1f5f9',
      sidebar: '#fafbfc',
      hover: '#e2e8f0'
    },
    // Text colors
    text: {
      primary: '#0f172a',
      secondary: '#64748b', 
      tertiary: '#94a3b8',
      inverse: '#ffffff'
    },
    // Borders
    border: {
      primary: '#e2e8f0',
      secondary: '#f1f5f9'
    },
    // Brand colors (same for both themes)
    brand: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    // Status colors
    status: {
      success: '#10b981',
      warning: '#f59e0b', 
      error: '#ef4444',
      info: '#3b82f6',
      cyan: '#06b6d4'
    }
  },
  dark: {
    // Backgrounds  
    bg: {
      primary: '#1e293b',
      secondary: '#0f172a',
      tertiary: '#334155', 
      sidebar: '#1e293b',
      hover: '#475569'
    },
    // Text colors
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8', 
      inverse: '#0f172a'
    },
    // Borders
    border: {
      primary: '#334155',
      secondary: '#475569'
    },
    // Brand colors (same)
    brand: {
      primary: '#8b5cf6',
      secondary: '#7c3aed', 
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    // Status colors (slightly adjusted for dark)
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444', 
      info: '#3b82f6',
      cyan: '#06b6d4'
    }
  }
} as const

export type Theme = keyof typeof themes
export type ThemeColors = typeof themes.light
