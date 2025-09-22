"use client"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { ProMembersSidebar } from "@/components/layout/pro-members-sidebar"
import { SimpleEnhancedHeader } from "@/components/layout/simple-enhanced-header"
import {
  Calendar,
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  Eye,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Building2,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  BarChart3
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

export default function MembrosEventosPage() {
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
    // Simulação de carregamento de dados
    const mockEventos: Evento[] = [
      {
        id: '1',
        nome: 'WORKSHOP IA PARA EMPRESAS',
        data: '01/10/2025',
        horaInicio: '13:00',
        horaFim: '19:00',
        local: 'Barra Prime Office',
        unidade: 'Barra da Tijuca',
        endereco: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        capacidade: 50,
        inscritos: 42,
        presentes: 38,
        status: 'Concluído',
        tipo: 'Workshop',
        organizador: 'Administração',
        dataCadastro: '15/09/2025',
        valorIngresso: 0,
        requireConfirmacao: true
      },
      {
        id: '2',
        nome: 'JANTAR DE NEGÓCIOS - UNIDADE NOVA AMÉRICA',
        data: '23/09/2025',
        horaInicio: '18:30',
        horaFim: '21:30',
        local: 'OUTBACK',
        unidade: 'Nova América',
        endereco: 'Unidade Nova América - Del Castilho - Rio de Janeiro - RJ',
        capacidade: 30,
        inscritos: 28,
        presentes: 25,
        status: 'Concluído',
        tipo: 'Jantar',
        organizador: 'Coordenação Regional',
        dataCadastro: '10/09/2025',
        valorIngresso: 120,
        requireConfirmacao: true
      },
      {
        id: '3',
        nome: 'JANTAR DE NEGÓCIO EMPRESÁRIOS S.A BARRA DA TIJUCA',
        data: '17/09/2025',
        horaInicio: '18:30',
        horaFim: '21:03',
        local: 'CAMARADA CAMARÃO NEW YORK CITY',
        unidade: 'Barra da Tijuca',
        endereco: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        capacidade: 40,
        inscritos: 35,
        presentes: 33,
        status: 'Concluído',
        tipo: 'Jantar',
        organizador: 'Administração',
        dataCadastro: '05/09/2025',
        valorIngresso: 150,
        requireConfirmacao: true
      },
      {
        id: '4',
        nome: 'NETWORKING BREAKFAST - NOVOS MEMBROS',
        data: '25/10/2025',
        horaInicio: '08:00',
        horaFim: '10:00',
        local: 'Hotel Copacabana Palace',
        unidade: 'Copacabana',
        endereco: 'Copacabana - Rio de Janeiro/RJ',
        capacidade: 25,
        inscritos: 18,
        presentes: 0,
        status: 'Agendado',
        tipo: 'Networking',
        organizador: 'Coordenação',
        dataCadastro: '20/09/2025',
        valorIngresso: 80,
        requireConfirmacao: true
      }
    ]
    
    setTimeout(() => {
      setEventos(mockEventos)
      setLoading(false)
    }, 1000)
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
      case 'Workshop': return '#f59e0b'
      case 'Reunião': return '#3b82f6'
      case 'Palestra': return '#10b981'
      case 'Networking': return '#ef4444'
      default: return '#64748b'
    }
  }

  const filteredEventos = eventos.filter(evento => {
    const matchesSearch = evento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evento.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evento.organizador.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || evento.status === statusFilter
    const matchesTipo = tipoFilter === 'todos' || evento.tipo === tipoFilter
    const matchesUnidade = unidadeFilter === 'todas' || evento.unidade === unidadeFilter
    
    return matchesSearch && matchesStatus && matchesTipo && matchesUnidade
  })

  const itemsPerPage = 9
  const totalPages = Math.ceil(filteredEventos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEventos = filteredEventos.slice(startIndex, endIndex)

  const totalEventos = eventos.length
  const eventosAgendados = eventos.filter(e => e.status === 'Agendado').length
  const eventosConcluidos = eventos.filter(e => e.status === 'Concluído').length
  const totalParticipantes = eventos.reduce((acc, e) => acc + e.inscritos, 0)
  const taxaPresencaMedia = eventos.length > 0 ? 
    Math.round(eventos.reduce((acc, e) => acc + (e.presentes / e.inscritos * 100), 0) / eventos.length) : 0

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <ProMembersSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SimpleEnhancedHeader area="member" />
        
        <main style={{ 
          flex: 1, 
          padding: '32px', 
          backgroundColor: colors.bg.primary,
          overflow: 'auto'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: colors.text.primary,
              margin: 0,
              marginBottom: '8px'
            }}>
              Eventos
            </h1>
            <p style={{
              color: colors.text.secondary,
              margin: 0,
              fontSize: '16px'
            }}>
              Consulte todos os eventos disponíveis e sua participação
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {totalEventos}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Total Eventos
                  </div>
                </div>
                <Calendar size={32} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {eventosAgendados}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Agendados
                  </div>
                </div>
                <Clock size={32} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {eventosConcluidos}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Concluídos
                  </div>
                </div>
                <CheckCircle size={32} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {totalParticipantes}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Participantes
                  </div>
                </div>
                <Users size={32} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {taxaPresencaMedia}%
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Taxa Presença
                  </div>
                </div>
                <TrendingUp size={32} style={{ opacity: 0.8 }} />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div style={{
            ...getCardStyle(),
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '16px',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.text.tertiary
                }} />
                <input
                  type="text"
                  placeholder="Buscar por nome, local, organizador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '8px',
                    backgroundColor: colors.bg.secondary,
                    color: colors.text.primary,
                    fontSize: '14px'
                  }}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.secondary,
                  color: colors.text.primary,
                  fontSize: '14px'
                }}
              >
                <option value="todos">Todos os status</option>
                <option value="Agendado">Agendado</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>

              <select
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
                style={{
                  padding: '12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.secondary,
                  color: colors.text.primary,
                  fontSize: '14px'
                }}
              >
                <option value="todos">Todos os tipos</option>
                <option value="Jantar">Jantar</option>
                <option value="Workshop">Workshop</option>
                <option value="Reunião">Reunião</option>
                <option value="Palestra">Palestra</option>
                <option value="Networking">Networking</option>
              </select>

              <select
                value={unidadeFilter}
                onChange={(e) => setUnidadeFilter(e.target.value)}
                style={{
                  padding: '12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.secondary,
                  color: colors.text.primary,
                  fontSize: '14px'
                }}
              >
                <option value="todas">Todas as unidades</option>
                <option value="Barra da Tijuca">Barra da Tijuca</option>
                <option value="Nova América">Nova América</option>
                <option value="Copacabana">Copacabana</option>
              </select>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px 0',
              borderTop: `1px solid ${colors.border.primary}`,
              color: colors.text.secondary,
              fontSize: '14px'
            }}>
              {filteredEventos.length} eventos encontrados
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{
              textAlign: 'center',
              padding: '64px',
              color: colors.text.secondary
            }}>
              Carregando eventos...
            </div>
          )}

          {/* Events Grid */}
          {!loading && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {currentEventos.map((evento) => {
                const StatusIcon = getStatusIcon(evento.status)
                const presenceRate = evento.capacidade > 0 ? Math.round((evento.presentes / evento.capacidade) * 100) : 0
                
                return (
                  <div key={evento.id} style={{
                    ...getCardStyle(),
                    position: 'relative',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}>
                    {/* Header do Card */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '16px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: 0,
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: colors.text.primary,
                          lineHeight: '1.4',
                          marginBottom: '8px'
                        }}>
                          {evento.nome}
                        </h3>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          backgroundColor: `${getTipoColor(evento.tipo)}20`,
                          fontSize: '12px',
                          fontWeight: '500',
                          color: getTipoColor(evento.tipo)
                        }}>
                          {evento.tipo}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        backgroundColor: `${getStatusColor(evento.status)}20`,
                        color: getStatusColor(evento.status),
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        <StatusIcon size={14} style={{ marginRight: '4px' }} />
                        {evento.status}
                      </div>
                    </div>

                    {/* Informações do Evento */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: colors.text.secondary
                      }}>
                        <Calendar size={16} style={{ marginRight: '8px' }} />
                        {evento.data} • {evento.horaInicio} - {evento.horaFim}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: colors.text.secondary
                      }}>
                        <MapPin size={16} style={{ marginRight: '8px' }} />
                        {evento.local}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        color: colors.text.secondary
                      }}>
                        <Building2 size={16} style={{ marginRight: '8px' }} />
                        {evento.endereco}
                      </div>
                    </div>

                    {/* Estatísticas */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        padding: '8px',
                        backgroundColor: colors.bg.tertiary,
                        borderRadius: '6px',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: colors.text.primary
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

                    {/* Ação de Visualização (somente visualizar, não editar) */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        flex: 1,
                        padding: '10px 16px',
                        backgroundColor: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background-color 0.2s ease'
                      }}>
                        <Eye size={16} />
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '32px'
            }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '6px',
                  backgroundColor: colors.bg.secondary,
                  color: colors.text.primary,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1
                }}
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${currentPage === page ? '#8b5cf6' : colors.border.primary}`,
                    borderRadius: '6px',
                    backgroundColor: currentPage === page ? '#8b5cf6' : colors.bg.secondary,
                    color: currentPage === page ? 'white' : colors.text.primary,
                    cursor: 'pointer'
                  }}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '6px',
                  backgroundColor: colors.bg.secondary,
                  color: colors.text.primary,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
