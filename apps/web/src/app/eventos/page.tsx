"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Calendar, 
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Building2,
  ChevronLeft,
  ChevronRight,
  Settings,
  UserCheck,
  BarChart3,
  Download,
  Upload
} from "lucide-react"

interface Evento {
  id: string
  nome: string
  data: string
  horaInicio: string
  horaFim: string
  local: string
  unidade: string
  endereco?: string
  capacidade: number
  inscritos: number
  presentes: number
  status: 'Agendado' | 'Em Andamento' | 'Concluído' | 'Cancelado'
  tipo: 'Jantar' | 'Workshop' | 'Reunião' | 'Palestra' | 'Networking'
  descricao?: string
  organizador: string
  dataCadastro: string
  valorIngresso?: number
  requireConfirmacao: boolean
  participantes?: string[]
  observacoes?: string
}

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [unidadeFilter, setUnidadeFilter] = useState('todas')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    // Mock data baseado no sistema existente
    const mockEventos: Evento[] = [
      {
        id: '85',
        nome: 'WORKSHOP IA PARA EMPRESAS',
        data: '01/10/2025',
        horaInicio: '13:00',
        horaFim: '19:00',
        local: 'Barra Prime Office',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        endereco: 'Av. das Américas, 3434',
        capacidade: 50,
        inscritos: 42,
        presentes: 38,
        status: 'Concluído',
        tipo: 'Workshop',
        organizador: 'Alessandro Schlomer',
        dataCadastro: '16/09/2025 - 17:52',
        valorIngresso: 150.00,
        requireConfirmacao: true
      },
      {
        id: '81',
        nome: 'JANTAR DE NEGÓCIOS - UNIDADE NOVA AMÉRICA',
        data: '23/09/2025',
        horaInicio: '18:30',
        horaFim: '21:30',
        local: 'OUTBACK',
        unidade: 'Unidade Nova América - Del Castilho - Rio de Janeiro - Rj',
        endereco: 'Av. Pastor Martin Luther King Jr, 126',
        capacidade: 30,
        inscritos: 28,
        presentes: 25,
        status: 'Concluído',
        tipo: 'Jantar',
        organizador: 'Felipe Herculano',
        dataCadastro: '22/08/2025 - 14:01',
        requireConfirmacao: true
      },
      {
        id: '83',
        nome: 'JANTAR DE NEGÓCIO EMPRESÁRIOS S.A BARRA DA TIJUCA',
        data: '17/09/2025',
        horaInicio: '18:30',
        horaFim: '21:03',
        local: 'CAMARADA CAMARÃO NEW YORK CITY',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        endereco: 'Av. das Américas, 15500',
        capacidade: 40,
        inscritos: 35,
        presentes: 32,
        status: 'Concluído',
        tipo: 'Jantar',
        organizador: 'Diego Souza',
        dataCadastro: '01/09/2025 - 11:21',
        requireConfirmacao: true
      },
      {
        id: '86',
        nome: 'NETWORKING EMPRESARIAL OUTUBRO',
        data: '15/10/2025',
        horaInicio: '19:00',
        horaFim: '22:00',
        local: 'Sala de Eventos Prime',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        endereco: 'Av. das Américas, 3434',
        capacidade: 60,
        inscritos: 45,
        presentes: 0,
        status: 'Agendado',
        tipo: 'Networking',
        organizador: 'Alessandro Schlomer',
        dataCadastro: '18/09/2025 - 10:30',
        valorIngresso: 80.00,
        requireConfirmacao: true
      }
    ]

    setTimeout(() => {
      setEventos(mockEventos)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendado': return '#3b82f6'
      case 'Em Andamento': return '#f59e0b'
      case 'Concluído': return '#10b981'
      case 'Cancelado': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Agendado': return Calendar
      case 'Em Andamento': return Clock
      case 'Concluído': return CheckCircle
      case 'Cancelado': return AlertCircle
      default: return Calendar
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Jantar': return '#8b5cf6'
      case 'Workshop': return '#10b981'
      case 'Reunião': return '#3b82f6'
      case 'Palestra': return '#f59e0b'
      case 'Networking': return '#ef4444'
      default: return '#64748b'
    }
  }

  const calculatePresenceRate = (presentes: number, inscritos: number) => {
    if (inscritos === 0) return 0
    return Math.round((presentes / inscritos) * 100)
  }

  const filteredEventos = eventos.filter(evento => {
    const matchesSearch = evento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evento.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evento.organizador.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || evento.status === statusFilter
    const matchesTipo = tipoFilter === 'todos' || evento.tipo === tipoFilter
    const matchesUnidade = unidadeFilter === 'todas' || evento.unidade.toLowerCase().includes(unidadeFilter.toLowerCase())
    
    return matchesSearch && matchesStatus && matchesTipo && matchesUnidade
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredEventos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEventos = filteredEventos.slice(startIndex, startIndex + itemsPerPage)

  const totalEventos = eventos.length
  const agendados = eventos.filter(e => e.status === 'Agendado').length
  const concluidos = eventos.filter(e => e.status === 'Concluído').length
  const totalParticipantes = eventos.reduce((acc, e) => acc + e.inscritos, 0)
  const mediaPresenca = eventos.filter(e => e.status === 'Concluído').length > 0 
    ? Math.round(eventos.filter(e => e.status === 'Concluído').reduce((acc, e) => acc + calculatePresenceRate(e.presentes, e.inscritos), 0) / eventos.filter(e => e.status === 'Concluído').length)
    : 0

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
              Eventos
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
              Novo Evento
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gestão completa de eventos e controle de presença
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
              <Calendar style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Eventos</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalEventos}</div>
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
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Agendados</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{agendados}</div>
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
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Concluídos</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{concluidos}</div>
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
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Participantes</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalParticipantes}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <TrendingUp style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Taxa Presença</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{mediaPresenca}%</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          ...getCardStyle(),
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
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
                  placeholder="Nome, local, organizador..."
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
                <option value="Agendado">Agendado</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
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
                Tipo
              </label>
              <select
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
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
                <option value="Jantar">Jantar</option>
                <option value="Workshop">Workshop</option>
                <option value="Reunião">Reunião</option>
                <option value="Palestra">Palestra</option>
                <option value="Networking">Networking</option>
              </select>
            </div>
          </div>
        </div>

        {/* Eventos Cards */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <Calendar style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando eventos...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {paginatedEventos.map((evento) => {
                const StatusIcon = getStatusIcon(evento.status)
                const presenceRate = calculatePresenceRate(evento.presentes, evento.inscritos)
                
                return (
                  <div
                    key={evento.id}
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
                    {/* Header */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: colors.text.primary,
                          margin: 0,
                          flex: 1,
                          transition: 'color 0.3s ease'
                        }}>
                          {evento.nome}
                        </h3>
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '500',
                          backgroundColor: `${colors.brand.primary}20`,
                          color: colors.brand.primary
                        }}>
                          #{evento.id}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: `${getTipoColor(evento.tipo)}15`,
                          color: getTipoColor(evento.tipo)
                        }}>
                          {evento.tipo}
                        </span>

                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: `${getStatusColor(evento.status)}15`,
                          color: getStatusColor(evento.status),
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <StatusIcon style={{ width: '12px', height: '12px' }} />
                          {evento.status}
                        </span>
                      </div>
                    </div>

                    {/* Data e Horário */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        padding: '12px',
                        backgroundColor: colors.bg.tertiary,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'background-color 0.3s ease'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                          <span style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: colors.text.primary,
                            transition: 'color 0.3s ease'
                          }}>
                            {evento.data}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                          <span style={{
                            fontSize: '14px',
                            color: colors.text.secondary,
                            transition: 'color 0.3s ease'
                          }}>
                            {evento.horaInicio} - {evento.horaFim}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Local */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <MapPin style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: colors.text.primary,
                          transition: 'color 0.3s ease'
                        }}>
                          {evento.local}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Building2 style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                        <span style={{
                          fontSize: '12px',
                          color: colors.text.secondary,
                          transition: 'color 0.3s ease'
                        }}>
                          {evento.unidade}
                        </span>
                      </div>
                    </div>

                    {/* Estatísticas */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        <div style={{
                          padding: '8px',
                          backgroundColor: `${colors.brand.primary}10`,
                          borderRadius: '6px',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: colors.brand.primary
                          }}>
                            {evento.capacidade}
                          </div>
                          <div style={{
                            fontSize: '10px',
                            color: colors.text.tertiary
                          }}>
                            Capacidade
                          </div>
                        </div>

                        <div style={{
                          padding: '8px',
                          backgroundColor: `${getTipoColor(evento.tipo)}10`,
                          borderRadius: '6px',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: getTipoColor(evento.tipo)
                          }}>
                            {evento.inscritos}
                          </div>
                          <div style={{
                            fontSize: '10px',
                            color: colors.text.tertiary
                          }}>
                            Inscritos
                          </div>
                        </div>

                        <div style={{
                          padding: '8px',
                          backgroundColor: `${getStatusColor(evento.status)}10`,
                          borderRadius: '6px',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: getStatusColor(evento.status)
                          }}>
                            {evento.status === 'Concluído' ? presenceRate + '%' : evento.presentes}
                          </div>
                          <div style={{
                            fontSize: '10px',
                            color: colors.text.tertiary
                          }}>
                            {evento.status === 'Concluído' ? 'Presença' : 'Presentes'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px' }}>
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
                        <UserCheck style={{ width: '14px', height: '14px' }} />
                        Presença
                      </button>
                      <button style={{
                        flex: 1,
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
                        <Eye style={{ width: '14px', height: '14px' }} />
                        Ver
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
