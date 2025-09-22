"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { useAuth } from "@/contexts/auth-context"
import {
  Home,
  Users,
  Calendar,
  Briefcase,
  Trophy,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Star,
  Award,
  UserPlus,
  UserCheck,
  BookOpen
} from "lucide-react"

const membersNavigation = [
  {
    name: "Dashboard",
    href: "/membros",
    icon: Home,
    color: "#8b5cf6"
  },
  {
    name: "Minha Rede",
    href: "/membros/rede",
    icon: Users,
    color: "#8b5cf6"
  },
  {
    name: "Eventos",
    href: "/membros/eventos",
    icon: Calendar,
    color: "#8b5cf6"
  },
  {
    name: "Cadastrar Convidados",
    href: "/membros/cadastrar-convidados",
    icon: UserPlus,
    color: "#8b5cf6"
  },
  {
    name: "Indicações",
    href: "/membros/indicacoes",
    icon: UserCheck,
    color: "#8b5cf6"
  },
  {
    name: "Negócios",
    href: "/membros/negocios",
    icon: Briefcase,
    color: "#8b5cf6"
  },
  {
    name: "Pontuação",
    icon: Trophy,
    color: "#8b5cf6",
    hasSubmenu: true,
    submenu: [
      { name: "Meus Pontos", href: "/membros/pontuacao/meus" },
      { name: "Ranking", href: "/membros/pontuacao/ranking" },
      { name: "Histórico", href: "/membros/pontuacao/historico" },
      { name: "Regras de Pontuação", href: "/membros/pontuacao/regras" }
    ]
  },
  {
    name: "Meu Perfil",
    icon: User,
    color: "#8b5cf6",
    hasSubmenu: true,
    submenu: [
      { name: "Dados Pessoais", href: "/membros/perfil/dados" },
      { name: "Configurações", href: "/membros/perfil/config" }
    ]
  }
]

export function ProMembersSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const { colors, theme } = useThemedStyles()
  const { user, logout } = useAuth()

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some(item => pathname === item.href)
  }

  const hasActiveSubmenu = (item: any) => {
    return item.hasSubmenu && isSubmenuActive(item.submenu || [])
  }

  const getActiveMainMenu = () => {
    for (const item of membersNavigation) {
      if (item.href && pathname === item.href) {
        return item.name
      }
      if (item.hasSubmenu && isSubmenuActive(item.submenu || [])) {
        return item.name
      }
    }
    return null
  }

  useEffect(() => {
    const activeMainMenu = getActiveMainMenu()
    if (activeMainMenu && !openMenus.includes(activeMainMenu)) {
      setOpenMenus(prev => [...prev, activeMainMenu])
    }
  }, [pathname])

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    )
  }

  const isMenuOpen = (menuName: string) => openMenus.includes(menuName)

  const getSelectedSubmenuStyle = (isSelected: boolean) => {
    if (!isSelected) {
      return {
        backgroundColor: 'transparent',
        textColor: colors.text.secondary,
      }
    }
    if (theme === 'dark') {
      return {
        backgroundColor: '#8b5cf640',
        textColor: '#e9d5ff',
      }
    } else {
      return {
        backgroundColor: '#faf5ff',
        textColor: '#7c3aed',
      }
    }
  }

  return (
    <div style={{
      width: '260px',
      backgroundColor: colors.bg.sidebar,
      borderRight: `1px solid ${colors.border.primary}`,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      transition: 'all 0.3s ease'
    }}>
      {/* Logo Área Membros */}
      <div style={{
        padding: '20px 24px',
        borderBottom: `1px solid ${colors.border.primary}`,
        minHeight: '72px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.bg.sidebar,
        flexShrink: 0,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: colors.brand.gradient,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
          }}>
            <Star style={{ color: 'white', width: '20px', height: '20px' }} />
          </div>
          <div>
            <h2 style={{
              fontSize: '17px',
              fontWeight: 'bold',
              color: colors.text.primary,
              margin: 0,
              marginBottom: '2px',
              transition: 'color 0.3s ease'
            }}>
              Empresariossa
            </h2>
            <p style={{
              fontSize: '12px',
              color: colors.text.secondary,
              margin: 0,
              transition: 'color 0.3s ease'
            }}>
              Área do Membro
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: colors.bg.sidebar,
        scrollbarWidth: 'thin',
        scrollbarColor: `${colors.border.primary} transparent`
      }}>
        {membersNavigation.map((item) => {
          const isActive = item.href ? pathname === item.href : false
          const hasActiveSubmenuState = hasActiveSubmenu(item)
          const menuOpen = isMenuOpen(item.name)
          const isMainMenuActive = isActive || hasActiveSubmenuState || menuOpen

          return (
            <div key={item.name}>
              {item.href ? (
                <Link
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 16px',
                    fontSize: '15px',
                    fontWeight: '500',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: isMainMenuActive ? 'white' : colors.text.secondary,
                    background: isMainMenuActive ?
                      colors.brand.gradient :
                      colors.bg.tertiary,
                    border: 'none',
                    boxShadow: isMainMenuActive ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none',
                    transition: 'all 0.3s ease',
                    marginBottom: '4px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMainMenuActive) {
                      e.currentTarget.style.backgroundColor = colors.bg.hover
                      e.currentTarget.style.color = colors.text.primary
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMainMenuActive) {
                      e.currentTarget.style.backgroundColor = colors.bg.tertiary
                      e.currentTarget.style.color = colors.text.secondary
                    }
                  }}
                >
                  <item.icon style={{
                    marginRight: '12px',
                    width: '20px',
                    height: '20px',
                    color: isMainMenuActive ? 'white' : colors.text.tertiary
                  }} />
                  {item.name}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      fontSize: '15px',
                      fontWeight: '500',
                      borderRadius: '12px',
                      border: 'none',
                      background: isMainMenuActive ?
                        colors.brand.gradient :
                        colors.bg.tertiary,
                      color: isMainMenuActive ? 'white' : colors.text.secondary,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginBottom: '4px',
                      boxShadow: isMainMenuActive ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isMainMenuActive) {
                        e.currentTarget.style.backgroundColor = colors.bg.hover
                        e.currentTarget.style.color = colors.text.primary
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMainMenuActive) {
                        e.currentTarget.style.backgroundColor = colors.bg.tertiary
                        e.currentTarget.style.color = colors.text.secondary
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <item.icon style={{
                        marginRight: '12px',
                        width: '20px',
                        height: '20px',
                        color: isMainMenuActive ? 'white' : colors.text.tertiary
                      }} />
                      {item.name}
                    </div>
                    {menuOpen ? (
                      <ChevronDown style={{
                        width: '18px',
                        height: '18px',
                        color: isMainMenuActive ? 'white' : colors.text.tertiary
                      }} />
                    ) : (
                      <ChevronRight style={{
                        width: '18px',
                        height: '18px',
                        color: isMainMenuActive ? 'white' : colors.text.tertiary
                      }} />
                    )}
                  </button>
                  {menuOpen && (
                    <div style={{
                      marginLeft: '16px',
                      marginTop: '8px',
                      marginBottom: '8px',
                      backgroundColor: colors.bg.primary,
                      borderRadius: '10px',
                      padding: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: `1px solid ${colors.border.primary}`,
                      transition: 'all 0.3s ease'
                    }}>
                      {item.submenu?.map((subItem) => {
                        const isSubActive = pathname === subItem.href
                        const submenuStyle = getSelectedSubmenuStyle(isSubActive)
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            style={{
                              display: 'block',
                              padding: '10px 14px',
                              fontSize: '14px',
                              fontWeight: '400',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              color: submenuStyle.textColor,
                              backgroundColor: submenuStyle.backgroundColor,
                              marginBottom: '2px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.backgroundColor = colors.bg.tertiary
                                e.currentTarget.style.color = colors.text.primary
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.backgroundColor = 'transparent'
                                e.currentTarget.style.color = colors.text.secondary
                              }
                            }}
                          >
                            {subItem.name}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
        
        {/* Spazio aggiuntivo per evitare che l'ultimo elemento tocchi il fondo */}
        <div style={{ height: '32px' }}></div>
      </nav>
    </div>
  )
}
