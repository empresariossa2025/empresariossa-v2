"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Building2, 
  Calendar1,
  Settings,
  Home,
  DollarSign,
  ChevronDown,
  ChevronRight,
  MapPin,
  Megaphone
} from "lucide-react"

const navigation = [
  { 
    name: "Dashboard", 
    href: "/", 
    icon: Home, 
    color: "#8b5cf6" 
  },
  { 
    name: "Calendário", 
    href: "/calendar", 
    icon: Calendar, 
    color: "#3b82f6" 
  },
  { 
    name: "Unidades", 
    href: "/unidades", 
    icon: MapPin, 
    color: "#10b981" 
  },
  { 
    name: "Marketing", 
    icon: Megaphone, 
    color: "#f59e0b",
    hasSubmenu: true,
    submenu: [
      { name: "Anúncios Plataforma", href: "/marketing/anuncios" },
      { name: "Patrocinadores", href: "/marketing/patrocinadores" },
      { name: "Aulas", href: "/marketing/aulas" },
      { name: "Artigos", href: "/marketing/artigos" }
    ]
  },
  { 
    name: "Membros", 
    icon: Users, 
    color: "#06b6d4",
    hasSubmenu: true,
    submenu: [
      { name: "Consulta/Cadastro", href: "/membros/consulta" },
      { name: "Aprovação/Entrevista", href: "/membros/aprovacao" },
      { name: "Convidados", href: "/membros/convidados" },
      { name: "Pagamentos", href: "/membros/pagamentos" },
      { name: "Controle Pontuação", href: "/membros/pontuacao" },
      { name: "Regras de Pontuação", href: "/membros/regras" },
      { name: "Leads", href: "/membros/leads" }
    ]
  },
  { 
    name: "Eventos", 
    href: "/events", 
    icon: Calendar1, 
    color: "#ef4444" 
  },
  { 
    name: "Financeiro", 
    href: "/financeiro", 
    icon: DollarSign, 
    color: "#10b981" 
  },
  { 
    name: "Relatório", 
    href: "/reports", 
    icon: BarChart3, 
    color: "#8b5cf6" 
  },
  { 
    name: "Configuração", 
    icon: Settings, 
    color: "#6b7280",
    hasSubmenu: true,
    submenu: [
      { name: "Ramos de Negócio", href: "/config/ramos" },
      { name: "Planos", href: "/config/planos" },
      { name: "Usuários", href: "/config/usuarios" },
      { name: "Nível de usuário", href: "/config/niveis" }
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    )
  }

  const isMenuOpen = (menuName: string) => openMenus.includes(menuName)

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some(item => pathname === item.href)
  }

  return (
    <div style={{
      width: '260px',
      backgroundColor: '#fafbfc',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}>
      {/* Logo */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid #e2e8f0',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>E</span>
          </div>
          <div>
            <h2 style={{ 
              fontSize: '17px', 
              fontWeight: 'bold', 
              color: '#1e293b',
              margin: 0,
              marginBottom: '2px'
            }}>
              Empresariossa
            </h2>
            <p style={{ 
              fontSize: '12px', 
              color: '#64748b',
              margin: 0
            }}>
              Dashboard Admin
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
        overflowY: 'auto' 
      }}>
        {navigation.map((item) => {
          const isActive = item.href ? pathname === item.href : false
          const hasActiveSubmenu = item.hasSubmenu ? isSubmenuActive(item.submenu || []) : false
          const menuOpen = isMenuOpen(item.name)

          return (
            <div key={item.name}>
              {/* Main menu item */}
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
                    color: isActive ? 'white' : '#64748b',
                    background: isActive ? 
                      'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 
                      '#f1f5f9',
                    border: 'none',
                    boxShadow: isActive ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none',
                    transition: 'all 0.3s ease',
                    marginBottom: '4px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#e2e8f0'
                      e.currentTarget.style.color = '#334155'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f1f5f9'
                      e.currentTarget.style.color = '#64748b'
                    }
                  }}
                >
                  <item.icon style={{ 
                    marginRight: '12px', 
                    width: '20px', 
                    height: '20px',
                    color: isActive ? 'white' : '#94a3b8'
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
                      background: hasActiveSubmenu ? 
                        'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 
                        '#f1f5f9',
                      color: hasActiveSubmenu ? 'white' : '#64748b',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginBottom: '4px',
                      boxShadow: hasActiveSubmenu ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!hasActiveSubmenu) {
                        e.currentTarget.style.backgroundColor = '#e2e8f0'
                        e.currentTarget.style.color = '#334155'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!hasActiveSubmenu) {
                        e.currentTarget.style.backgroundColor = '#f1f5f9'
                        e.currentTarget.style.color = '#64748b'
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <item.icon style={{ 
                        marginRight: '12px', 
                        width: '20px', 
                        height: '20px',
                        color: hasActiveSubmenu ? 'white' : '#94a3b8'
                      }} />
                      {item.name}
                    </div>
                    {menuOpen ? (
                      <ChevronDown style={{ 
                        width: '18px', 
                        height: '18px',
                        color: hasActiveSubmenu ? 'white' : '#94a3b8'
                      }} />
                    ) : (
                      <ChevronRight style={{ 
                        width: '18px', 
                        height: '18px',
                        color: hasActiveSubmenu ? 'white' : '#94a3b8'
                      }} />
                    )}
                  </button>

                  {/* Submenu */}
                  {menuOpen && (
                    <div style={{ 
                      marginLeft: '16px', 
                      marginTop: '8px',
                      marginBottom: '8px',
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid #e2e8f0'
                    }}>
                      {item.submenu?.map((subItem) => {
                        const isSubActive = pathname === subItem.href
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
                              color: isSubActive ? item.color : '#64748b',
                              backgroundColor: isSubActive ? `${item.color}15` : 'transparent',
                              marginBottom: '2px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.backgroundColor = '#f8fafc'
                                e.currentTarget.style.color = '#334155'
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.backgroundColor = 'transparent'
                                e.currentTarget.style.color = '#64748b'
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
      </nav>
    </div>
  )
}
