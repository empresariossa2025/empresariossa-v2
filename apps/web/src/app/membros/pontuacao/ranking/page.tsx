"use client"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { ProMembersSidebar } from "@/components/layout/pro-members-sidebar"
import { SimpleEnhancedHeader } from "@/components/layout/simple-enhanced-header"
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
  Users,
  Calendar,
  Target
} from "lucide-react"

interface RankingMembro {
  id: string
  posicao: number
  nome: string
  sobrenome: string
  empresa: string
  totalPontos: number
  pontosMensal: number
  pontosAnual: number
  variacao: number // +/- em relação ao mês anterior
  avatar?: string
  nivel: string
  isCurrentUser?: boolean
}

export default function RankingPage() {
  const [ranking, setRanking] = useState<RankingMembro[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPeriod, setFilterPeriod] = useState('total') // total, mensal, anual
  const [currentUserPosition, setCurrentUserPosition] = useState<RankingMembro | null>(null)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockRanking: RankingMembro[] = [
      {
        id: '1',
        posicao: 1,
        nome: 'Carlos',
        sobrenome: 'Eduardo Silva',
        empresa: 'TechLeader Consulting',
        totalPontos: 2450,
        pontosMensal: 320,
        pontosAnual: 1890,
        variacao: 45,
        nivel: 'Platinum Member'
      },
      {
        id: '2',
        posicao: 2,
        nome: 'Ana',
        sobrenome: 'Beatriz Costa',
        empresa: 'InnovaBusiness',
        totalPontos: 2120,
        pontosMensal: 280,
        pontosAnual: 1650,
        variacao: 23,
        nivel: 'Gold Member'
      },
      {
        id: '3',
        posicao: 3,
        nome: 'Roberto',
        sobrenome: 'Fernandes',
        empresa: 'Growth Partners',
        totalPontos: 1890,
        pontosMensal: 245,
        pontosAnual: 1420,
        variacao: 12,
        nivel: 'Gold Member'
      },
      {
        id: '4',
        posicao: 4,
        nome: 'Marina',
        sobrenome: 'Oliveira',
        empresa: 'EcoSolutions',
        totalPontos: 1680,
        pontosMensal: 195,
        pontosAnual: 1280,
        variacao: -8,
        nivel: 'Silver Member'
      },
      {
        id: '5',
        posicao: 5,
        nome: 'Felipe',
        sobrenome: 'Santos',
        empresa: 'Digital Impact',
        totalPontos: 1520,
        pontosMensal: 220,
        pontosAnual: 1180,
        variacao: 35,
        nivel: 'Silver Member'
      },
      {
        id: '6',
        posicao: 6,
        nome: 'Juliana',
        sobrenome: 'Mendes',
        empresa: 'Creative Hub',
        totalPontos: 1380,
        pontosMensal: 165,
        pontosAnual: 1050,
        variacao: 15,
        nivel: 'Silver Member'
      },
      {
        id: '7',
        posicao: 7,
        nome: 'Ricardo',
        sobrenome: 'Lima',
        empresa: 'Business Strategy',
        totalPontos: 1290,
        pontosMensal: 142,
        pontosAnual: 980,
        variacao: -12,
        nivel: 'Bronze Member'
      },
      {
        id: '8',
        posicao: 8,
        nome: 'Marco',
        sobrenome: 'Carvalho',
        empresa: 'Consulting Pro',
        totalPontos: 1250,
        pontosMensal: 180,
        pontosAnual: 890,
        variacao: 28,
        nivel: 'Bronze Member',
        isCurrentUser: true
      },
      {
        id: '9',
        posicao: 9,
        nome: 'Fernanda',
        sobrenome: 'Rocha',
        empresa: 'Smart Business',
        totalPontos: 1180,
        pontosMensal: 155,
        pontosAnual: 820,
        variacao: 8,
        nivel: 'Bronze Member'
      },
      {
        id: '10',
        posicao: 10,
        nome: 'Paulo',
        sobrenome: 'Almeida',
        empresa: 'NextGen Solutions',
        totalPontos: 1050,
        pontosMensal: 130,
        pontosAnual: 750,
        variacao: -5,
        nivel: 'Bronze Member'
      }
    ]

    setTimeout(() => {
      setRanking(mockRanking)
      setCurrentUserPosition(mockRanking.find(m => m.isCurrentUser) || null)
      setLoading(false)
    }, 1000)
  }, [])

  const getPosicaoIcon = (posicao: number) => {
    switch (posicao) {
      case 1: return Crown
      case 2: return Medal
      case 3: return Award
      default: return Trophy
    }
  }

  const getPosicaoColor = (posicao: number) => {
    switch (posicao) {
      case 1: return '#f59e0b' // Gold
      case 2: return '#94a3b8' // Silver
      case 3: return '#cd7c0e' // Bronze
      default: return '#8b5cf6'
    }
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Platinum Member': return '#e5e7eb'
      case 'Gold Member': return '#f59e0b'
      case 'Silver Member': return '#94a3b8'
      case 'Bronze Member': return '#cd7c0e'
      default: return '#64748b'
    }
  }

  const getVariacaoIcon = (variacao: number) => {
    if (variacao > 0) return TrendingUp
    if (variacao < 0) return TrendingDown
    return Minus
  }

  const getVariacaoColor = (variacao: number) => {
    if (variacao > 0) return '#10b981'
    if (variacao < 0) return '#ef4444'
    return '#64748b'
  }

  const getCurrentPeriodPoints = (membro: RankingMembro) => {
    switch (filterPeriod) {
      case 'mensal': return membro.pontosMensal
      case 'anual': return membro.pontosAnual
      default: return membro.totalPontos
    }
  }

  const filteredRanking = ranking.filter(membro =>
    membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    membro.sobrenome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    membro.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedRanking = [...filteredRanking].sort((a, b) => {
    const pontosA = getCurrentPeriodPoints(a)
    const pontosB = getCurrentPeriodPoints(b)
    return pontosB - pontosA
  })

  // Recalcular posições após filtro e ordenação
  const rankingComPosicoes = sortedRanking.map((membro, index) => ({
    ...membro,
    posicao: index + 1
  }))

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundImage: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
              }}>
                <Trophy style={{ color: 'white', width: '24px', height: '24px' }} />
              </div>
              <div>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: colors.text.primary,
                  margin: 0
                }}>
                  Ranking
                </h1>
                <p style={{
                  color: colors.text.secondary,
                  margin: 0,
                  fontSize: '16px'
                }}>
                  Veja sua posição e compare com outros membros
                </p>
              </div>
            </div>
          </div>

          {/* Current User Position Highlight */}
          {currentUserPosition && (
            <div style={{
              ...getCardStyle(),
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  #{currentUserPosition.posicao}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                    Sua Posição Atual
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                    {currentUserPosition.totalPontos.toLocaleString('pt-BR')} pontos • {currentUserPosition.nivel}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    justifyContent: 'flex-end'
                  }}>
                    {currentUserPosition.variacao > 0 ? (
                      <TrendingUp size={16} style={{ color: '#86efac' }} />
                    ) : currentUserPosition.variacao < 0 ? (
                      <TrendingDown size={16} style={{ color: '#fca5a5' }} />
                    ) : (
                      <Minus size={16} style={{ color: '#94a3b8' }} />
                    )}
                    <span style={{
                      fontSize: '14px',
                      color: currentUserPosition.variacao >= 0 ? '#86efac' : '#fca5a5'
                    }}>
                      {currentUserPosition.variacao > 0 ? '+' : ''}{currentUserPosition.variacao}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    vs mês anterior
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
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
                  placeholder="Buscar por nome ou empresa..."
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
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                style={{
                  padding: '12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.secondary,
                  color: colors.text.primary,
                  fontSize: '14px'
                }}
              >
                <option value="total">Pontos Totais</option>
                <option value="anual">Este Ano</option>
                <option value="mensal">Este Mês</option>
              </select>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {[1, 0, 2].map((index) => {
              const membro = rankingComPosicoes[index]
              if (!membro) return null
              
              const PosicaoIcon = getPosicaoIcon(membro.posicao)
              const alturas = ['120px', '140px', '100px'] // posições do podium
              const alturaIndex = membro.posicao === 1 ? 1 : membro.posicao === 2 ? 0 : 2
              
              return (
                <div key={membro.id} style={{
                  ...getCardStyle(),
                  textAlign: 'center',
                  position: 'relative',
                  background: membro.isCurrentUser ? 
                    'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 
                    colors.bg.primary,
                  color: membro.isCurrentUser ? 'white' : colors.text.primary
                }}>
                  {/* Pedestal */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: alturas[alturaIndex],
                    backgroundColor: `${getPosicaoColor(membro.posicao)}20`,
                    borderRadius: '0 0 12px 12px'
                  }} />
                  
                  <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      margin: '0 auto 16px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${getPosicaoColor(membro.posicao)}, ${getPosicaoColor(membro.posicao)}dd)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 12px ${getPosicaoColor(membro.posicao)}40`
                    }}>
                      <PosicaoIcon style={{ color: 'white', width: '28px', height: '28px' }} />
                    </div>
                    
                    <div style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      marginBottom: '4px'
                    }}>
                      #{membro.posicao}
                    </div>
                    
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      margin: '0 0 4px 0'
                    }}>
                      {membro.nome} {membro.sobrenome}
                    </h3>
                    
                    <p style={{
                      fontSize: '12px',
                      opacity: 0.8,
                      margin: '0 0 12px 0'
                    }}>
                      {membro.empresa}
                    </p>
                    
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      marginBottom: '4px'
                    }}>
                      {getCurrentPeriodPoints(membro).toLocaleString('pt-BR')}
                    </div>
                    
                    <div style={{
                      fontSize: '11px',
                      opacity: 0.7
                    }}>
                      pontos
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Full Ranking Table */}
          <div style={getCardStyle()}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: colors.text.primary,
              marginBottom: '20px'
            }}>
              Ranking Completo
            </h2>

            <div style={{ display: 'grid', gap: '8px' }}>
              {rankingComPosicoes.map((membro) => {
                const PosicaoIcon = getPosicaoIcon(membro.posicao)
                const VariacaoIcon = getVariacaoIcon(membro.variacao)
                
                return (
                  <div key={membro.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: membro.isCurrentUser ? '#8b5cf620' : colors.bg.tertiary,
                    borderRadius: '8px',
                    border: membro.isCurrentUser ? '2px solid #8b5cf6' : `1px solid ${colors.border.primary}`,
                    transition: 'all 0.2s ease'
                  }}>
                    {/* Posição */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: `${getPosicaoColor(membro.posicao)}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: getPosicaoColor(membro.posicao)
                    }}>
                      {membro.posicao <= 3 ? (
                        <PosicaoIcon size={20} />
                      ) : (
                        `#${membro.posicao}`
                      )}
                    </div>

                    {/* Avatar placeholder */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: colors.bg.secondary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: colors.text.secondary,
                      border: `2px solid ${getNivelColor(membro.nivel)}`
                    }}>
                      {membro.nome.charAt(0)}{membro.sobrenome.charAt(0)}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: colors.text.primary,
                        marginBottom: '2px'
                      }}>
                        {membro.nome} {membro.sobrenome}
                        {membro.isCurrentUser && (
                          <span style={{
                            marginLeft: '8px',
                            fontSize: '12px',
                            padding: '2px 8px',
                            backgroundColor: '#8b5cf6',
                            color: 'white',
                            borderRadius: '12px'
                          }}>
                            Você
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: colors.text.secondary,
                        marginBottom: '2px'
                      }}>
                        {membro.empresa}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: getNivelColor(membro.nivel),
                        fontWeight: '500'
                      }}>
                        {membro.nivel}
                      </div>
                    </div>

                    {/* Pontos */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: colors.text.primary,
                        marginBottom: '2px'
                      }}>
                        {getCurrentPeriodPoints(membro).toLocaleString('pt-BR')}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                        <VariacaoIcon size={14} style={{ color: getVariacaoColor(membro.variacao) }} />
                        <span style={{
                          fontSize: '12px',
                          color: getVariacaoColor(membro.variacao)
                        }}>
                          {membro.variacao > 0 ? '+' : ''}{membro.variacao}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
