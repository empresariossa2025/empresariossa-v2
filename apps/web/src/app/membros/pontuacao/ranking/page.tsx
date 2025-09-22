'use client'
import { useState, useEffect } from 'react'
import { ResponsiveLayout } from '@/components/layout/responsive/responsive-layout'
import { useThemedStyles } from '@/hooks/use-themed-styles'
import {
  Crown,
  Medal,
  Award,
  Trophy,
  TrendingUp,
  Search,
  Filter,
  Calendar
} from 'lucide-react'

interface RankingMembro {
  id: number
  name: string
  companie_name: string
  total_points: string
  transactions_count: number
  position?: number
}

export default function RankingPage() {
  const { colors } = useThemedStyles()
  const [ranking, setRanking] = useState<RankingMembro[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/laravel/ranking')
        const data = await response.json()
        
        // Add position to each member
        const rankingWithPosition = data.map((member: any, index: number) => ({
          ...member,
          position: index + 1,
          total_points: parseInt(member.total_points)
        }))
        
        setRanking(rankingWithPosition)
      } catch (error) {
        console.error('Erro ao carregar ranking:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRanking()
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

  const filteredRanking = ranking.filter(member => {
    const matchesSearch = searchTerm === '' ||
                         member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.companie_name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  if (loading) {
    return (
      <ResponsiveLayout title="Ranking">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          color: colors.text.tertiary 
        }}>
          Carregando ranking...
        </div>
      </ResponsiveLayout>
    )
  }

  return (
    <ResponsiveLayout title="Ranking">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        color: 'white',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>
          🏆 Ranking de Pontuação
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
          {ranking.length} membros ativos • Dados em tempo real
        </p>
      </div>

      {/* Search */}
      <div style={{
        background: colors.bg.primary,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        border: `1px solid ${colors.border.primary}`
      }}>
        <div style={{ position: 'relative' }}>
          <Search style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            color: colors.text.tertiary
          }} />
          <input
            type="text"
            placeholder="Buscar membro ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 40px',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: '8px',
              background: colors.bg.secondary,
              color: colors.text.primary,
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Podium Top 3 */}
      {ranking.length >= 3 && (
        <div style={{
          background: colors.bg.primary,
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '24px',
          border: `1px solid ${colors.border.primary}`
        }}>
          <h2 style={{
            color: colors.text.primary,
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 24px 0',
            textAlign: 'center'
          }}>
            🥇 Top 3 Membros
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'end',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            {ranking.slice(0, 3).map((member, index) => {
              const heights = ['140px', '120px', '100px']
              const Icon = getPosicaoIcon(member.position!)
              
              return (
                <div key={member.id} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '200px'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${getPosicaoColor(member.position!)}, ${getPosicaoColor(member.position!)}dd)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    <Icon style={{ width: '32px', height: '32px', color: 'white' }} />
                  </div>
                  
                  <div style={{
                    background: getPosicaoColor(member.position!),
                    height: heights[index],
                    width: '100%',
                    borderRadius: '12px 12px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    padding: '16px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                      {member.total_points.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px' }}>
                      pontos
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                      {member.name}
                    </div>
                    <div style={{ fontSize: '11px', opacity: 0.8 }}>
                      {member.companie_name}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Lista Completa */}
      <div style={{
        background: colors.bg.primary,
        borderRadius: '16px',
        border: `1px solid ${colors.border.primary}`,
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: `1px solid ${colors.border.primary}`
        }}>
          <h3 style={{
            color: colors.text.primary,
            fontSize: '18px',
            fontWeight: '600',
            margin: 0
          }}>
            Ranking Completo ({filteredRanking.length} membros)
          </h3>
        </div>

        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {filteredRanking.map((member) => {
            const Icon = getPosicaoIcon(member.position!)
            const isTop3 = member.position! <= 3
            
            return (
              <div key={member.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: `1px solid ${colors.border.primary}`,
                background: isTop3 ? colors.bg.tertiary : 'transparent'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${getPosicaoColor(member.position!)}, ${getPosicaoColor(member.position!)}dd)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px'
                }}>
                  <Icon style={{ width: '20px', height: '20px', color: 'white' }} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}>
                    <span style={{
                      color: colors.text.primary,
                      fontWeight: '600',
                      fontSize: '16px'
                    }}>
                      #{member.position} {member.name}
                    </span>
                    <span style={{
                      color: getPosicaoColor(member.position!),
                      fontWeight: '700',
                      fontSize: '18px'
                    }}>
                      {member.total_points.toLocaleString()} pts
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: colors.text.secondary,
                      fontSize: '14px'
                    }}>
                      {member.companie_name}
                    </span>
                    <span style={{
                      color: colors.text.tertiary,
                      fontSize: '12px'
                    }}>
                      {member.transactions_count} transações
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ResponsiveLayout>
  )
}
