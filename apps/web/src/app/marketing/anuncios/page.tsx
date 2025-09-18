"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Megaphone, 
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
  PlayCircle,
  PauseCircle,
  Target,
  BarChart3,
  Clock
} from "lucide-react"

interface Anuncio {
  id: string
  titulo: string
  descricao: string
  patrocinador: {
    nome: string
    empresa: string
    email: string
    telefone: string
  }
  campanha: {
    tipo: 'banner' | 'post' | 'newsletter' | 'evento'
    categoria: 'produto' | 'servico' | 'institucional' | 'evento'
    periodo: {
      inicio: string
      fim: string
    }
    investimento: number
    formaPagamento: 'boleto' | 'cheque' | 'pix' | 'cartao'
  }
  performance: {
    impressoes: number
    cliques: number
    conversoes: number
    ctr: number
    roi: number
  }
  status: 'ativo' | 'pausado' | 'finalizado' | 'pendente'
  dataCriacao: string
  ultimaAtualizacao: string
}

export default function AnunciosPlataformaPage() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [categoriaFilter, setCategoriaFilter] = useState('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockAnuncios: Anuncio[] = [
      {
        id: '1',
        titulo: 'Campanha Produtos Financeiros',
        descricao: 'Divulgação de serviços financeiros para empresários',
        patrocinador: {
          nome: 'Wallace Silva Francisco Fernandes',
          empresa: 'Consultoria Financeira WSF',
          email: 'wallace@wsf.com.br',
          telefone: '(21) 98765-4321'
        },
        campanha: {
          tipo: 'banner',
          categoria: 'servico',
          periodo: {
            inicio: '05/08/2024',
            fim: '09/08/2024'
          },
          investimento: 5000.00,
          formaPagamento: 'boleto'
        },
        performance: {
          impressoes: 15420,
          cliques: 342,
          conversoes: 28,
          ctr: 2.2,
          roi: 145.5
        },
        status: 'finalizado',
        dataCriacao: '28/07/2024',
        ultimaAtualizacao: '10/08/2024'
      },
      {
        id: '2',
        titulo: 'Newsletter Setembro - Dicas Empresariais',
        descricao: 'Conteúdo patrocinado na newsletter mensal',
        patrocinador: {
          nome: 'Wallace Silva Francisco Fernandes',
          empresa: 'Consultoria Financeira WSF',
          email: 'wallace@wsf.com.br',
          telefone: '(21) 98765-4321'
        },
        campanha: {
          tipo: 'newsletter',
          categoria: 'institucional',
          periodo: {
            inicio: '27/09/2024',
            fim: '30/09/2024'
          },
          investimento: 100.00,
          formaPagamento: 'cheque'
        },
        performance: {
          impressoes: 2340,
          cliques: 89,
          conversoes: 12,
          ctr: 3.8,
          roi: 120.0
        },
        status: 'ativo',
        dataCriacao: '20/09/2024',
        ultimaAtualizacao: '28/09/2024'
      }
    ]

    setTimeout(() => {
      setAnuncios(mockAnuncios)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return '#10b981'
      case 'pausado': return '#f59e0b'
      case 'finalizado': return '#6b7280'
      case 'pendente': return '#3b82f6'
      default: return '#64748b'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo': return 'Ativo'
      case 'pausado': return 'Pausado'
      case 'finalizado': return 'Finalizado'
      case 'pendente': return 'Pendente'
      default: return 'Desconhecido'
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'banner': return <Target style={{ width: '16px', height: '16px' }} />
      case 'post': return <Megaphone style={{ width: '16px', height: '16px' }} />
      case 'newsletter': return <Users style={{ width: '16px', height: '16px' }} />
      case 'evento': return <Calendar style={{ width: '16px', height: '16px' }} />
      default: return <Megaphone style={{ width: '16px', height: '16px' }} />
    }
  }

  const filteredAnuncios = anuncios.filter(anuncio => {
    const matchesSearch = anuncio.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anuncio.patrocinador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anuncio.patrocinador.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || anuncio.status === statusFilter
    const matchesTipo = tipoFilter === 'todos' || anuncio.campanha.tipo === tipoFilter
    const matchesCategoria = categoriaFilter === 'todos' || anuncio.campanha.categoria === categoriaFilter
    
    return matchesSearch && matchesStatus && matchesTipo && matchesCategoria
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredAnuncios.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAnuncios = filteredAnuncios.slice(startIndex, startIndex + itemsPerPage)

  // Stats calculations
  const totalInvestimento = anuncios.reduce((acc, a) => acc + a.campanha.investimento, 0)
  const totalImpressoes = anuncios.reduce((acc, a) => acc + a.performance.impressoes, 0)
  const totalCliques = anuncios.reduce((acc, a) => acc + a.performance.cliques, 0)
  const mediaCTR = anuncios.length > 0 ? anuncios.reduce((acc, a) => acc + a.performance.ctr, 0) / anuncios.length : 0

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
              Anúncios Plataforma
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
              Nova Campanha
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gerencie campanhas publicitárias e patrocínios
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
              <Megaphone style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Campanhas</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{anuncios.length}</div>
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
              <Eye style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Impressões</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {totalImpressoes.toLocaleString()}
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
              <TrendingUp style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>CTR Médio</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {mediaCTR.toFixed(1)}%
            </div>
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
                <option value="pausado">Pausado</option>
                <option value="finalizado">Finalizado</option>
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
                <option value="banner">Banner</option>
                <option value="post">Post</option>
                <option value="newsletter">Newsletter</option>
                <option value="evento">Evento</option>
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
                Categoria
              </label>
              <select
                value={categoriaFilter}
                onChange={(e) => setCategoriaFilter(e.target.value)}
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
                <option value="produto">Produto</option>
                <option value="servico">Serviço</option>
                <option value="institucional">Institucional</option>
                <option value="evento">Evento</option>
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
                  placeholder="Título, patrocinador..."
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

        {/* Campaigns Grid */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <Megaphone style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando campanhas...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {paginatedAnuncios.map((anuncio) => (
                <div
                  key={anuncio.id}
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
                        {getTipoIcon(anuncio.campanha.tipo)}
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: colors.text.primary,
                          margin: 0,
                          transition: 'color 0.3s ease'
                        }}>
                          {anuncio.titulo}
                        </h3>
                      </div>
                      <p style={{
                        fontSize: '14px',
                        color: colors.text.secondary,
                        margin: 0,
                        lineHeight: '1.4',
                        transition: 'color 0.3s ease'
                      }}>
                        {anuncio.descricao}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: `${getStatusColor(anuncio.status)}15`,
                        color: getStatusColor(anuncio.status)
                      }}>
                        {getStatusText(anuncio.status)}
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

                  {/* Patrocinador */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Users style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {anuncio.patrocinador.nome}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: colors.text.secondary,
                      margin: 0,
                      marginLeft: '22px',
                      transition: 'color 0.3s ease'
                    }}>
                      {anuncio.patrocinador.empresa}
                    </p>
                  </div>

                  {/* Performance Stats */}
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
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {anuncio.performance.impressoes.toLocaleString()}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Impressões
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
                        {anuncio.performance.cliques}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Cliques
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
                        color: '#10b981'
                      }}>
                        {anuncio.performance.ctr.toFixed(1)}%
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        CTR
                      </div>
                    </div>
                  </div>

                  {/* Campanha Info */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <DollarSign style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        R$ {anuncio.campanha.investimento.toLocaleString()}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        via {anuncio.campanha.formaPagamento}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '13px',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {anuncio.campanha.periodo.inicio} - {anuncio.campanha.periodo.fim}
                      </span>
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
                      <BarChart3 style={{ width: '14px', height: '14px' }} />
                      Relatórios
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
                      <Clock style={{ width: '12px', height: '12px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '11px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Atualizado: {anuncio.ultimaAtualizacao}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      color: '#10b981'
                    }}>
                      ROI: {anuncio.performance.roi}%
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
                Mostrando página {currentPage} de {totalPages}. Total de registros é de {filteredAnuncios.length}.
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
