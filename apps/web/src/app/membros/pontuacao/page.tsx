"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { User } from "@/types"
import { api } from "@/lib/api"
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
        setMemberPoints([response.data])
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

  const selectedMemberData = memberPoints.find(mp => mp.memberId === selectedMember)

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#1e293b', 
            margin: 0,
            marginBottom: '8px'
          }}>
            Controle de Pontuação
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#64748b', 
            margin: 0 
          }}>
            Sistema de gamificação "Caminho do Sucesso"
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          {/* Leaderboard */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f1f5f9',
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
                color: '#1e293b', 
                margin: 0 
              }}>
                Ranking Pontos
              </h3>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                Carregando ranking...
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {leaderboard.map((entry, index) => (
                  <div 
                    key={entry.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: selectedMember === entry.memberId ? '#faf5ff' : '#f8fafc',
                      border: selectedMember === entry.memberId ? '1px solid #e9d5ff' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => handleMemberSelect(entry.memberId)}
                    onMouseEnter={(e) => {
                      if (selectedMember !== entry.memberId) {
                        e.currentTarget.style.backgroundColor = '#f1f5f9'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedMember !== entry.memberId) {
                        e.currentTarget.style.backgroundColor = '#f8fafc'
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
                        color: '#1e293b', 
                        margin: 0,
                        marginBottom: '2px'
                      }}>
                        {entry.member.firstName} {entry.member.lastName}
                      </p>
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#64748b', 
                        margin: 0 
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
                ))}
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
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
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
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid #f1f5f9'
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
                      color: '#1e293b', 
                      margin: 0 
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
                            backgroundColor: '#f8fafc',
                            border: '1px solid #f1f5f9'
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
                                color: '#1e293b', 
                                margin: 0
                              }}>
                                {transaction.description || transaction.category}
                              </p>
                              <span style={{
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: '500',
                                backgroundColor: '#e2e8f0',
                                color: '#475569',
                                textTransform: 'uppercase'
                              }}>
                                {transaction.category}
                              </span>
                            </div>
                            <p style={{ 
                              fontSize: '12px', 
                              color: '#64748b', 
                              margin: 0 
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
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                      Nenhuma transação de pontos encontrada
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '60px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #f1f5f9',
                textAlign: 'center'
              }}>
                <Trophy style={{ width: '48px', height: '48px', color: '#d1d5db', margin: '0 auto 16px' }} />
                <h3 style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
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
