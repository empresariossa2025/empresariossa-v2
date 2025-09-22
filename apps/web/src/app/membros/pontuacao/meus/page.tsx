"use client"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { ProMembersSidebar } from "@/components/layout/pro-members-sidebar"
import { SimpleEnhancedHeader } from "@/components/layout/simple-enhanced-header"
import {
  Trophy,
  TrendingUp,
  Calendar,
  Target,
  Award,
  Star,
  Users,
  CheckCircle,
  Clock,
  DollarSign,
  UserPlus,
  Briefcase,
  BarChart3
} from "lucide-react"

interface PontosData {
  totalPontos: number
  pontosMensal: number
  pontosAnual: number
  ranking: number
  totalMembros: number
  meta: number
  progressoMeta: number
  proximoNivel: string
  pontosParaProximo: number
}

interface RecenteActivity {
  id: string
  tipo: string
  descricao: string
  pontos: number
  data: string
  categoria: 'ATTENDANCE' | 'MEETING' | 'VISITOR' | 'RECOMMENDATION' | 'BUSINESS_DEAL'
}

export default function MeusPontosPage() {
  const [pontos, setPontos] = useState<PontosData | null>(null)
  const [atividades, setAtividades] = useState<RecenteActivity[]>([])
  const [loading, setLoading] = useState(true)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockPontos: PontosData = {
      totalPontos: 1250,
      pontosMensal: 180,
      pontosAnual: 890,
      ranking: 8,
      totalMembros: 120,
      meta: 1500,
      progressoMeta: 83.3,
      proximoNivel: "Gold Member",
      pontosParaProximo: 250
    }

    const mockAtividades: RecenteActivity[] = [
      {
        id: '1',
        tipo: 'Presença Evento',
        descricao: 'Workshop IA para Empresas',
        pontos: 30,
        data: '20/09/2025',
        categoria: 'ATTENDANCE'
      },
      {
        id: '2',
        tipo: 'Reunião Individual',
        descricao: 'Reunião com Roberto Mendes',
        pontos: 30,
        data: '18/09/2025',
        categoria: 'MEETING'
      },
      {
        id: '3',
        tipo: 'Indicação Aprovada',
        descricao: 'Ana Silva Santos - Membro Ativo',
        pontos: 130,
        data: '15/09/2025',
        categoria: 'RECOMMENDATION'
      },
      {
        id: '4',
        tipo: 'Negócio Fechado',
        descricao: 'Venda - Consultoria Digital (R$ 45.000)',
        pontos: 25,
        data: '10/09/2025',
        categoria: 'BUSINESS_DEAL'
      },
      {
        id: '5',
        tipo: 'Visitante Trouxe',
        descricao: 'Marina Costa - Jantar Networking',
        pontos: 30,
        data: '08/09/2025',
        categoria: 'VISITOR'
      }
    ]

    setTimeout(() => {
      setPontos(mockPontos)
      setAtividades(mockAtividades)
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
      default: return Trophy
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <ProMembersSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <SimpleEnhancedHeader area="member" />
          <main style={{ 
            flex: 1, 
            padding: '32px', 
            backgroundColor: colors.bg.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center', color: colors.text.secondary }}>
              Carregando seus pontos...
            </div>
          </main>
        </div>
      </div>
    )
  }

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
                  Meus Pontos
                </h1>
                <p style={{
                  color: colors.text.secondary,
                  margin: 0,
                  fontSize: '16px'
                }}>
                  Acompanhe sua performance e evolução na rede
                </p>
              </div>
            </div>
          </div>

          {/* Main Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {pontos?.totalPontos.toLocaleString('pt-BR')}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Total de Pontos
                  </div>
                </div>
                <Trophy size={32} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '4px' }}>
                    #{pontos?.ranking}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Ranking Atual
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    de {pontos?.totalMembros} membros
                  </div>
                </div>
                <Award size={32} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {pontos?.pontosMensal}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Este Mês
                  </div>
                </div>
                <Calendar size={32} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundImage: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {pontos?.pontosAnual}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Este Ano
                  </div>
                </div>
                <TrendingUp size={32} style={{ opacity: 0.8 }} />
              </div>
            </div>
          </div>

          {/* Progress & Goals */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {/* Meta Anual */}
            <div style={getCardStyle()}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <Target size={20} style={{ color: '#8b5cf6' }} />
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: colors.text.primary,
                  margin: 0
                }}>
                  Meta Anual: {pontos?.meta} pontos
                </h2>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: colors.text.secondary }}>
                    Progresso: {pontos?.totalPontos} / {pontos?.meta}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>
                    {pontos?.progressoMeta.toFixed(1)}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: colors.bg.tertiary,
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${pontos?.progressoMeta}%`,
                    height: '100%',
                    backgroundImage: 'linear-gradient(90deg, #10b981, #059669)',
                    borderRadius: '4px',
                    transition: 'width 1s ease'
                  }} />
                </div>
              </div>
              
              <p style={{
                fontSize: '14px',
                color: colors.text.secondary,
                margin: 0
              }}>
                Faltam apenas {pontos && pontos.meta - pontos.totalPontos} pontos para atingir sua meta!
              </p>
            </div>

            {/* Próximo Nível */}
            <div style={getCardStyle()}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <Star size={20} style={{ color: '#f59e0b' }} />
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: colors.text.primary,
                  margin: 0
                }}>
                  Próximo Nível: {pontos?.proximoNivel}
                </h2>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundImage: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Star style={{ color: 'white', width: '28px', height: '28px' }} />
                </div>
                <div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: colors.text.primary
                  }}>
                    {pontos?.pontosParaProximo} pontos
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: colors.text.secondary
                  }}>
                    para o próximo nível
                  </div>
                </div>
              </div>
              
              <p style={{
                fontSize: '14px',
                color: colors.text.secondary,
                margin: 0
              }}>
                Continue participando ativamente para alcançar o status Gold Member!
              </p>
            </div>
          </div>

          {/* Atividades Recentes */}
          <div style={getCardStyle()}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <BarChart3 size={20} style={{ color: '#8b5cf6' }} />
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: colors.text.primary,
                margin: 0
              }}>
                Atividades Recentes
              </h2>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {atividades.map((atividade) => {
                const CategoriaIcon = getCategoriaIcon(atividade.categoria)
                
                return (
                  <div key={atividade.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: colors.bg.tertiary,
                    borderRadius: '8px',
                    border: `1px solid ${colors.border.primary}`
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: `${getCategoriaColor(atividade.categoria)}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CategoriaIcon 
                        size={20} 
                        style={{ color: getCategoriaColor(atividade.categoria) }} 
                      />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: colors.text.primary,
                        marginBottom: '2px'
                      }}>
                        {atividade.tipo}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: colors.text.secondary
                      }}>
                        {atividade.descricao}
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: atividade.pontos > 0 ? '#10b981' : '#ef4444'
                      }}>
                        {atividade.pontos > 0 ? '+' : ''}{atividade.pontos} pts
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: colors.text.tertiary
                      }}>
                        {atividade.data}
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
