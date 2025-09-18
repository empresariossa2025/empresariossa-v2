"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { User } from "@/types"
import { api } from "@/lib/api"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { Trophy, Target, TrendingUp, Award, Users, Calendar, Star, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface MemberPoints {
  id: string
  memberId: string
  totalPoints: number
  monthlyPoints: number
  yearlyPoints: number
  lastUpdated: string
  member: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  transactions: PointTransaction[]
}

interface PointTransaction {
  id: string
  points: number
  type: string
  category: string
  description: string
  createdAt: string
  metadata?: any
}

interface LeaderboardEntry {
  id: string
  memberId: string
  totalPoints: number
  monthlyPoints: number
  member: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

export default function MembrosConrolePontuacaoPage() {
  const [memberPoints, setMemberPoints] = useState<MemberPoints[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [selectedMember, setSelectedMember] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const { colors, getCardStyle, theme } = useThemedStyles()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [leaderboardRes] = await Promise.all([
        api.get('/points/leaderboard?limit=20')
      ])

      setLeaderboard(leaderboardRes.data || [])

      // Se ci sono membri, seleziona il primo per i dettagli
      if (leaderboardRes.data && leaderboardRes.data.length > 0) {
        setSelectedMember(leaderboardRes.data[0].memberId)
        fetchMemberDetails(leaderboardRes.data[0].memberId)
      }
    } catch (error) {
      console.error('Erro ao carregar dados de pontuação:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMemberDetails = async (memberId: string) => {
    try {
      const response = await api.get(`/points/member/${memberId}`)
      if (response.data) {
        const mappedData = {
          id: response.data.memberPoints.id,
          memberId: response.data.memberPoints.memberId,
          totalPoints: response.data.memberPoints.totalPoints,
          monthlyPoints: response.data.memberPoints.monthlyPoints,
          yearlyPoints: response.data.memberPoints.yearlyPoints,
          lastUpdated: response.data.memberPoints.updatedAt,
          member: response.data.memberPoints.member,
          transactions: response.data.recentTransactions || []
        }
        setMemberPoints([mappedData])
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes do membro:', error)
    }
  }

  const handleMemberSelect = (memberId: string) => {
    setSelectedMember(memberId)
    fetchMemberDetails(memberId)
  }

  const getPointsColor = (points: number) => {
    if (points > 0) return '#10b981'
    if (points < 0) return '#ef4444'
    return '#64748b'
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ATTENDANCE': return <Calendar style={{ width: '16px', height: '16px' }} />
      case 'MEETING': return <Users style={{ width: '16px', height: '16px' }} />
      case 'VISITOR': return <Star style={{ width: '16px', height: '16px' }} />
      case 'RECOMMENDATION': return <Target style={{ width: '16px', height: '16px' }} />
      case 'BUSINESS_DEAL': return <TrendingUp style={{ width: '16px', height: '16px' }} />
      default: return <Award style={{ width: '16px', height: '16px' }} />
    }
  }

  // ✅ AGGIUNTA: Funzione per ottenere i colori del membro selezionato in base al tema
  const getSelectedMemberStyle = (isSelected: boolean) => {
    if (!isSelected) {
      return {
        backgroundColor: colors.bg.tertiary,
        border: '1px solid transparent',
        textColor: colors.text.primary,
        subtextColor: colors.text.secondary
      }
    }

    if (theme === 'dark') {
      return {
        backgroundColor: '#8b5cf640', // Viola con opacità per dark theme
        border: '1px solid #8b5cf680',
        textColor: '#e9d5ff', // Testo viola chiaro per buon contrasto
        subtextColor: '#c4b5fd' // Subtitle viola più chiaro
      }
    } else {
      return {
        backgroundColor: '#faf5ff', // Viola molto chiaro per light theme
        border: '1px solid #e9d5ff',
        textColor: '#7c3aed', // Testo viola scuro per buon contrasto
        subtextColor: '#8b5cf6' // Subtitle viola medio
      }
    }
  }

  const selectedMemberData = memberPoints.find(mp => mp.memberId === selectedMember)

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: colors.text.primary,
            margin: 0,
            marginBottom: '8px',
            transition: 'color 0.3s ease'
          }}>
            Controle de Pontuação
          </h1>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Sistema de gamificação "Caminho do Sucesso"
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          {/* Leaderboard */}
          <div style={{
            ...getCardStyle(),
            height: 'fit-content'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <Trophy style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: colors.text.primary,
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                Ranking Pontos
              </h3>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: colors.text.secondary }}>
                Carregando ranking...
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {leaderboard.map((entry, index) => {
                  const isSelected = selectedMember === entry.memberId
                  const memberStyle = getSelectedMemberStyle(isSelected)
                  
                  return (
                    <div
                      key={entry.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: memberStyle.backgroundColor,
                        border: memberStyle.border,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleMemberSelect(entry.memberId)}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = colors.bg.hover
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = colors.bg.tertiary
                        }
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: index < 3 ? '#fef3c7' : '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px'
                      }}>
                        <span style={{
                          color: index < 3 ? '#92400e' : '#64748b',
                          fontWeight: '600',
                          fontSize: '12px'
                        }}>
                          {index + 1}
                        </span>
                      </div>

                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: memberStyle.textColor, // ✅ Ora usa il colore appropriato per il tema
                          margin: 0,
                          marginBottom: '2px',
                          transition: 'color 0.3s ease'
                        }}>
                          {entry.member.firstName} {entry.member.lastName}
                        </p>
                        <p style={{
                          fontSize: '12px',
                          color: memberStyle.subtextColor, // ✅ Ora usa il colore appropriato per il tema
                          margin: 0,
                          transition: 'color 0.3s ease'
                        }}>
                          {entry.totalPoints} pontos totais
                        </p>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: '#dcfce7',
                          color: '#166534'
                        }}>
                          +{entry.monthlyPoints} mês
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Dettagli membro selezionato */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {selectedMemberData ? (
              <>
                {/* Cards metriche */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {/* Punti Totali */}
                  <div style={{
                    background: colors.brand.gradient,
                    borderRadius: '12px',
                    padding: '20px',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <Award style={{ width: '24px', height: '24px', opacity: 0.8 }} />
                    </div>
                    <h3 style={{ fontSize: '14px', fontWeight: '500', margin: 0, marginBottom: '8px', opacity: 0.9 }}>
                      Pontos Totais
                    </h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
                      {selectedMemberData.totalPoints}
                    </div>
                  </div>

                  {/* Ponti Mensili */}
                  <div style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '12px',
                    padding: '20px',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <Calendar style={{ width: '24px', height: '24px', opacity: 0.8 }} />
                    </div>
                    <h3 style={{ fontSize: '14px', fontWeight: '500', margin: 0, marginBottom: '8px', opacity: 0.9 }}>
                      Pontos Mês
                    </h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
                      {selectedMemberData.monthlyPoints}
                    </div>
                  </div>

                  {/* Ponti Anuali */}
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    borderRadius: '12px',
                    padding: '20px',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <TrendingUp style={{ width: '24px', height: '24px', opacity: 0.8 }} />
                    </div>
                    <h3 style={{ fontSize: '14px', fontWeight: '500', margin: 0, marginBottom: '8px', opacity: 0.9 }}>
                      Pontos Ano
                    </h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
                      {selectedMemberData.yearlyPoints}
                    </div>
                  </div>
                </div>

                {/* Transações recenti */}
                <div style={{
                  ...getCardStyle()
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <Target style={{ width: '20px', height: '20px', color: '#8b5cf6' }} />
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: colors.text.primary,
                      margin: 0,
                      transition: 'color 0.3s ease'
                    }}>
                      Histórico de Pontos - {selectedMemberData.member.firstName} {selectedMemberData.member.lastName}
                    </h3>
                  </div>

                  {selectedMemberData.transactions && selectedMemberData.transactions.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {selectedMemberData.transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '14px',
                            borderRadius: '8px',
                            backgroundColor: colors.bg.tertiary,
                            border: `1px solid ${colors.border.primary}`,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            backgroundColor: transaction.points > 0 ? '#dcfce7' : '#fee2e2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px'
                          }}>
                            {getCategoryIcon(transaction.category)}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                              <p style={{
                                fontSize: '14px',
                                fontWeight: '500',
                                color: colors.text.primary,
                                margin: 0,
                                transition: 'color 0.3s ease'
                              }}>
                                {transaction.description || transaction.category}
                              </p>
                              <span style={{
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: '500',
                                backgroundColor: colors.bg.hover,
                                color: colors.text.secondary,
                                textTransform: 'uppercase',
                                transition: 'all 0.3s ease'
                              }}>
                                {transaction.category}
                              </span>
                            </div>
                            <p style={{
                              fontSize: '12px',
                              color: colors.text.secondary,
                              margin: 0,
                              transition: 'color 0.3s ease'
                            }}>
                              {new Date(transaction.createdAt).toLocaleDateString('pt-BR')} às {new Date(transaction.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: getPointsColor(transaction.points)
                          }}>
                            {transaction.points > 0 ? (
                              <ArrowUpRight style={{ width: '16px', height: '16px' }} />
                            ) : (
                              <ArrowDownRight style={{ width: '16px', height: '16px' }} />
                            )}
                            {transaction.points > 0 ? '+' : ''}{transaction.points}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: colors.text.secondary }}>
                      Nenhuma transação de pontos encontrada
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{
                ...getCardStyle(),
                padding: '60px',
                textAlign: 'center'
              }}>
                <Trophy style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
                <h3 style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
                  Selecione um membro no ranking para ver os detalhes de pontuação
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
