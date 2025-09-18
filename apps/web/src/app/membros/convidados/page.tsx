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
  Check,
  X,
  Phone,
  Mail,
  Building2,
  User,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  TrendingUp
} from "lucide-react"

interface Convidado {
  id: string
  nome: string
  cpf?: string
  celular?: string
  email?: string
  empresa?: string
  evento: string
  ramo: string
  membro: string
  quem: string
  status: 'Criado na tela login' | 'Pendente comprovante' | 'Confirmado' | 'Rejeitado'
  dataCadastro: string
  dataEvento?: string
}

export default function ConvidadosPage() {
  const [convidados, setConvidados] = useState<Convidado[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [eventoFilter, setEventoFilter] = useState('todos')
  const [ramoFilter, setRamoFilter] = useState('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    // Mock data baseado no sistema existente
    const mockConvidados: Convidado[] = [
      {
        id: '1',
        nome: 'Adenias G. Filho',
        cpf: '7583232804',
        celular: '21969121170',
        email: 'a.goncalves@brexperts.com.br',
        empresa: 'BRexperts Gestão Estratégica de Negócios',
        evento: 'JANTAR DE NEGÓCIOS - UNIDADE NOVA AMERICA - 17/06/2025',
        ramo: 'Consultoria Financeira para Empresas',
        membro: '-',
        quem: 'Ninguém',
        status: 'Criado na tela login',
        dataCadastro: '17/06/2025 - 15:09'
      },
      {
        id: '2',
        nome: 'Adriana Felipe',
        evento: 'JANTAR DE NEGÓCIOS DUQUE DE CAXIAS 21/05',
        ramo: 'Mentoria em Saúde e Bem-Estar',
        membro: 'Bruno Soares',
        quem: '-',
        email: 'bsoaresfinanceiro@gmail.com',
        celular: '(21) 96524-0001',
        empresa: 'Enfermagem',
        status: 'Pendente comprovante',
        dataCadastro: '20/05/2025 - 15:19'
      },
      {
        id: '3',
        nome: 'Adriana Matheus da Silva',
        cpf: '14531564707',
        email: 'Adrianamatheus516@gmail.com',
        celular: '21966866097',
        empresa: 'Spa dos pés',
        evento: 'Caxias- 17/04',
        ramo: 'Coaching de Saúde e Bem-Estar',
        membro: '-',
        quem: 'Isa',
        status: 'Criado na tela login',
        dataCadastro: '13/04/2025 - 13:58'
      },
      {
        id: '4',
        nome: 'Adriana Matheus da Silva',
        cpf: '14531564707',
        email: 'adrianamatheus516@gmail.com',
        celular: '21966866097',
        empresa: 'Spa dos pés',
        evento: 'Caxias- 17/04',
        ramo: 'Consultoria em Gestão de Vendas e Atendimento ao Cliente',
        membro: '-',
        quem: 'Isa',
        status: 'Criado na tela login',
        dataCadastro: '13/04/2025 - 14:00'
      },
      {
        id: '5',
        nome: 'Adriana Matheus da Silva',
        cpf: '14531564707',
        email: 'adrianamatheus516@gmail.com',
        celular: '21966866097',
        empresa: 'Spa dos pés',
        evento: 'Caxias- 17/04',
        ramo: 'Coaching de Saúde e Bem-Estar',
        membro: '-',
        quem: 'Isa',
        status: 'Criado na tela login',
        dataCadastro: '14/04/2025 - 10:06'
      },
      {
        id: '6',
        nome: 'ADRIANO',
        cpf: '10206149786',
        email: 'adriano@atofiscal.com.br',
        celular: '21988445428',
        empresa: 'ATO FISCAL',
        evento: 'JANTAR DE NEGÓCIOS - UNIDADE NOVA AMÉRICA - 15/07/2025',
        ramo: 'Contabilidade para Empresas de Serviços',
        membro: '-',
        quem: 'Leonardo Afonso',
        status: 'Criado na tela login',
        dataCadastro: '15/07/2025 - 13:56'
      },
      {
        id: '7',
        nome: 'ADRIANO DOS SANTOS GOMES',
        cpf: '10206149786',
        email: 'adriano@atofiscal.com.br',
        celular: '21988445428',
        empresa: 'ATO FISCAL',
        evento: 'JANTAR DE NEGÓCIOS - UNIDADE NOVA AMÉRICA - 02/06/2025',
        ramo: 'Contabilidade para Pequenas e Médias Empresas (PMEs)',
        membro: '-',
        quem: 'Wallace',
        status: 'Criado na tela login',
        dataCadastro: '02/06/2025 - 18:33'
      }
    ]

    setTimeout(() => {
      setConvidados(mockConvidados)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Criado na tela login': return '#3b82f6'
      case 'Pendente comprovante': return '#f59e0b'
      case 'Confirmado': return '#10b981'
      case 'Rejeitado': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Criado na tela login': return 'Aguardando'
      case 'Pendente comprovante': return 'Pendente'
      case 'Confirmado': return 'Confirmado'
      case 'Rejeitado': return 'Rejeitado'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Criado na tela login': return Clock
      case 'Pendente comprovante': return AlertCircle
      case 'Confirmado': return CheckCircle
      case 'Rejeitado': return X
      default: return Clock
    }
  }

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()
  }

  const filteredConvidados = convidados.filter(convidado => {
    const matchesSearch = convidado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (convidado.email && convidado.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (convidado.empresa && convidado.empresa.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'todos' || convidado.status === statusFilter
    const matchesEvento = eventoFilter === 'todos' || convidado.evento.toLowerCase().includes(eventoFilter.toLowerCase())
    const matchesRamo = ramoFilter === 'todos' || convidado.ramo.toLowerCase().includes(ramoFilter.toLowerCase())
    
    return matchesSearch && matchesStatus && matchesEvento && matchesRamo
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredConvidados.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedConvidados = filteredConvidados.slice(startIndex, startIndex + itemsPerPage)

  const totalConvidados = convidados.length
  const aguardando = convidados.filter(c => c.status === 'Criado na tela login').length
  const pendentes = convidados.filter(c => c.status === 'Pendente comprovante').length
  const confirmados = convidados.filter(c => c.status === 'Confirmado').length

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
              Convidados
            </h1>
            <button style={{
              ...getCardStyle(),
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
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
            }}>
              <Plus style={{ width: '18px', height: '18px' }} />
              Convidar
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gerencie convidados e visitantes dos eventos
          </p>
        </div>

        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{
            background: colors.brand.gradient,
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Users style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Convidados</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalConvidados}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Clock style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Aguardando</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{aguardando}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <AlertCircle style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Pendentes</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{pendentes}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <CheckCircle style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Confirmados</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{confirmados}</div>
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
                <option value="Criado na tela login">Aguardando</option>
                <option value="Pendente comprovante">Pendente</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Rejeitado">Rejeitado</option>
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
                Evento
              </label>
              <select
                value={eventoFilter}
                onChange={(e) => setEventoFilter(e.target.value)}
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
                <option value="jantar">Jantar de Negócios</option>
                <option value="caxias">Duque de Caxias</option>
                <option value="america">Nova América</option>
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
                Ramo
              </label>
              <select
                value={ramoFilter}
                onChange={(e) => setRamoFilter(e.target.value)}
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
                <option value="consultoria">Consultoria</option>
                <option value="contabilidade">Contabilidade</option>
                <option value="coaching">Coaching</option>
                <option value="mentoria">Mentoria</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
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
                transition: 'all 0.3s ease'
              }}>
                <Filter style={{ width: '16px', height: '16px' }} />
                Filtrar
              </button>
            </div>
          </div>
        </div>

        {/* Convidados Grid */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <Users style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando convidados...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {paginatedConvidados.map((convidado) => {
                const StatusIcon = getStatusIcon(convidado.status)
                return (
                  <div
                    key={convidado.id}
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
                        {getInitials(convidado.nome)}
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
                            {convidado.nome}
                          </h3>
                          <div style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '500',
                            backgroundColor: `${getStatusColor(convidado.status)}15`,
                            color: getStatusColor(convidado.status),
                            flexShrink: 0,
                            marginLeft: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <StatusIcon style={{ width: '12px', height: '12px' }} />
                            {getStatusText(convidado.status)}
                          </div>
                        </div>
                        {convidado.cpf && (
                          <p style={{
                            fontSize: '12px',
                            color: colors.text.secondary,
                            margin: '0 0 4px 0',
                            fontFamily: 'monospace',
                            transition: 'color 0.3s ease'
                          }}>
                            CPF: {convidado.cpf}
                          </p>
                        )}
                        {convidado.empresa && (
                          <p style={{
                            fontSize: '13px',
                            color: colors.text.secondary,
                            margin: 0,
                            transition: 'color 0.3s ease'
                          }}>
                            {convidado.empresa}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Evento */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        padding: '12px',
                        backgroundColor: colors.bg.tertiary,
                        borderRadius: '8px',
                        transition: 'background-color 0.3s ease'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <Calendar style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                          <span style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            color: colors.text.secondary,
                            transition: 'color 0.3s ease'
                          }}>
                            Evento
                          </span>
                        </div>
                        <p style={{
                          fontSize: '13px',
                          color: colors.text.primary,
                          margin: 0,
                          lineHeight: '1.3',
                          transition: 'color 0.3s ease'
                        }}>
                          {convidado.evento}
                        </p>
                      </div>
                    </div>

                    {/* Ramo */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Building2 style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: colors.text.secondary,
                          transition: 'color 0.3s ease'
                        }}>
                          Ramo de Negócio
                        </span>
                      </div>
                      <p style={{
                        fontSize: '13px',
                        color: colors.text.primary,
                        margin: 0,
                        lineHeight: '1.3',
                        transition: 'color 0.3s ease'
                      }}>
                        {convidado.ramo}
                      </p>
                    </div>

                    {/* Contato */}
                    {(convidado.celular || convidado.email) && (
                      <div style={{ marginBottom: '16px', display: 'grid', gap: '8px' }}>
                        {convidado.celular && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Phone style={{ width: '14px', height: '14px', color: colors.text.tertiary, flexShrink: 0 }} />
                            <span style={{
                              fontSize: '13px',
                              color: colors.text.primary,
                              transition: 'color 0.3s ease'
                            }}>
                              {convidado.celular}
                            </span>
                          </div>
                        )}
                        {convidado.email && (
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
                              {convidado.email}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Convidado por */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                        <span style={{
                          fontSize: '12px',
                          color: colors.text.secondary,
                          transition: 'color 0.3s ease'
                        }}>
                          Convidado por: {convidado.quem || convidado.membro || 'Sistema'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      {convidado.status === 'Pendente comprovante' && (
                        <>
                          <button style={{
                            flex: 1,
                            padding: '8px 12px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
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
                            <Check style={{ width: '14px', height: '14px' }} />
                            Confirmar
                          </button>
                          <button style={{
                            padding: '8px 12px',
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
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
                            <X style={{ width: '14px', height: '14px' }} />
                          </button>
                        </>
                      )}
                      {convidado.status !== 'Pendente comprovante' && (
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
                      )}
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar style={{ width: '12px', height: '12px', color: colors.text.tertiary }} />
                        <span style={{
                          fontSize: '11px',
                          color: colors.text.secondary,
                          transition: 'color 0.3s ease'
                        }}>
                          Cadastro: {convidado.dataCadastro.split(' ')[0]}
                        </span>
                      </div>
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
                Mostrando página {currentPage} de {totalPages}. Total de registros é de {filteredConvidados.length}.
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
