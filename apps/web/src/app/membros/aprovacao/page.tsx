"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  UserCheck, 
  Plus,
  Search,
  Filter,
  Users,
  Calendar,
  Eye,
  Edit3,
  Check,
  X,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MessageSquare,
  TrendingUp,
  UserPlus,
  CheckCircle
} from "lucide-react"

interface Candidato {
  id: string
  nome: string
  cpf?: string
  celular?: string
  email?: string
  unidade?: string
  plano?: string
  entrevistador: string
  status: 'Para entrevistar' | 'Aprovado' | 'Rejeitado' | 'Agendado'
  dataEntrevista?: string
  horarioEntrevista?: string
  dataCadastro: string
  dataAtivacao?: string
  observacoes?: string
}

export default function AprovacaoEntrevistaPage() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [entrevistadorFilter, setEntrevistadorFilter] = useState('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    // Mock data baseado no sistema existente
    const mockCandidatos: Candidato[] = [
      {
        id: '1',
        nome: 'Wallace Entrevista',
        entrevistador: 'Pra cima Rh',
        status: 'Para entrevistar',
        dataCadastro: '16/09/2025 - 14:01'
      },
      {
        id: '2',
        nome: 'Natasha Vilardo',
        cpf: '927.642.662-00',
        celular: '(21) 97454-9760',
        email: 'natashavilardo35@gmail.com',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        plano: 'Plano Anual',
        entrevistador: 'Pra cima Rh',
        status: 'Para entrevistar',
        dataCadastro: '02/09/2025 - 18:31'
      },
      {
        id: '3',
        nome: 'Rafael Fardin',
        cpf: '018.358.341-83',
        celular: '(61) 99130-9795',
        email: 'rafaelfardin@gmail.com',
        unidade: 'Unidade Nova América - Del Castilho - Rio de Janeiro - RJ',
        plano: 'Plano Anual',
        entrevistador: 'Pra cima Rh',
        status: 'Para entrevistar',
        dataCadastro: '02/09/2025 - 18:30'
      },
      {
        id: '4',
        nome: 'VIVIANE VIEIRA FREIRE MACEDO',
        cpf: '042.548.317-73',
        celular: '(21) 99857-9020',
        email: 'viviane.psicoped@gmail.com',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        plano: 'Plano Anual',
        entrevistador: 'Pra cima Rh',
        status: 'Para entrevistar',
        dataCadastro: '02/09/2025 - 18:28'
      },
      {
        id: '5',
        nome: 'Felipe Lima',
        cpf: '088.660.807-48',
        celular: '(21) 97686-0252',
        email: 'felima.rh@gmail.com',
        unidade: 'Empresários SA Conexão Brasil',
        plano: 'Plano Anual',
        entrevistador: 'Wallace Admin',
        status: 'Para entrevistar',
        dataCadastro: '19/05/2025 - 12:27'
      },
      {
        id: '6',
        nome: 'Sandra Augusta de Paula Azevedo Corrêa',
        cpf: '884.773.127-53',
        celular: '(21) 99104-2700',
        email: 'sandraaugustacorrea@gmail.com',
        unidade: 'Unidade Nova América - Del Castilho - Rio de Janeiro - RJ',
        plano: 'Plano Anual',
        entrevistador: 'Pra cima Rh',
        status: 'Para entrevistar',
        dataCadastro: '24/02/2025 - 21:11'
      },
      {
        id: '7',
        nome: 'Denilson de Oliveira',
        cpf: '021.212.547-81',
        celular: '(49) 99820-8265',
        email: 'denilsoncarioca2@gmail.com',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        plano: 'Semestral',
        entrevistador: 'Wallace Entrevista',
        status: 'Aprovado',
        dataEntrevista: '23/09/2024',
        horarioEntrevista: '00:00:00',
        dataCadastro: '23/09/2024 - 00:53'
      },
      {
        id: '8',
        nome: 'VIVIANE Gonçalves',
        cpf: '106.532.557-44',
        celular: '(21) 99717-5867',
        email: 'vspmicromankent@gmail.com',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        plano: 'Plano Anual',
        entrevistador: 'Wallace Admin',
        status: 'Aprovado',
        dataEntrevista: '23/09/2024',
        horarioEntrevista: '04:51:00',
        dataCadastro: '23/09/2024'
      }
    ]

    setTimeout(() => {
      setCandidatos(mockCandidatos)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Para entrevistar': return '#f59e0b'
      case 'Aprovado': return '#10b981'
      case 'Rejeitado': return '#ef4444'
      case 'Agendado': return '#3b82f6'
      default: return '#64748b'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Para entrevistar': return 'Para Entrevistar'
      case 'Aprovado': return 'Aprovado'
      case 'Rejeitado': return 'Rejeitado'
      case 'Agendado': return 'Entrevista Agendada'
      default: return status
    }
  }

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()
  }

  const filteredCandidatos = candidatos.filter(candidato => {
    const matchesSearch = candidato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (candidato.email && candidato.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (candidato.cpf && candidato.cpf.includes(searchTerm))
    const matchesStatus = statusFilter === 'todos' || candidato.status === statusFilter
    const matchesEntrevistador = entrevistadorFilter === 'todos' || candidato.entrevistador === entrevistadorFilter
    
    return matchesSearch && matchesStatus && matchesEntrevistador
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredCandidatos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCandidatos = filteredCandidatos.slice(startIndex, startIndex + itemsPerPage)

  const totalCandidatos = candidatos.length
  const paraEntrevistar = candidatos.filter(c => c.status === 'Para entrevistar').length
  const aprovados = candidatos.filter(c => c.status === 'Aprovado').length
  const taxaAprovacao = totalCandidatos > 0 ? Math.round((aprovados / totalCandidatos) * 100) : 0

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
              Aprovação/Entrevista
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
              Novo Candidato
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gerencie candidatos, entrevistas e processo de aprovação
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
              <UserPlus style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Candidatos</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalCandidatos}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Clock style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Para Entrevistar</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{paraEntrevistar}</div>
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
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Aprovados</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{aprovados}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <TrendingUp style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Taxa Aprovação</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{taxaAprovacao}%</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          ...getCardStyle(),
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'end' }}>
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
                  placeholder="Nome, email, CPF..."
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
                <option value="Para entrevistar">Para Entrevistar</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Rejeitado">Rejeitado</option>
                <option value="Agendado">Entrevista Agendada</option>
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
                Entrevistador
              </label>
              <select
                value={entrevistadorFilter}
                onChange={(e) => setEntrevistadorFilter(e.target.value)}
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
                <option value="Pra cima Rh">Pra cima Rh</option>
                <option value="Wallace Admin">Wallace Admin</option>
                <option value="Wallace Entrevista">Wallace Entrevista</option>
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

        {/* Candidatos Grid */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <UserCheck style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando candidatos...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {paginatedCandidatos.map((candidato) => (
                <div
                  key={candidato.id}
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
                      {getInitials(candidato.nome)}
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
                          {candidato.nome}
                        </h3>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: `${getStatusColor(candidato.status)}15`,
                          color: getStatusColor(candidato.status),
                          flexShrink: 0,
                          marginLeft: '8px'
                        }}>
                          {getStatusText(candidato.status)}
                        </span>
                      </div>
                      {candidato.cpf && (
                        <p style={{
                          fontSize: '12px',
                          color: colors.text.secondary,
                          margin: '0 0 4px 0',
                          fontFamily: 'monospace',
                          transition: 'color 0.3s ease'
                        }}>
                          CPF: {candidato.cpf}
                        </p>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User style={{ width: '12px', height: '12px', color: colors.text.tertiary }} />
                        <span style={{
                          fontSize: '12px',
                          color: colors.text.secondary,
                          transition: 'color 0.3s ease'
                        }}>
                          Entrevistador: {candidato.entrevistador}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Entrevista Info */}
                  {candidato.dataEntrevista && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        padding: '12px',
                        backgroundColor: `${getStatusColor(candidato.status)}10`,
                        borderRadius: '8px',
                        border: `1px solid ${getStatusColor(candidato.status)}30`
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <CalendarDays style={{ width: '14px', height: '14px', color: getStatusColor(candidato.status) }} />
                          <span style={{
                            fontSize: '13px',
                            fontWeight: '500',
                            color: getStatusColor(candidato.status)
                          }}>
                            Entrevista Realizada
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '12px', color: colors.text.secondary }}>
                            {candidato.dataEntrevista}
                          </span>
                          {candidato.horarioEntrevista && candidato.horarioEntrevista !== '00:00:00' && (
                            <span style={{ fontSize: '12px', color: colors.text.secondary }}>
                              às {candidato.horarioEntrevista}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contato */}
                  {(candidato.celular || candidato.email) && (
                    <div style={{ marginBottom: '16px', display: 'grid', gap: '8px' }}>
                      {candidato.celular && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Phone style={{ width: '14px', height: '14px', color: colors.text.tertiary, flexShrink: 0 }} />
                          <span style={{
                            fontSize: '13px',
                            color: colors.text.primary,
                            transition: 'color 0.3s ease'
                          }}>
                            {candidato.celular}
                          </span>
                        </div>
                      )}
                      {candidato.email && (
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
                            {candidato.email}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Unidade e Plano */}
                  {(candidato.unidade || candidato.plano) && (
                    <div style={{ marginBottom: '16px', display: 'grid', gap: '8px' }}>
                      {candidato.unidade && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <MapPin style={{ width: '14px', height: '14px', color: colors.text.tertiary, flexShrink: 0, marginTop: '2px' }} />
                          <span style={{
                            fontSize: '12px',
                            color: colors.text.secondary,
                            transition: 'color 0.3s ease',
                            lineHeight: '1.3'
                          }}>
                            {candidato.unidade}
                          </span>
                        </div>
                      )}
                      {candidato.plano && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CreditCard style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                          <span style={{
                            fontSize: '13px',
                            color: colors.text.primary,
                            transition: 'color 0.3s ease'
                          }}>
                            {candidato.plano}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    {candidato.status === 'Para entrevistar' && (
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
                          Aprovar
                        </button>
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
                          <Calendar style={{ width: '14px', height: '14px' }} />
                          Agendar
                        </button>
                      </>
                    )}
                    {candidato.status === 'Aprovado' && (
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
                        Cadastro: {candidato.dataCadastro.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
                Mostrando página {currentPage} de {totalPages}. Total de registros é de {filteredCandidatos.length}.
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
