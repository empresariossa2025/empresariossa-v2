"use client"
import { useState, useEffect } from 'react'

interface BreakpointConfig {
  mobile: number
  tablet: number 
  desktop: number
}

interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number
  breakpoint: 'mobile' | 'tablet' | 'desktop'
}

const defaultBreakpoints: BreakpointConfig = {
  mobile: 768,
  tablet: 1024,
  desktop: 1025
}

export function useResponsive(customBreakpoints?: Partial<BreakpointConfig>): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 1200,
    breakpoint: 'desktop'
  })

  useEffect(() => {
    const breakpoints = { ...defaultBreakpoints, ...customBreakpoints }
    
    const updateSize = () => {
      const width = window.innerWidth
      const isMobile = width < breakpoints.mobile
      const isTablet = width >= breakpoints.mobile && width < breakpoints.desktop
      const isDesktop = width >= breakpoints.desktop

      setState({
        isMobile,
        isTablet,
        isDesktop,
        width,
        breakpoint: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, []) // Dependency array vuoto - fix del loop

  return state
}
