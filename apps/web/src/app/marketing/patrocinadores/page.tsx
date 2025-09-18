"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Handshake, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Building,
  User,
  MapPin,
  Phone,
  Mail,
  FileText,
  Star
} from "lucide-react"

interface Patrocinador {
  id: string
  tipo: 'pf' | 'pj'
  nome: string
  documento: string
  empresa?: string
  contato: {
    telefone: string
    email: string
    responsavel?: string
  }
  endereco: {
    cidade: string
    estado: string
    cep: string
    endereco: string
  }
  financeiro: {
    responsavel: string
    totalInvestido: number
    contratoAtivo: boolean
    ultimoPagamento: string
  }
  parceria: {
    nivel: 'bronze' | 'prata' | 'ouro' | 'platinum'
    dataInicio: string
    dataFim?: string
    tiposParceria: string[]
    beneficios: string[]
  }
  historico: {
    totalCampanhas: number
    totalROI: number
    avaliacaoMedia: number
  }
  status: 'ativo' | 'inativo' | 'suspenso' | 'pendente'
  dataCadastro: string
  ultimaAtualizacao: string
}

export default function PatrocinadoresPage() {
  const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [nivelFilter, setNivelFilter] = useState('todos')
  const [cidadeFilter, setCidadeFilter] = useState('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockPatrocinadores: Patrocinador[] = [
      {
        id: '3',
        tipo: 'pf',
        nome: 'APVS BRASIL REGIONAL PARQUE OLIMPICO 01',
        documento: '056.320.987-36',
        contato: {
          telefone: '(21) 98765-4321',
          email: 'wallace@apvsbrasil.com.br',
          responsavel: 'Wallace Silva'
        },
        endereco: {
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
          cep: '22775-001',
          endereco: 'Parque Olímpico, Barra da Tijuca'
        },
        financeiro: {
          responsavel: 'Wallace',
          totalInvestido: 25000.00,
          contratoAtivo: true,
          ultimoPagamento: '15/09/2024'
        },
        parceria: {
          nivel: 'ouro',
          dataInicio: '28/04/2024',
          tiposParceria: ['Eventos', 'Marketing Digital', 'Networking'],
          beneficios: ['Logo em eventos', 'Stand preferencial', 'Newsletter mensal']
        },
        historico: {
          totalCampanhas: 8,
          totalROI: 145.2,
          avaliacaoMedia: 4.8
        },
        status: 'ativo',
        dataCadastro: '28/04/2024',
        ultimaAtualizacao: '15/09/2024'
      },
      {
        id: '2',
        tipo: 'pf',
        nome: 'Wallace Silva Francisco Fernandes',
        documento: '056.320.987-36',
        contato: {
          telefone: '(21) 99888-7777',
          email: 'wallace.fernandes@wsf.com.br',
          responsavel: 'Wallace Silva'
        },
        endereco: {
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
          cep: '22640-102',
          endereco: 'Av. das Américas, 3434'
        },
        financeiro: {
          responsavel: 'Wallace',
          totalInvestido: 12500.00,
          contratoAtivo: true,
          ultimoPagamento: '10/09/2024'
        },
        parceria: {
          nivel: 'prata',
          dataInicio: '27/04/2024',
          tiposParceria: ['Consultoria', 'Workshops'],
          beneficios: ['Palestras mensais', 'Consultoria grátis']
        },
        historico: {
          totalCampanhas: 5,
          totalROI: 128.7,
          avaliacaoMedia: 4.5
        },
        status: 'ativo',
        dataCadastro: '27/04/2024',
        ultimaAtualizacao: '10/09/2024'
      },
      {
        id: '6',
        tipo: 'pj',
        nome: 'WALLACE SILVA FRANCISCO FERNANDES',
        documento: '12.345.678/0001-90',
        empresa: 'WSF Consultoria Empresarial Ltda',
        contato: {
          telefone: '(21) 3555-9999',
          email: 'contato@wsfconsultoria.com.br',
          responsavel: 'Wallace Silva Francisco Fernandes'
        },
        endereco: {
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
          cep: '22071-900',
          endereco: 'Rua da Assembléia, 10 - Centro'
        },
        financeiro: {
          responsavel: 'WALLACE SILVA FRANCISCO FERNANDES',
          totalInvestido: 45000.00,
          contratoAtivo: true,
          ultimoPagamento: '01/09/2024'
        },
        parceria: {
          nivel: 'platinum',
          dataInicio: '26/09/2024',
          tiposParceria: ['Patrocínio Master', 'Eventos Exclusivos', 'Consultoria Premium'],
          beneficios: ['Naming rights eventos', 'Área VIP', 'Consultoria ilimitada', 'Prioridade máxima']
        },
        historico: {
          totalCampanhas: 12,
          totalROI: 167.3,
          avaliacaoMedia: 4.9
        },
        status: 'ativo',
        dataCadastro: '26/09/2024',
        ultimaAtualizacao: '01/09/2024'
      }
    ]

    setTimeout(() => {
      setPatrocinadores(mockPatrocinadores)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return '#10b981'
      case 'inativo': return '#6b7280'
      case 'suspenso': return '#ef4444'
      case 'pendente': return '#f59e0b'
      default: return '#64748b'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo': return 'Ativo'
      case 'inativo': return 'Inativo'
      case 'suspenso': return 'Suspenso'
      case 'pendente': return 'Pendente'
      default: return 'Desconhecido'
    }
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'bronze': return '#cd7f32'
      case 'prata': return '#c0c0c0'
      case 'ouro': return '#ffd700'
      case 'platinum': return '#e5e4e2'
      default: return '#64748b'
    }
  }

  const getNivelText = (nivel: string) => {
    switch (nivel) {
      case 'bronze': return 'Bronze'
      case 'prata': return 'Prata'
      case 'ouro': return 'Ouro'
      case 'platinum': return 'Platinum'
      default: return 'Básico'
    }
  }

  const filteredPatrocinadores = patrocinadores.filter(patrocinador => {
    const matchesSearch = patrocinador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patrocinador.documento.includes(searchTerm) ||
                         (patrocinador.empresa && patrocinador.empresa.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTipo = tipoFilter === 'todos' || patrocinador.tipo === tipoFilter
    const matchesStatus = statusFilter === 'todos' || patrocinador.status === statusFilter
    const matchesNivel = nivelFilter === 'todos' || patrocinador.parceria.nivel === nivelFilter
    const matchesCidade = cidadeFilter === 'todos' || patrocinador.endereco.cidade === cidadeFilter
    
    return matchesSearch && matchesTipo && matchesStatus && matchesNivel && matchesCidade
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredPatrocinadores.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPatrocinadores = filteredPatrocinadores.slice(startIndex, startIndex + itemsPerPage)

  // Stats calculations - definidas una sola volta
  const totalInvestimento = patrocinadores.reduce((acc, p) => acc + p.financeiro.totalInvestido, 0)
  const totalCampanhas = patrocinadores.reduce((acc, p) => acc + p.historico.totalCampanhas, 0)
  const mediaROI = patrocinadores.length > 0 ? patrocinadores.reduce((acc, p) => acc + p.historico.totalROI, 0) / patrocinadores.length : 0
  const ativosCount = patrocinadores.filter(p => p.status === 'ativo').length

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
              Patrocinadores
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
              Novo Patrocinador
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gerencie parcerias e patrocínios empresariais
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
              <Handshake style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Patrocinadores</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{patrocinadores.length}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>{ativosCount} ativos</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <DollarSign style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Investimento Total</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              R$ {totalInvestimento.toLocaleString()}
            </div>
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
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Campanhas</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {totalCampanhas}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Star style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>ROI Médio</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {mediaROI.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          ...getCardStyle(),
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', alignItems: 'end' }}>
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
                <option value="pf">Pessoa Física</option>
                <option value="pj">Pessoa Jurídica</option>
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
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="suspenso">Suspenso</option>
                <option value="pendente">Pendente</option>
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
                Nível
              </label>
              <select
                value={nivelFilter}
                onChange={(e) => setNivelFilter(e.target.value)}
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
                <option value="bronze">Bronze</option>
                <option value="prata">Prata</option>
                <option value="ouro">Ouro</option>
                <option value="platinum">Platinum</option>
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
                Cidade
              </label>
              <select
                value={cidadeFilter}
                onChange={(e) => setCidadeFilter(e.target.value)}
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
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="São Paulo">São Paulo</option>
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
                  placeholder="Nome, documento..."
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

        {/* Patrocinadores Grid */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <Handshake style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando patrocinadores...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {paginatedPatrocinadores.map((patrocinador) => (
                <div
                  key={patrocinador.id}
                  style={{
                    ...getCardStyle(),
                    padding: '24px',
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
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        {patrocinador.tipo === 'pf' ? (
                          <User style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                        ) : (
                          <Building style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                        )}
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: colors.text.primary,
                          margin: 0,
                          transition: 'color 0.3s ease'
                        }}>
                          {patrocinador.nome}
                        </h3>
                      </div>
                      <p style={{
                        fontSize: '12px',
                        color: colors.text.secondary,
                        margin: 0,
                        fontFamily: 'monospace',
                        transition: 'color 0.3s ease'
                      }}>
                        {patrocinador.tipo.toUpperCase()}: {patrocinador.documento}
                      </p>
                      {patrocinador.empresa && (
                        <p style={{
                          fontSize: '13px',
                          color: colors.text.secondary,
                          margin: '2px 0 0 0',
                          transition: 'color 0.3s ease'
                        }}>
                          {patrocinador.empresa}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: `${getStatusColor(patrocinador.status)}15`,
                        color: getStatusColor(patrocinador.status)
                      }}>
                        {getStatusText(patrocinador.status)}
                      </span>
                      <button style={{
                        padding: '6px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <MoreVertical style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                      </button>
                    </div>
                  </div>

                  {/* Nível de Parceria */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Star style={{ width: '16px', height: '16px', color: getNivelColor(patrocinador.parceria.nivel) }} />
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: `${getNivelColor(patrocinador.parceria.nivel)}20`,
                        color: getNivelColor(patrocinador.parceria.nivel),
                        textTransform: 'uppercase'
                      }}>
                        {getNivelText(patrocinador.parceria.nivel)}
                      </span>
                    </div>
                  </div>

                  {/* Contato */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Phone style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '13px',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {patrocinador.contato.telefone}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Mail style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '13px',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {patrocinador.contato.email}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '13px',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {patrocinador.endereco.cidade} - {patrocinador.endereco.estado}
                      </span>
                    </div>
                  </div>

                  {/* Stats Financeiras */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                    <div style={{
                      padding: '12px',
                      backgroundColor: colors.bg.tertiary,
                      borderRadius: '8px',
                      textAlign: 'center',
                      transition: 'background-color 0.3s ease'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#10b981'
                      }}>
                        R$ {(patrocinador.financeiro.totalInvestido / 1000).toFixed(0)}K
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Investido
                      </div>
                    </div>

                    <div style={{
                      padding: '12px',
                      backgroundColor: colors.bg.tertiary,
                      borderRadius: '8px',
                      textAlign: 'center',
                      transition: 'background-color 0.3s ease'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {patrocinador.historico.totalCampanhas}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Campanhas
                      </div>
                    </div>

                    <div style={{
                      padding: '12px',
                      backgroundColor: colors.bg.tertiary,
                      borderRadius: '8px',
                      textAlign: 'center',
                      transition: 'background-color 0.3s ease'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#f59e0b'
                      }}>
                        {patrocinador.historico.totalROI.toFixed(0)}%
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        ROI
                      </div>
                    </div>
                  </div>

                  {/* Benefícios */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {patrocinador.parceria.beneficios.slice(0, 3).map((beneficio, index) => (
                        <span
                          key={index}
                          style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            backgroundColor: `${colors.brand.primary}15`,
                            color: colors.brand.primary,
                            border: `1px solid ${colors.brand.primary}30`
                          }}
                        >
                          {beneficio}
                        </span>
                      ))}
                      {patrocinador.parceria.beneficios.length > 3 && (
                        <span style={{
                          fontSize: '11px',
                          color: colors.text.secondary,
                          padding: '2px 8px'
                        }}>
                          +{patrocinador.parceria.beneficios.length - 3} mais
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
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
                      <FileText style={{ width: '14px', height: '14px' }} />
                      Contratos
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
                      <Edit3 style={{ width: '14px', height: '14px' }} />
                      Editar
                    </button>
                  </div>

                  {/* Footer */}
                  <div style={{ 
                    marginTop: '16px', 
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
                        Parceria desde: {patrocinador.parceria.dataInicio}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      color: '#f59e0b'
                    }}>
                      ⭐ {patrocinador.historico.avaliacaoMedia.toFixed(1)}
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
                Mostrando página {currentPage} de {totalPages}. Total de registros é de {filteredPatrocinadores.length}.
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
