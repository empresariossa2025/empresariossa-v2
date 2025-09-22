"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { useResponsive } from "@/hooks/responsive/use-responsive"
import {
  Home, Users, Calendar, Briefcase, Trophy, User, 
  ChevronDown, ChevronRight, Star, Award, UserPlus, 
  UserCheck, BookOpen, X
} from "lucide-react"

interface ResponsiveSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const membersNavigation = [
  { name: "Dashboard", href: "/membros", icon: Home, color: "#8b5cf6" },
  { name: "Minha Rede", href: "/membros/rede", icon: Users, color: "#10b981" },
  { name: "Eventos", href: "/membros/eventos", icon: Calendar, color: "#f59e0b" },
  { name: "Cadastrar Convidados", href: "/membros/cadastrar-convidados", icon: UserPlus, color: "#06b6d4" },
  { name: "Indicações", href: "/membros/indicacoes", icon: Award, color: "#8b5cf6" },
  { name: "Negócios", href: "/membros/negocios", icon: Briefcase, color: "#ef4444" },
  {
    name: "Pontuação",
    icon: Trophy,
    color: "#f59e0b",
    hasSubmenu: true,
    submenu: [
      { name: "Meus Pontos", href: "/membros/pontuacao/meus", icon: Star },
      { name: "Ranking", href: "/membros/pontuacao/ranking", icon: Trophy },
      { name: "Histórico", href: "/membros/pontuacao/historico", icon: BookOpen },
      { name: "Regras de Pontuação", href: "/membros/pontuacao/regras", icon: Award }
    ]
  },
  {
    name: "Meu Perfil",
    icon: User,
    color: "#8b5cf6",
    hasSubmenu: true,
    submenu: [
      { name: "Dados Pessoais", href: "/membros/perfil/dados", icon: User },
      { name: "Configurações", href: "/membros/perfil/config", icon: UserCheck }
    ]
  }
]

export function ResponsiveSidebar({ isOpen, onClose }: ResponsiveSidebarProps) {
  const pathname = usePathname()
  const { colors } = useThemedStyles()
  const { isMobile, isTablet } = useResponsive()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    )
  }

  const isActive = (href: string) => pathname === href
  const isSubmenuActive = (submenu: any[]) => 
    submenu.some(item => pathname === item.href)

  // Auto-expand active submenus
  useEffect(() => {
    membersNavigation.forEach(item => {
      if (item.hasSubmenu && isSubmenuActive(item.submenu!)) {
        setExpandedMenus(prev => 
          prev.includes(item.name) ? prev : [...prev, item.name]
        )
      }
    })
  }, [pathname])

  const sidebarStyle = {
    width: isMobile ? '280px' : isTablet ? '240px' : '280px',
    height: '100vh',
    backgroundColor: colors.bg.primary,
    borderRight: `1px solid ${colors.border.primary}`,
    display: 'flex',
    flexDirection: 'column' as const,
    position: isMobile ? 'fixed' as const : 'static' as const,
    top: 0,
    left: 0,
    zIndex: isMobile ? 1000 : 'auto',
    transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
    transition: 'transform 0.3s ease'
  }

  const overlayStyle = isMobile && isOpen ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    cursor: 'pointer'
  } : undefined

  return (
    <>
      {/* Mobile Overlay */}
      {overlayStyle && (
        <div style={overlayStyle} onClick={onClose} />
      )}

      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Header */}
        <div style={{
          padding: isMobile ? '16px' : '24px 20px',
          borderBottom: `1px solid ${colors.border.primary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Star style={{ width: '18px', height: '18px', color: 'white' }} />
            </div>
            <div>
              <h2 style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                color: colors.text.primary,
                margin: 0
              }}>
                Empresariossa
              </h2>
              <p style={{
                fontSize: isMobile ? '11px' : '12px',
                color: colors.text.tertiary,
                margin: 0
              }}>
                Área do Membro
              </p>
            </div>
          </div>

          {/* Close button (mobile only) */}
          {isMobile && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                color: colors.text.tertiary
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: isMobile ? '16px' : '20px',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {membersNavigation.map((item) => (
              <div key={item.name}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      style={{
                        width: '100%',
                        background: isSubmenuActive(item.submenu!) 
                          ? colors.bg.tertiary 
                          : 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left' as const,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmenuActive(item.submenu!)) {
                          e.currentTarget.style.backgroundColor = colors.bg.secondary
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmenuActive(item.submenu!)) {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }
                      }}
                    >
                      <item.icon 
                        style={{ 
                          width: '18px', 
                          height: '18px', 
                          color: isSubmenuActive(item.submenu!) ? item.color : colors.text.tertiary 
                        }} 
                      />
                      <span style={{
                        fontSize: '14px',
                        fontWeight: isSubmenuActive(item.submenu!) ? '600' : '400',
                        color: isSubmenuActive(item.submenu!) ? colors.text.primary : colors.text.secondary,
                        flex: 1
                      }}>
                        {item.name}
                      </span>
                      {expandedMenus.includes(item.name) ? (
                        <ChevronDown style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                      ) : (
                        <ChevronRight style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                      )}
                    </button>

                    {expandedMenus.includes(item.name) && (
                      <div style={{ marginLeft: '12px', marginTop: '4px' }}>
                        {item.submenu!.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={isMobile ? onClose : undefined}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '10px 12px',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              backgroundColor: isActive(subItem.href) ? colors.bg.tertiary : 'transparent',
                              transition: 'all 0.2s ease',
                              marginBottom: '2px'
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive(subItem.href)) {
                                e.currentTarget.style.backgroundColor = colors.bg.secondary
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive(subItem.href)) {
                                e.currentTarget.style.backgroundColor = 'transparent'
                              }
                            }}
                          >
                            <subItem.icon 
                              style={{ 
                                width: '16px', 
                                height: '16px', 
                                color: isActive(subItem.href) ? item.color : colors.text.tertiary 
                              }} 
                            />
                            <span style={{
                              fontSize: '13px',
                              fontWeight: isActive(subItem.href) ? '600' : '400',
                              color: isActive(subItem.href) ? colors.text.primary : colors.text.secondary
                            }}>
                              {subItem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={isMobile ? onClose : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      backgroundColor: isActive(item.href) ? colors.bg.tertiary : 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.href)) {
                        e.currentTarget.style.backgroundColor = colors.bg.secondary
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.href)) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <item.icon 
                      style={{ 
                        width: '18px', 
                        height: '18px', 
                        color: isActive(item.href) ? item.color : colors.text.tertiary 
                      }} 
                    />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: isActive(item.href) ? '600' : '400',
                      color: isActive(item.href) ? colors.text.primary : colors.text.secondary
                    }}>
                      {item.name}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}
