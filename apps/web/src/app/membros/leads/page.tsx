"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Users, 
  Plus,
  Search,
  Filter,
  Calendar,
  Eye,
  Edit3,
  Phone,
  Mail,
  Building2,
  User,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  UserPlus,
  Target,
  Star,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"

interface Lead {
  id: string
  origem: 'Indicação' | 'Negócio' | 'Convidado' | 'Website' | 'Evento'
  nome: string
  cpfCnpj?: string
  celular?: string
  email?: string
  empresa?: string
  ramo?: string
  negocio?: string
  evento?: string
  membroRef?: string
  status: 'Novo' | 'Contactado' | 'Qualificado' | 'Convertido' | 'Perdido'
  dataCadastro: string
  ultimoContato?: string
  observacoes?: string
  potencial: 'Alto' | 'Médio' | 'Baixo'
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [origemFilter, setOrigemFilter] = useState('todas')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [potencialFilter, setPotencialFilter] = useState('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockLeads: Lead[] = [
      {
        id: '868',
        origem: 'Indicação',
        nome: 'Ulysses',
        cpfCnpj: '10.430.740/0001-11',
        celular: '(21) 00000-0000',
        email: 'ulysses@redeoncorp.com.br',
        empresa: 'RedeonCorp',
        ramo: 'Tecnologia',
        status: 'Qualificado',
        dataCadastro: '15/09/2025',
        ultimoContato: '16/09/2025',
        potencial: 'Alto'
      },
      {
        id: '861',
        origem: 'Negócio',
        nome: 'Patrícia',
        cpfCnpj: '997',
        celular: '(21) 98834-7446',
        email: 'patvianna@gmail.com',
        empresa: 'Consultoria Patricia',
        ramo: 'Consultoria Empresarial',
        negocio: '3',
        membroRef: 'Patrícia',
        status: 'Contactado',
        dataCadastro: '14/09/2025',
        potencial: 'Médio'
      },
      {
        id: '895',
        origem: 'Indicação',
        nome: 'Thaís Esteves',
        celular: '(21) 99446-7945',
        empresa: 'Actus Brasil',
        ramo: 'Gestão Empresarial',
        membroRef: 'Thaís Esteves',
        status: 'Novo',
        dataCadastro: '13/09/2025',
        potencial: 'Alto'
      },
      {
        id: '624',
        origem: 'Indicação',
        nome: 'Adenias (Membro)',
        celular: '(21) 96912-1170',
        membroRef: 'Priscila',
        status: 'Convertido',
        dataCadastro: '12/09/2025',
        ultimoContato: '15/09/2025',
        potencial: 'Alto'
      },
      {
        id: '773',
        origem: 'Convidado',
        nome: 'Adriana Felipe',
        celular: '(21) 96524-0001',
        email: 'bsoaresfinanceiro@gmail.com',
        empresa: 'Enfermagem',
        ramo: 'Mentoria em Saúde e Bem-Estar',
        evento: 'JANTAR DE NEGÓCIOS DUQUE DE CAXIAS 21/05',
        membroRef: 'Bruno Soares',
        status: 'Contactado',
        dataCadastro: '10/09/2025',
        potencial: 'Alto'
      }
    ]

    setTimeout(() => {
      setLeads(mockLeads)
      setLoading(false)
    }, 500)
  }, [])

  const getOrigemColor = (origem: string) => {
    switch (origem) {
      case 'Indicação': return '#8b5cf6'
      case 'Negócio': return '#10b981'
      case 'Convidado': return '#3b82f6'
      case 'Website': return '#f59e0b'
      case 'Evento': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getOrigemIcon = (origem: string) => {
    switch (origem) {
      case 'Indicação': return UserPlus
      case 'Negócio': return TrendingUp
      case 'Convidado': return Users
      case 'Website': return Target
      case 'Evento': return Calendar
      default: return User
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return '#3b82f6'
      case 'Contactado': return '#f59e0b'
      case 'Qualificado': return '#8b5cf6'
      case 'Convertido': return '#10b981'
      case 'Perdido': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Novo': return Star
      case 'Contactado': return Phone
      case 'Qualificado': return CheckCircle
      case 'Convertido': return TrendingUp
      case 'Perdido': return AlertCircle
      default: return Clock
    }
  }

  const getPotencialColor = (potencial: string) => {
    switch (potencial) {
      case 'Alto': return '#10b981'
      case 'Médio': return '#f59e0b'
      case 'Baixo': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (lead.empresa && lead.empresa.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesOrigem = origemFilter === 'todas' || lead.origem === origemFilter
    const matchesStatus = statusFilter === 'todos' || lead.status === statusFilter
    const matchesPotencial = potencialFilter === 'todos' || lead.potencial === potencialFilter
    
    return matchesSearch && matchesOrigem && matchesStatus && matchesPotencial
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage)

  const totalLeads = leads.length
  const novos = leads.filter(l => l.status === 'Novo').length
  const qualificados = leads.filter(l => l.status === 'Qualificado').length
  const convertidos = leads.filter(l => l.status === 'Convertido').length
  const altosPotencial = leads.filter(l => l.potencial === 'Alto').length

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: colors.text.primary,
              margin: 0,
              transition: 'color 0.3s ease'
            }}>
              Leads
            </h1>
            <button style={{
              padding: '12px 20px',
              background: colors.brand.gradient,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
              transition: 'all 0.3s ease'
            }}>
              <Plus style={{ width: '18px', height: '18px' }} />
              Novo Lead
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gerencie prospects e potenciais membros
          </p>
        </div>

        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{
            background: colors.brand.gradient,
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Target style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Leads</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalLeads}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Star style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Novos</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{novos}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <CheckCircle style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Qualificados</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{qualificados}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <TrendingUp style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Convertidos</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{convertidos}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Users style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Alto Potencial</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{altosPotencial}</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          ...getCardStyle(),
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', alignItems: 'end' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: colors.text.secondary,
                marginBottom: '6px',
                transition: 'color 0.3s ease'
              }}>
                Buscar
              </label>
              <div style={{ position: 'relative' }}>
                <Search style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: colors.text.tertiary
                }} />
                <input
                  type="text"
                  placeholder="Nome, email, empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '8px',
                    backgroundColor: colors.bg.tertiary,
                    color: colors.text.primary,
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: colors.text.secondary,
                marginBottom: '6px',
                transition: 'color 0.3s ease'
              }}>
                Origem
              </label>
              <select
                value={origemFilter}
                onChange={(e) => setOrigemFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.tertiary,
                  color: colors.text.primary,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="todas">Todas</option>
                <option value="Indicação">Indicação</option>
                <option value="Negócio">Negócio</option>
                <option value="Convidado">Convidado</option>
                <option value="Website">Website</option>
                <option value="Evento">Evento</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: colors.text.secondary,
                marginBottom: '6px',
                transition: 'color 0.3s ease'
              }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.tertiary,
                  color: colors.text.primary,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="todos">Todos</option>
                <option value="Novo">Novo</option>
                <option value="Contactado">Contactado</option>
                <option value="Qualificado">Qualificado</option>
                <option value="Convertido">Convertido</option>
                <option value="Perdido">Perdido</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: colors.text.secondary,
                marginBottom: '6px',
                transition: 'color 0.3s ease'
              }}>
                Potencial
              </label>
              <select
                value={potencialFilter}
                onChange={(e) => setPotencialFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.tertiary,
                  color: colors.text.primary,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="todos">Todos</option>
                <option value="Alto">Alto</option>
                <option value="Médio">Médio</option>
                <option value="Baixo">Baixo</option>
              </select>
            </div>

            <div>
              <button style={{
                padding: '10px 16px',
                backgroundColor: colors.bg.tertiary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: '8px',
                color: colors.text.primary,
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                width: '100%',
                justifyContent: 'center'
              }}>
                <Filter style={{ width: '16px', height: '16px' }} />
                Filtrar
              </button>
            </div>
          </div>
        </div>

        {/* Leads Grid */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <Target style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando leads...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {paginatedLeads.map((lead) => {
                const OrigemIcon = getOrigemIcon(lead.origem)
                const StatusIcon = getStatusIcon(lead.status)
                
                return (
                  <div
                    key={lead.id}
                    style={{
                      ...getCardStyle(),
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    {/* Header da Card */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                      {/* Avatar */}
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        background: colors.brand.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        {getInitials(lead.nome)}
                      </div>

                      {/* Info Principal */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: colors.text.primary,
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            transition: 'color 0.3s ease'
                          }}>
                            {lead.nome}
                          </h3>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '500',
                            backgroundColor: `${colors.brand.primary}20`,
                            color: colors.brand.primary,
                            flexShrink: 0,
                            marginLeft: '8px'
                          }}>
                            #{lead.id}
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '500',
                            backgroundColor: `${getOrigemColor(lead.origem)}15`,
                            color: getOrigemColor(lead.origem),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <OrigemIcon style={{ width: '12px', height: '12px' }} />
                            {lead.origem}
                          </span>

                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '500',
                            backgroundColor: `${getStatusColor(lead.status)}15`,
                            color: getStatusColor(lead.status),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <StatusIcon style={{ width: '12px', height: '12px' }} />
                            {lead.status}
                          </span>

                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '500',
                            backgroundColor: `${getPotencialColor(lead.potencial)}15`,
                            color: getPotencialColor(lead.potencial)
                          }}>
                            {lead.potencial}
                          </span>
                        </div>

                        {lead.empresa && (
                          <p style={{
                            fontSize: '13px',
                            color: colors.text.secondary,
                            margin: 0,
                            transition: 'color 0.3s ease'
                          }}>
                            {lead.empresa} {lead.ramo && `• ${lead.ramo}`}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contato */}
                    {(lead.celular || lead.email) && (
                      <div style={{ marginBottom: '16px', display: 'grid', gap: '8px' }}>
                        {lead.celular && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Phone style={{ width: '14px', height: '14px', color: colors.text.tertiary, flexShrink: 0 }} />
                            <span style={{
                              fontSize: '13px',
                              color: colors.text.primary,
                              transition: 'color 0.3s ease'
                            }}>
                              {lead.celular}
                            </span>
                          </div>
                        )}
                        {lead.email && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Mail style={{ width: '14px', height: '14px', color: colors.text.tertiary, flexShrink: 0 }} />
                            <span style={{
                              fontSize: '13px',
                              color: colors.text.primary,
                              transition: 'color 0.3s ease',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {lead.email}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Referências */}
                    {lead.membroRef && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <User style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                          <span style={{
                            fontSize: '12px',
                            color: colors.text.secondary,
                            transition: 'color 0.3s ease'
                          }}>
                            Referenciado por: {lead.membroRef}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      <button style={{
                        flex: 1,
                        padding: '8px 12px',
                        backgroundColor: colors.brand.primary,
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.3s ease'
                      }}>
                        <Eye style={{ width: '14px', height: '14px' }} />
                        Visualizar
                      </button>
                      <button style={{
                        padding: '8px 12px',
                        backgroundColor: colors.bg.tertiary,
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '6px',
                        color: colors.text.primary,
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.3s ease'
                      }}>
                        <Edit3 style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>

                    {/* Footer */}
                    <div style={{ 
                      paddingTop: '12px', 
                      borderTop: `1px solid ${colors.border.primary}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{
                        fontSize: '11px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Cadastro: {lead.dataCadastro}
                      </span>
                      {lead.ultimoContato && (
                        <span style={{
                          fontSize: '11px',
                          color: colors.text.tertiary,
                          transition: 'color 0.3s ease'
                        }}>
                          Último contato: {lead.ultimoContato}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '24px'
            }}>
              <p style={{
                fontSize: '14px',
                color: colors.text.secondary,
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                Mostrando página {currentPage} de {totalPages}. Total de registros é de {filteredLeads.length}.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: colors.bg.tertiary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    color: colors.text.primary,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ChevronLeft style={{ width: '16px', height: '16px' }} />
                  Anterior
                </button>

                <span style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  color: colors.text.primary,
                  transition: 'color 0.3s ease'
                }}>
                  Página {currentPage}
                </span>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: colors.bg.tertiary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    color: colors.text.primary,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Próximo
                  <ChevronRight style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
