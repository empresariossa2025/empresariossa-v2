"use client"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { ProMembersSidebar } from "@/components/layout/pro-members-sidebar"
import { SimpleEnhancedHeader } from "@/components/layout/simple-enhanced-header"
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  Eye,
  DollarSign,
  TrendingUp,
  Calendar,
  User,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Target,
  HandshakeIcon,
  Users
} from "lucide-react"

interface Negocio {
  id: string
  tipo: 'Compra' | 'Venda' | 'Parceria' | 'Troca de Serviços'
  titulo: string
  descricao: string
  valor?: number
  moeda: string
  empresa: string
  contato: string
  telefone: string
  email: string
  status: 'Proposto' | 'Em Negociação' | 'Fechado' | 'Cancelado'
  dataInicio: string
  dataFechamento?: string
  categoria: string
  observacoes?: string
  pontosGanhos: number
  parceiro?: string
}

export default function NegociosPage() {
  const [negocios, setNegocios] = useState<Negocio[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedNegocio, setSelectedNegocio] = useState<Negocio | null>(null)
  const [showNewNegocio, setShowNewNegocio] = useState(false)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockNegocios: Negocio[] = [
      {
        id: '1',
        tipo: 'Venda',
        titulo: 'Consultoria em Transformação Digital',
        descricao: 'Projeto de consultoria para implementação de sistemas digitais.',
        valor: 45000,
        moeda: 'BRL',
        empresa: 'TechCorp Solutions',
        contato: 'Ana Silva Santos',
        telefone: '(21) 99888-7777',
        email: 'ana.silva@techcorp.com',
        status: 'Fechado',
        dataInicio: '15/08/2025',
        dataFechamento: '10/09/2025',
        categoria: 'Consultoria',
        pontosGanhos: 25,
        parceiro: 'Ana Silva Santos'
      },
      {
        id: '2',
        tipo: 'Compra',
        titulo: 'Sistema de Gestão Hospitalar',
        descricao: 'Aquisição de software para gestão completa do consultório.',
        valor: 25000,
        moeda: 'BRL',
        empresa: 'ConsultaMed',
        contato: 'Roberto Mendes Costa',
        telefone: '(21) 98765-4321',
        email: 'roberto@consultamed.com.br',
        status: 'Fechado',
        dataInicio: '20/08/2025',
        dataFechamento: '05/09/2025',
        categoria: 'Software',
        pontosGanhos: 50,
        parceiro: 'Roberto Mendes Costa'
      },
      {
        id: '3',
        tipo: 'Parceria',
        titulo: 'Parceria Estratégica Marketing Digital',
        descricao: 'Colaboração em projetos de marketing digital para clientes mútuos.',
        empresa: 'CreativeHub Agency',
        contato: 'Carlos Ferreira',
        telefone: '(21) 96543-2109',
        email: 'carlos@creativehub.com.br',
        status: 'Em Negociação',
        dataInicio: '01/09/2025',
        categoria: 'Marketing',
        pontosGanhos: 0,
        moeda: 'BRL'
      },
      {
        id: '4',
        tipo: 'Troca de Serviços',
        titulo: 'Troca: Consultoria Financeira por Website',
        descricao: 'Troca de consultoria financeira por desenvolvimento de website institucional.',
        empresa: 'WebDev Solutions',
        contato: 'Marina Costa',
        telefone: '(21) 95432-1098',
        email: 'marina@webdev.com.br',
        status: 'Proposto',
        dataInicio: '15/09/2025',
        categoria: 'Tecnologia',
        pontosGanhos: 0,
        moeda: 'BRL'
      },
      {
        id: '5',
        tipo: 'Venda',
        titulo: 'Auditoria Fiscal Empresarial',
        descricao: 'Serviços de auditoria e regularização fiscal para empresa de médio porte.',
        valor: 18000,
        moeda: 'BRL',
        empresa: 'Construtora EcoBuild',
        contato: 'Mariana Oliveira',
        telefone: '(21) 97654-3210',
        email: 'mariana@ecobuild.com.br',
        status: 'Em Negociação',
        dataInicio: '25/08/2025',
        categoria: 'Contabilidade',
        pontosGanhos: 0,
        parceiro: 'Mariana Oliveira Lima'
      }
    ]
    
    setTimeout(() => {
      setNegocios(mockNegocios)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Proposto': return '#3b82f6'
      case 'Em Negociação': return '#f59e0b'
      case 'Fechado': return '#10b981'
      case 'Cancelado': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Proposto': return Clock
      case 'Em Negociação': return AlertCircle
      case 'Fechado': return CheckCircle
      case 'Cancelado': return AlertCircle
      default: return Clock
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Venda': return '#10b981'
      case 'Compra': return '#3b82f6'
      case 'Parceria': return '#8b5cf6'
      case 'Troca de Serviços': return '#f59e0b'
      default: return '#64748b'
    }
  }

  const filteredNegocios = negocios.filter(negocio => {
    const matchesSearch = 
      negocio.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      negocio.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      negocio.contato.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'todos' || negocio.status === statusFilter
    const matchesTipo = tipoFilter === 'todos' || negocio.tipo === tipoFilter
    
    return matchesSearch && matchesStatus && matchesTipo
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredNegocios.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentNegocios = filteredNegocios.slice(startIndex, startIndex + itemsPerPage)

  // Estatísticas
  const totalNegocios = negocios.length
  const negociosFechados = negocios.filter(n => n.status === 'Fechado').length
  const emNegociacao = negocios.filter(n => n.status === 'Em Negociação').length
  const valorTotal = negocios
    .filter(n => n.status === 'Fechado' && n.valor)
    .reduce((acc, n) => acc + (n.valor || 0), 0)
  const pontosTotal = negocios.reduce((acc, n) => acc + n.pontosGanhos, 0)

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
                  backgroundImage: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
                }}>
                  <Briefcase style={{ color: 'white', width: '24px', height: '24px' }} />
                </div>
                <div>
                  <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Negócios
                  </h1>
                  <p style={{
                    color: colors.text.secondary,
                    margin: 0,
                    fontSize: '16px'
                  }}>
                    Gerencie suas oportunidades de negócio e parcerias
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setShowNewNegocio(true)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
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
                <Plus size={16} />
                Novo Negócio
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
                    {totalNegocios}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Total
                  </div>
                </div>
                <Briefcase size={28} style={{ opacity: 0.8 }} />
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
                    {negociosFechados}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Fechados
                  </div>
                </div>
                <CheckCircle size={28} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {emNegociacao}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Em Andamento
                  </div>
                </div>
                <TrendingUp size={28} style={{ opacity: 0.8 }} />
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
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
                    R$ {valorTotal.toLocaleString('pt-BR')}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Valor Total
                  </div>
                </div>
                <DollarSign size={28} style={{ opacity: 0.8 }} />
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
                    {pontosTotal}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Pontos Ganhos
                  </div>
                </div>
                <Target size={28} style={{ opacity: 0.8 }} />
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
              gridTemplateColumns: '2fr 1fr 1fr',
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
                  placeholder="Buscar por título, empresa, contato..."
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
                <option value="Proposto">Proposto</option>
                <option value="Em Negociação">Em Negociação</option>
                <option value="Fechado">Fechado</option>
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
                <option value="Venda">Venda</option>
                <option value="Compra">Compra</option>
                <option value="Parceria">Parceria</option>
                <option value="Troca de Serviços">Troca de Serviços</option>
              </select>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px 0',
              borderTop: `1px solid ${colors.border.primary}`,
              color: colors.text.secondary,
              fontSize: '14px'
            }}>
              {filteredNegocios.length} negócios encontrados
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '64px',
              color: colors.text.secondary
            }}>
              Carregando negócios...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {currentNegocios.map((negocio) => {
                const StatusIcon = getStatusIcon(negocio.status)
                
                return (
                  <div key={negocio.id} style={{
                    ...getCardStyle(),
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
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '8px'
                        }}>
                          <div style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            backgroundColor: `${getTipoColor(negocio.tipo)}20`,
                            fontSize: '12px',
                            fontWeight: '500',
                            color: getTipoColor(negocio.tipo)
                          }}>
                            {negocio.tipo}
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            backgroundColor: `${getStatusColor(negocio.status)}20`,
                            fontSize: '12px',
                            fontWeight: '500',
                            color: getStatusColor(negocio.status)
                          }}>
                            <StatusIcon size={12} style={{ marginRight: '4px' }} />
                            {negocio.status}
                          </div>
                        </div>
                        
                        <h3 style={{
                          margin: 0,
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: colors.text.primary,
                          lineHeight: '1.4',
                          marginBottom: '4px'
                        }}>
                          {negocio.titulo}
                        </h3>
                        
                        <p style={{
                          margin: 0,
                          fontSize: '13px',
                          color: colors.text.secondary,
                          lineHeight: '1.4',
                          marginBottom: '8px'
                        }}>
                          {negocio.descricao}
                        </p>
                      </div>
                    </div>

                    {/* Informações */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '6px',
                        fontSize: '13px',
                        color: colors.text.secondary
                      }}>
                        <Building2 size={14} style={{ marginRight: '8px' }} />
                        {negocio.empresa}
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '6px',
                        fontSize: '13px',
                        color: colors.text.secondary
                      }}>
                        <User size={14} style={{ marginRight: '8px' }} />
                        {negocio.contato}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '6px',
                        fontSize: '13px',
                        color: colors.text.secondary
                      }}>
                        <Calendar size={14} style={{ marginRight: '8px' }} />
                        Iniciado em {negocio.dataInicio}
                      </div>

                      {negocio.valor && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '6px',
                          fontSize: '13px',
                          color: '#10b981',
                          fontWeight: '600'
                        }}>
                          <DollarSign size={14} style={{ marginRight: '8px' }} />
                          R$ {negocio.valor.toLocaleString('pt-BR')}
                        </div>
                      )}
                    </div>

                    {/* Pontos */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                      padding: '12px',
                      backgroundColor: colors.bg.tertiary,
                      borderRadius: '8px'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: colors.text.primary
                      }}>
                        Pontos Ganhos
                      </span>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: negocio.pontosGanhos > 0 ? '#10b981' : colors.text.tertiary
                      }}>
                        {negocio.pontosGanhos} pts
                      </span>
                    </div>

                    {/* Ação */}
                    <button 
                      onClick={() => setSelectedNegocio(negocio)}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        backgroundColor: 'transparent',
                        color: '#8b5cf6',
                        border: `1px solid #8b5cf6`,
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Eye size={16} />
                      Ver Detalhes
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Modal Placeholder para Novo Negócio */}
          {showNewNegocio && (
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
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: colors.bg.primary,
                borderRadius: '12px',
                padding: '32px',
                maxWidth: '500px',
                width: '90%',
                textAlign: 'center'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: colors.text.primary,
                  marginBottom: '16px'
                }}>
                  Novo Negócio
                </h2>
                <p style={{
                  color: colors.text.secondary,
                  marginBottom: '24px'
                }}>
                  Funcionalidade em desenvolvimento. Em breve você poderá cadastrar novos negócios diretamente pela plataforma.
                </p>
                <button
                  onClick={() => setShowNewNegocio(false)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Fechar
                </button>
              </div>
            </div>
          )}

          {/* Modal de Detalhes */}
          {selectedNegocio && (
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
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '24px'
                }}>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Detalhes do Negócio
                  </h2>
                  <button
                    onClick={() => setSelectedNegocio(null)}
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

                <div style={{ display: 'grid', gap: '20px' }}>
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: colors.text.primary,
                      marginBottom: '12px'
                    }}>
                      Informações Gerais
                    </h3>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Título:</strong> {selectedNegocio.titulo}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Tipo:</strong> {selectedNegocio.tipo}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Status:</strong> {selectedNegocio.status}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Categoria:</strong> {selectedNegocio.categoria}
                      </p>
                      {selectedNegocio.valor && (
                        <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                          <strong>Valor:</strong> R$ {selectedNegocio.valor.toLocaleString('pt-BR')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: colors.text.primary,
                      marginBottom: '12px'
                    }}>
                      Descrição
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: colors.text.secondary,
                      backgroundColor: colors.bg.tertiary,
                      padding: '12px',
                      borderRadius: '8px'
                    }}>
                      {selectedNegocio.descricao}
                    </p>
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: colors.text.primary,
                      marginBottom: '12px'
                    }}>
                      Informações de Contato
                    </h3>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Empresa:</strong> {selectedNegocio.empresa}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Contato:</strong> {selectedNegocio.contato}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Telefone:</strong> {selectedNegocio.telefone}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Email:</strong> {selectedNegocio.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: colors.text.primary,
                      marginBottom: '12px'
                    }}>
                      Cronologia
                    </h3>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Data de início:</strong> {selectedNegocio.dataInicio}
                      </p>
                      {selectedNegocio.dataFechamento && (
                        <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                          <strong>Data de fechamento:</strong> {selectedNegocio.dataFechamento}
                        </p>
                      )}
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Pontos ganhos:</strong> 
                        <span style={{ 
                          color: selectedNegocio.pontosGanhos > 0 ? '#10b981' : colors.text.tertiary,
                          fontWeight: 'bold',
                          marginLeft: '8px'
                        }}>
                          {selectedNegocio.pontosGanhos} pontos
                        </span>
                      </p>
                    </div>
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
