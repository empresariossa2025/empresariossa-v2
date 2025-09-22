"use client"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { ProMembersSidebar } from "@/components/layout/pro-members-sidebar"
import { SimpleEnhancedHeader } from "@/components/layout/simple-enhanced-header"
import {
  UserCheck,
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Building2,
  Calendar,
  Award,
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface Indicacao {
  id: string
  nome: string
  sobrenome: string
  email: string
  telefone: string
  empresa: string
  cargo: string
  setor: string
  status: 'Pendente' | 'Aprovado' | 'Rejeitado' | 'Membro Ativo'
  dataIndicacao: string
  dataAprovacao?: string
  motivoConvite: string
  conheceuComo: string
  pontosGanhos: number
  membroDesde?: string
  adminObservacoes?: string
}

export default function IndicacoesPage() {
  const [indicacoes, setIndicacoes] = useState<Indicacao[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIndicacao, setSelectedIndicacao] = useState<Indicacao | null>(null)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockIndicacoes: Indicacao[] = [
      {
        id: '1',
        nome: 'Ana',
        sobrenome: 'Silva Santos',
        email: 'ana.silva@techcorp.com',
        telefone: '(21) 99888-7777',
        empresa: 'TechCorp Solutions',
        cargo: 'Diretora de Inovação',
        setor: 'Tecnologia',
        status: 'Membro Ativo',
        dataIndicacao: '15/08/2025',
        dataAprovacao: '22/08/2025',
        motivoConvite: 'Profissional experiente em transformação digital, pode agregar muito valor à nossa rede.',
        conheceuComo: 'Evento de Negócios',
        pontosGanhos: 130,
        membroDesde: '25/08/2025',
        adminObservacoes: 'Excelente perfil profissional. Aprovado unanimemente.'
      },
      {
        id: '2',
        nome: 'Roberto',
        sobrenome: 'Mendes Costa',
        email: 'roberto@consultamed.com.br',
        telefone: '(21) 98765-4321',
        empresa: 'ConsultaMed',
        cargo: 'CEO',
        setor: 'Saúde',
        status: 'Aprovado',
        dataIndicacao: '10/09/2025',
        dataAprovacao: '18/09/2025',
        motivoConvite: 'Líder no setor de saúde digital, com vasta experiência em gestão.',
        conheceuComo: 'Cliente/Fornecedor',
        pontosGanhos: 30,
        adminObservacoes: 'Aprovado. Aguardando confirmação de participação.'
      },
      {
        id: '3',
        nome: 'Mariana',
        sobrenome: 'Oliveira Lima',
        email: 'mariana@ecobuild.com.br',
        telefone: '(21) 97654-3210',
        empresa: 'EcoBuild Sustentável',
        cargo: 'Sócia-Fundadora',
        setor: 'Construção',
        status: 'Pendente',
        dataIndicacao: '20/09/2025',
        motivoConvite: 'Pioneira em construção sustentável, área em crescimento na nossa rede.',
        conheceuComo: 'Networking',
        pontosGanhos: 0
      }
    ]
    
    setTimeout(() => {
      setIndicacoes(mockIndicacoes)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente': return '#f59e0b'
      case 'Aprovado': return '#3b82f6'
      case 'Membro Ativo': return '#10b981'
      case 'Rejeitado': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pendente': return Clock
      case 'Aprovado': return CheckCircle
      case 'Membro Ativo': return UserCheck
      case 'Rejeitado': return XCircle
      default: return Clock
    }
  }

  const filteredIndicacoes = indicacoes.filter(indicacao => {
    const matchesSearch = 
      indicacao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicacao.sobrenome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicacao.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'todos' || indicacao.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredIndicacoes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentIndicacoes = filteredIndicacoes.slice(startIndex, startIndex + itemsPerPage)

  const totalIndicacoes = indicacoes.length
  const pendentes = indicacoes.filter(i => i.status === 'Pendente').length
  const aprovados = indicacoes.filter(i => i.status === 'Aprovado' || i.status === 'Membro Ativo').length
  const membrosAtivos = indicacoes.filter(i => i.status === 'Membro Ativo').length
  const pontosTotal = indicacoes.reduce((acc, i) => acc + i.pontosGanhos, 0)

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
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundImage: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
              }}>
                <UserCheck style={{ color: 'white', width: '24px', height: '24px' }} />
              </div>
              <div>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: colors.text.primary,
                  margin: 0
                }}>
                  Minhas Indicações
                </h1>
                <p style={{
                  color: colors.text.secondary,
                  margin: 0,
                  fontSize: '16px'
                }}>
                  Acompanhe o status das pessoas que você indicou
                </p>
              </div>
            </div>
          </div>

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
                    {totalIndicacoes}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Total
                  </div>
                </div>
                <Users size={28} style={{ opacity: 0.8 }} />
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
                    {pendentes}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Pendentes
                  </div>
                </div>
                <Clock size={28} style={{ opacity: 0.8 }} />
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
                    {membrosAtivos}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Ativos
                  </div>
                </div>
                <UserCheck size={28} style={{ opacity: 0.8 }} />
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
                    Pontos
                  </div>
                </div>
                <Award size={28} style={{ opacity: 0.8 }} />
              </div>
            </div>
          </div>

          <div style={{
            ...getCardStyle(),
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
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
                  placeholder="Buscar por nome, empresa..."
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
                <option value="todos">Todos</option>
                <option value="Pendente">Pendente</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Membro Ativo">Membro Ativo</option>
                <option value="Rejeitado">Rejeitado</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '64px',
              color: colors.text.secondary
            }}>
              Carregando indicações...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {currentIndicacoes.map((indicacao) => {
                const StatusIcon = getStatusIcon(indicacao.status)
                
                return (
                  <div key={indicacao.id} style={{
                    ...getCardStyle(),
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '16px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: 0,
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: colors.text.primary,
                          marginBottom: '4px'
                        }}>
                          {indicacao.nome} {indicacao.sobrenome}
                        </h3>
                        <p style={{
                          margin: 0,
                          fontSize: '14px',
                          color: colors.text.secondary,
                          marginBottom: '8px'
                        }}>
                          {indicacao.cargo} • {indicacao.empresa}
                        </p>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          backgroundColor: `${getStatusColor(indicacao.status)}20`,
                          fontSize: '12px',
                          fontWeight: '500',
                          color: getStatusColor(indicacao.status)
                        }}>
                          <StatusIcon size={12} style={{ marginRight: '4px' }} />
                          {indicacao.status}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '6px',
                        fontSize: '13px',
                        color: colors.text.secondary
                      }}>
                        <Building2 size={14} style={{ marginRight: '8px' }} />
                        {indicacao.setor}
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '6px',
                        fontSize: '13px',
                        color: colors.text.secondary
                      }}>
                        <Calendar size={14} style={{ marginRight: '8px' }} />
                        Indicado em {indicacao.dataIndicacao}
                      </div>

                      {indicacao.membroDesde && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '6px',
                          fontSize: '13px',
                          color: '#10b981'
                        }}>
                          <UserCheck size={14} style={{ marginRight: '8px' }} />
                          Membro desde {indicacao.membroDesde}
                        </div>
                      )}
                    </div>

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
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: indicacao.pontosGanhos > 0 ? '#10b981' : colors.text.tertiary
                      }}>
                        {indicacao.pontosGanhos} pts
                      </span>
                    </div>

                    <button 
                      onClick={() => setSelectedIndicacao(indicacao)}
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

          {selectedIndicacao && (
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
                    Detalhes da Indicação
                  </h2>
                  <button
                    onClick={() => setSelectedIndicacao(null)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: colors.text.secondary,
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <XCircle size={24} />
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
                      Informações Pessoais
                    </h3>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Nome:</strong> {selectedIndicacao.nome} {selectedIndicacao.sobrenome}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Email:</strong> {selectedIndicacao.email}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Telefone:</strong> {selectedIndicacao.telefone}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Empresa:</strong> {selectedIndicacao.empresa}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Cargo:</strong> {selectedIndicacao.cargo}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Setor:</strong> {selectedIndicacao.setor}
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
                      Status da Indicação
                    </h3>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Status:</strong> 
                        <span style={{ 
                          color: getStatusColor(selectedIndicacao.status),
                          fontWeight: 'bold',
                          marginLeft: '8px'
                        }}>
                          {selectedIndicacao.status}
                        </span>
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Data da indicação:</strong> {selectedIndicacao.dataIndicacao}
                      </p>
                      {selectedIndicacao.dataAprovacao && (
                        <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                          <strong>Data de aprovação:</strong> {selectedIndicacao.dataAprovacao}
                        </p>
                      )}
                      <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                        <strong>Pontos ganhos:</strong> 
                        <span style={{ 
                          color: selectedIndicacao.pontosGanhos > 0 ? '#10b981' : colors.text.tertiary,
                          fontWeight: 'bold',
                          marginLeft: '8px'
                        }}>
                          {selectedIndicacao.pontosGanhos} pontos
                        </span>
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
                      Motivo da Indicação
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: colors.text.secondary,
                      backgroundColor: colors.bg.tertiary,
                      padding: '12px',
                      borderRadius: '8px'
                    }}>
                      {selectedIndicacao.motivoConvite}
                    </p>
                  </div>

                  {selectedIndicacao.adminObservacoes && (
                    <div>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: colors.text.primary,
                        marginBottom: '12px'
                      }}>
                        Observações da Administração
                      </h3>
                      <p style={{
                        margin: 0,
                        fontSize: '14px',
                        color: colors.text.secondary,
                        backgroundColor: colors.bg.tertiary,
                        padding: '12px',
                        borderRadius: '8px'
                      }}>
                        {selectedIndicacao.adminObservacoes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
