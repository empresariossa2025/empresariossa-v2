"use client"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { ProMembersSidebar } from "@/components/layout/pro-members-sidebar"
import { SimpleEnhancedHeader } from "@/components/layout/simple-enhanced-header"
import {
  History,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  UserPlus,
  DollarSign,
  Award,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye
} from "lucide-react"

interface TransacaoPontos {
  id: string
  data: string
  hora: string
  categoria: 'ATTENDANCE' | 'MEETING' | 'VISITOR' | 'RECOMMENDATION' | 'BUSINESS_DEAL' | 'PENALTY' | 'BONUS'
  tipo: 'EARNED' | 'PENALTY' | 'BONUS'
  descricao: string
  pontos: number
  detalhes?: string
  evento?: string
  responsavel?: string
  status: 'Confirmado' | 'Pendente' | 'Cancelado'
}

export default function HistoricoPage() {
  const [transacoes, setTransacoes] = useState<TransacaoPontos[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('todas')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [periodoFilter, setPeriodoFilter] = useState('todos') // todos, mes, trimestre, ano
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTransacao, setSelectedTransacao] = useState<TransacaoPontos | null>(null)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockTransacoes: TransacaoPontos[] = [
      {
        id: '1',
        data: '20/09/2025',
        hora: '14:30',
        categoria: 'ATTENDANCE',
        tipo: 'EARNED',
        descricao: 'Presença no Workshop IA para Empresas',
        pontos: 30,
        detalhes: 'Participação confirmada no evento de capacitação',
        evento: 'Workshop IA para Empresas',
        responsavel: 'Sistema Automático',
        status: 'Confirmado'
      },
      {
        id: '2',
        data: '18/09/2025',
        hora: '10:15',
        categoria: 'MEETING',
        tipo: 'EARNED',
        descricao: 'Reunião Individual com Roberto Mendes',
        pontos: 30,
        detalhes: 'Reunião de networking individual realizada',
        responsavel: 'Roberto Mendes Costa',
        status: 'Confirmado'
      },
      {
        id: '3',
        data: '15/09/2025',
        hora: '16:45',
        categoria: 'RECOMMENDATION',
        tipo: 'BONUS',
        descricao: 'Bonus: Ana Silva Santos tornou-se membro ativo',
        pontos: 100,
        detalhes: 'Bonus por indicação que resultou em novo membro',
        responsavel: 'Administração',
        status: 'Confirmado'
      },
      {
        id: '4',
        data: '15/09/2025',
        hora: '09:20',
        categoria: 'RECOMMENDATION',
        tipo: 'EARNED',
        descricao: 'Indicação: Ana Silva Santos',
        pontos: 30,
        detalhes: 'Pontos base por indicação de novo membro',
        responsavel: 'Sistema Automático',
        status: 'Confirmado'
      },
      {
        id: '5',
        data: '10/09/2025',
        hora: '11:30',
        categoria: 'BUSINESS_DEAL',
        tipo: 'EARNED',
        descricao: 'Negócio Fechado: Consultoria Digital - R$ 45.000',
        pontos: 25,
        detalhes: 'Venda de serviços de consultoria',
        responsavel: 'Ana Silva Santos',
        status: 'Confirmado'
      },
      {
        id: '6',
        data: '08/09/2025',
        hora: '19:15',
        categoria: 'VISITOR',
        tipo: 'EARNED',
        descricao: 'Visitante: Marina Costa - Jantar Networking',
        pontos: 30,
        detalhes: 'Visitante trouxe para evento de networking',
        evento: 'Jantar de Negócios',
        responsavel: 'Sistema Automático',
        status: 'Confirmado'
      },
      {
        id: '7',
        data: '05/09/2025',
        hora: '12:00',
        categoria: 'BUSINESS_DEAL',
        tipo: 'EARNED',
        descricao: 'Compra: Sistema de Gestão - R$ 25.000',
        pontos: 50,
        detalhes: 'Compra de software através da rede',
        responsavel: 'Roberto Mendes Costa',
        status: 'Confirmado'
      },
      {
        id: '8',
        data: '01/09/2025',
        hora: '15:45',
        categoria: 'MEETING',
        tipo: 'EARNED',
        descricao: 'Reunião Individual com Mariana Oliveira',
        pontos: 30,
        detalhes: 'Reunião de networking individual',
        responsavel: 'Mariana Oliveira Lima',
        status: 'Confirmado'
      },
      {
        id: '9',
        data: '25/08/2025',
        hora: '13:20',
        categoria: 'ATTENDANCE',
        tipo: 'EARNED',
        descricao: 'Presença no Jantar de Negócios - Barra',
        pontos: 30,
        detalhes: 'Participação no evento de networking',
        evento: 'Jantar de Negócios Empresários S.A',
        responsavel: 'Sistema Automático',
        status: 'Confirmado'
      },
      {
        id: '10',
        data: '20/08/2025',
        hora: '18:30',
        categoria: 'ATTENDANCE',
        tipo: 'PENALTY',
        descricao: 'Penalidade: Ausência sem justificativa',
        pontos: -30,
        detalhes: 'Falta não justificada no evento obrigatório',
        evento: 'Reunião Mensal Obrigatória',
        responsavel: 'Administração',
        status: 'Confirmado'
      },
      {
        id: '11',
        data: '15/08/2025',
        hora: '14:00',
        categoria: 'VISITOR',
        tipo: 'EARNED',
        descricao: 'Visitante: Carlos Ferreira - Workshop',
        pontos: 30,
        detalhes: 'Visitante trouxe para evento de capacitação',
        evento: 'Workshop de Vendas',
        responsavel: 'Sistema Automático',
        status: 'Confirmado'
      },
      {
        id: '12',
        data: '10/08/2025',
        hora: '09:45',
        categoria: 'BONUS',
        tipo: 'BONUS',
        descricao: 'Bonus Especial: Meta Trimestral Atingida',
        pontos: 50,
        detalhes: 'Bonus por atingir meta de participação trimestral',
        responsavel: 'Administração',
        status: 'Confirmado'
      }
    ]

    setTimeout(() => {
      setTransacoes(mockTransacoes)
      setLoading(false)
    }, 1000)
  }, [])

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'ATTENDANCE': return '#3b82f6'
      case 'MEETING': return '#10b981'
      case 'VISITOR': return '#f59e0b'
      case 'RECOMMENDATION': return '#8b5cf6'
      case 'BUSINESS_DEAL': return '#ef4444'
      case 'PENALTY': return '#dc2626'
      case 'BONUS': return '#059669'
      default: return '#64748b'
    }
  }

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'ATTENDANCE': return Calendar
      case 'MEETING': return Users
      case 'VISITOR': return UserPlus
      case 'RECOMMENDATION': return Star
      case 'BUSINESS_DEAL': return DollarSign
      case 'PENALTY': return TrendingDown
      case 'BONUS': return Award
      default: return Clock
    }
  }

  const getTipoColor = (tipo: string, pontos: number) => {
    if (pontos > 0) return '#10b981'
    if (pontos < 0) return '#ef4444'
    return '#64748b'
  }

  const filteredTransacoes = transacoes.filter(transacao => {
    const matchesSearch = 
      transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transacao.detalhes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transacao.evento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transacao.responsavel?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategoria = categoriaFilter === 'todas' || transacao.categoria === categoriaFilter
    const matchesTipo = tipoFilter === 'todos' || transacao.tipo === tipoFilter
    
    // Filtro de período (simplificado - em produção seria baseado em datas reais)
    let matchesPeriodo = true
    if (periodoFilter !== 'todos') {
      // Lógica de período seria implementada aqui baseada nas datas reais
      matchesPeriodo = true
    }
    
    return matchesSearch && matchesCategoria && matchesTipo && matchesPeriodo
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredTransacoes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTransacoes = filteredTransacoes.slice(startIndex, startIndex + itemsPerPage)

  // Estatísticas
  const totalPontos = transacoes.reduce((acc, t) => acc + t.pontos, 0)
  const pontosGanhos = transacoes.filter(t => t.pontos > 0).reduce((acc, t) => acc + t.pontos, 0)
  const pontosPerdidos = Math.abs(transacoes.filter(t => t.pontos < 0).reduce((acc, t) => acc + t.pontos, 0))
  const totalTransacoes = transacoes.length

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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundImage: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
                }}>
                  <History style={{ color: 'white', width: '24px', height: '24px' }} />
                </div>
                <div>
                  <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Histórico de Pontos
                  </h1>
                  <p style={{
                    color: colors.text.secondary,
                    margin: 0,
                    fontSize: '16px'
                  }}>
                    Acompanhe todas suas transações de pontos
                  </p>
                </div>
              </div>

              <button
                onClick={() => {/* Exportar histórico */}}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: '#8b5cf6',
                  border: `1px solid #8b5cf6`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Download size={16} />
                Exportar
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {totalPontos.toLocaleString('pt-BR')}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Saldo Total
                  </div>
                </div>
                <Award size={28} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>
                    +{pontosGanhos.toLocaleString('pt-BR')}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Pontos Ganhos
                  </div>
                </div>
                <TrendingUp size={28} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>
                    -{pontosPerdidos.toLocaleString('pt-BR')}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Pontos Perdidos
                  </div>
                </div>
                <TrendingDown size={28} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {totalTransacoes}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Transações
                  </div>
                </div>
                <History size={28} style={{ opacity: 0.8 }} />
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
                  placeholder="Buscar por descrição, evento, responsável..."
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
                value={categoriaFilter}
                onChange={(e) => setCategoriaFilter(e.target.value)}
                style={{
                  padding: '12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.secondary,
                  color: colors.text.primary,
                  fontSize: '14px'
                }}
              >
                <option value="todas">Todas as categorias</option>
                <option value="ATTENDANCE">Presença</option>
                <option value="MEETING">Reuniões</option>
                <option value="VISITOR">Visitantes</option>
                <option value="RECOMMENDATION">Indicações</option>
                <option value="BUSINESS_DEAL">Negócios</option>
                <option value="BONUS">Bonus</option>
                <option value="PENALTY">Penalidades</option>
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
                <option value="EARNED">Ganhos</option>
                <option value="PENALTY">Penalidades</option>
                <option value="BONUS">Bonus</option>
              </select>

              <select
                value={periodoFilter}
                onChange={(e) => setPeriodoFilter(e.target.value)}
                style={{
                  padding: '12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.secondary,
                  color: colors.text.primary,
                  fontSize: '14px'
                }}
              >
                <option value="todos">Todos os períodos</option>
                <option value="mes">Este mês</option>
                <option value="trimestre">Este trimestre</option>
                <option value="ano">Este ano</option>
              </select>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px 0',
              borderTop: `1px solid ${colors.border.primary}`,
              color: colors.text.secondary,
              fontSize: '14px'
            }}>
              {filteredTransacoes.length} transações encontradas
            </div>
          </div>

          {/* Transactions List */}
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '64px',
              color: colors.text.secondary
            }}>
              Carregando histórico...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '12px',
              marginBottom: '32px'
            }}>
              {currentTransacoes.map((transacao) => {
                const CategoriaIcon = getCategoriaIcon(transacao.categoria)
                
                return (
                  <div key={transacao.id} style={{
                    ...getCardStyle(),
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      {/* Icon */}
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: `${getCategoriaColor(transacao.categoria)}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CategoriaIcon 
                          size={24} 
                          style={{ color: getCategoriaColor(transacao.categoria) }} 
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: colors.text.primary,
                          marginBottom: '4px'
                        }}>
                          {transacao.descricao}
                        </div>
                        
                        <div style={{
                          fontSize: '14px',
                          color: colors.text.secondary,
                          marginBottom: '4px'
                        }}>
                          {transacao.detalhes}
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          fontSize: '13px',
                          color: colors.text.tertiary
                        }}>
                          <span>{transacao.data} às {transacao.hora}</span>
                          {transacao.responsavel && (
                            <span>• Por: {transacao.responsavel}</span>
                          )}
                          {transacao.evento && (
                            <span>• {transacao.evento}</span>
                          )}
                        </div>
                      </div>

                      {/* Points */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: getTipoColor(transacao.tipo, transacao.pontos),
                          marginBottom: '4px'
                        }}>
                          {transacao.pontos > 0 ? '+' : ''}{transacao.pontos} pts
                        </div>
                        
                        <div style={{
                          fontSize: '12px',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          backgroundColor: transacao.status === 'Confirmado' ? '#10b98120' : '#f59e0b20',
                          color: transacao.status === 'Confirmado' ? '#10b981' : '#f59e0b'
                        }}>
                          {transacao.status}
                        </div>
                      </div>

                      {/* Action */}
                      <button
                        onClick={() => setSelectedTransacao(transacao)}
                        style={{
                          padding: '8px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          color: colors.text.tertiary,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Eye size={16} />
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

          {/* Modal de Detalhes */}
          {selectedTransacao && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}>
              <div style={{
                backgroundColor: colors.bg.primary,
                borderRadius: '12px',
                padding: '32px',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '24px'
                }}>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Detalhes da Transação
                  </h2>
                  <button
                    onClick={() => setSelectedTransacao(null)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: colors.text.secondary,
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <strong style={{ color: colors.text.primary }}>Descrição:</strong>
                    <p style={{ margin: '4px 0 0 0', color: colors.text.secondary }}>
                      {selectedTransacao.descricao}
                    </p>
                  </div>

                  <div>
                    <strong style={{ color: colors.text.primary }}>Detalhes:</strong>
                    <p style={{ margin: '4px 0 0 0', color: colors.text.secondary }}>
                      {selectedTransacao.detalhes}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <strong style={{ color: colors.text.primary }}>Data:</strong>
                      <p style={{ margin: '4px 0 0 0', color: colors.text.secondary }}>
                        {selectedTransacao.data}
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: colors.text.primary }}>Hora:</strong>
                      <p style={{ margin: '4px 0 0 0', color: colors.text.secondary }}>
                        {selectedTransacao.hora}
                      </p>
                    </div>
                  </div>

                  <div>
                    <strong style={{ color: colors.text.primary }}>Pontos:</strong>
                    <p style={{
                      margin: '4px 0 0 0',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: getTipoColor(selectedTransacao.tipo, selectedTransacao.pontos)
                    }}>
                      {selectedTransacao.pontos > 0 ? '+' : ''}{selectedTransacao.pontos} pontos
                    </p>
                  </div>

                  {selectedTransacao.evento && (
                    <div>
                      <strong style={{ color: colors.text.primary }}>Evento:</strong>
                      <p style={{ margin: '4px 0 0 0', color: colors.text.secondary }}>
                        {selectedTransacao.evento}
                      </p>
                    </div>
                  )}

                  {selectedTransacao.responsavel && (
                    <div>
                      <strong style={{ color: colors.text.primary }}>Responsável:</strong>
                      <p style={{ margin: '4px 0 0 0', color: colors.text.secondary }}>
                        {selectedTransacao.responsavel}
                      </p>
                    </div>
                  )}

                  <div>
                    <strong style={{ color: colors.text.primary }}>Status:</strong>
                    <span style={{
                      marginLeft: '8px',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      backgroundColor: selectedTransacao.status === 'Confirmado' ? '#10b98120' : '#f59e0b20',
                      color: selectedTransacao.status === 'Confirmado' ? '#10b981' : '#f59e0b'
                    }}>
                      {selectedTransacao.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
