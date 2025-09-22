"use client"
import React from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { ProMembersSidebar } from "@/components/layout/pro-members-sidebar"
import { SimpleEnhancedHeader } from "@/components/layout/simple-enhanced-header"
import {
  BookOpen,
  Calendar,
  Users,
  UserPlus,
  Star,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  CheckCircle,
  AlertTriangle,
  Info,
  Trophy,
  Crown,
  Medal
} from "lucide-react"

interface RegraCategoria {
  titulo: string
  icone: any
  cor: string
  regras: {
    acao: string
    pontos: number | string
    metricaMinima: string
    pontuacao: string
    exemplo?: string
    tipo: 'ganho' | 'perda' | 'bonus'
  }[]
}

export default function RegrasPontuacaoPage() {
  const { colors, getCardStyle } = useThemedStyles()

  const categorias: RegraCategoria[] = [
    {
      titulo: "Presença",
      icone: Calendar,
      cor: "#3b82f6",
      regras: [
        {
          acao: "Participação em evento",
          pontos: 30,
          metricaMinima: "Mínimo 75% de presença",
          pontuacao: "30 Pontos por evento",
          exemplo: "Workshop, Jantar de Negócios, Reunião Geral",
          tipo: "ganho"
        },
        {
          acao: "Ausência não justificada",
          pontos: -30,
          metricaMinima: "Quando não atingir 75% de presença",
          pontuacao: "Perde 30 pontos por falta",
          exemplo: "Faltar a eventos sem justificativa",
          tipo: "perda"
        }
      ]
    },
    {
      titulo: "Reunião Individual",
      icone: Users,
      cor: "#10b981",
      regras: [
        {
          acao: "Reunião individual realizada",
          pontos: 30,
          metricaMinima: "Mínimo de 3 reuniões por mês",
          pontuacao: "30 Pontos por reunião",
          exemplo: "Encontro de networking individual com outro membro",
          tipo: "ganho"
        }
      ]
    },
    {
      titulo: "Visitantes",
      icone: UserPlus,
      cor: "#f59e0b",
      regras: [
        {
          acao: "Trouxe visitante para evento",
          pontos: 30,
          metricaMinima: "Mínimo 1 por mês",
          pontuacao: "30 Pontos por visitante",
          exemplo: "Convidar um conhecido para jantar de networking",
          tipo: "ganho"
        }
      ]
    },
    {
      titulo: "Recomendação para Membros",
      icone: Star,
      cor: "#8b5cf6",
      regras: [
        {
          acao: "Indicação de novo membro",
          pontos: 30,
          metricaMinima: "Mínimo 3 por mês",
          pontuacao: "30 pontos por recomendação",
          exemplo: "Indicar um empresário para se tornar membro",
          tipo: "ganho"
        }
      ]
    },
    {
      titulo: "Recomendações para Membros Fechadas",
      icone: Award,
      cor: "#059669",
      regras: [
        {
          acao: "Indicação se torna membro ativo",
          pontos: 100,
          metricaMinima: "Não tem mínimo",
          pontuacao: "100 pontos a cada recomendação fechada",
          exemplo: "Sua indicação foi aceita e ativou a conta como membro",
          tipo: "bonus"
        }
      ]
    },
    {
      titulo: "Negócios Fechados",
      icone: DollarSign,
      cor: "#ef4444",
      regras: [
        {
          acao: "Compra dentro do grupo",
          pontos: 50,
          metricaMinima: "Compras e vendas dentro do grupo (Não tem mínimo)",
          pontuacao: "50 pontos por COMPRAS",
          exemplo: "Contratar serviços ou comprar produtos de outro membro",
          tipo: "ganho"
        },
        {
          acao: "Venda dentro do grupo",
          pontos: 25,
          metricaMinima: "Compras e vendas dentro do grupo (Não tem mínimo)",
          pontuacao: "25 pontos por VENDAS",
          exemplo: "Prestar serviços ou vender produtos para outro membro",
          tipo: "ganho"
        }
      ]
    }
  ]

  const niveis = [
    {
      nome: "Bronze Member",
      pontosMinimos: 0,
      pontosMaximos: 999,
      cor: "#cd7c0e",
      icone: Award,
      beneficios: ["Acesso aos eventos básicos", "Participação em grupos de networking"]
    },
    {
      nome: "Silver Member",
      pontosMinimos: 1000,
      pontosMaximos: 1999,
      cor: "#94a3b8",
      icone: Medal,
      beneficios: ["Todos os benefícios Bronze", "Acesso a eventos premium", "Prioridade em reuniões"]
    },
    {
      nome: "Gold Member",
      pontosMinimos: 2000,
      pontosMaximos: 2999,
      cor: "#f59e0b",
      icone: Trophy,
      beneficios: ["Todos os benefícios Silver", "Acesso a eventos VIP", "Mentoria com líderes"]
    },
    {
      nome: "Platinum Member",
      pontosMinimos: 3000,
      pontosMaximos: 99999,
      cor: "#e5e7eb",
      icone: Crown,
      beneficios: ["Todos os benefícios Gold", "Acesso exclusivo ao conselho", "Participação em decisões estratégicas"]
    }
  ]

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
                backgroundImage: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
              }}>
                <BookOpen style={{ color: 'white', width: '24px', height: '24px' }} />
              </div>
              <div>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: colors.text.primary,
                  margin: 0
                }}>
                  Regras de Pontuação
                </h1>
                <p style={{
                  color: colors.text.secondary,
                  margin: 0,
                  fontSize: '16px'
                }}>
                  Sistema oficial "Caminho do Sucesso"
                </p>
              </div>
            </div>
          </div>

          {/* Introdução */}
          <div style={{
            ...getCardStyle(),
            marginBottom: '32px',
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <Target size={32} style={{ opacity: 0.9 }} />
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                margin: 0
              }}>
                Caminho do Sucesso - CNE
              </h2>
            </div>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0,
              opacity: 0.95
            }}>
              Sistema oficial de pontuação do Clube de Negócios Empresários S.A. que incentiva 
              a participação ativa, networking efetivo e crescimento mútuo dos negócios através 
              de métricas claras e objetivas.
            </p>
          </div>

          {/* Tabela Oficial Recreada */}
          <div style={{
            ...getCardStyle(),
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: colors.text.primary,
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Tabela Oficial de Pontuação
            </h2>

            {/* Header da tabela */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1px',
              backgroundColor: colors.border.primary,
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '24px'
            }}>
              <div style={{
                padding: '16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '16px'
              }}>
                Atividade
              </div>
              <div style={{
                padding: '16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '16px'
              }}>
                Métrica Mínima
              </div>
              <div style={{
                padding: '16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '16px'
              }}>
                Pontuação
              </div>
            </div>

            {/* Linhas da tabela */}
            <div style={{ display: 'grid', gap: '1px' }}>
              {categorias.map((categoria, index) => (
                categoria.regras.map((regra, rIndex) => {
                  const IconeCategoria = categoria.icone
                  
                  return (
                    <div key={`${index}-${rIndex}`} style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '1px',
                      backgroundColor: colors.border.primary,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        padding: '16px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontWeight: '600',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          backgroundColor: `${categoria.cor}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '8px'
                        }}>
                          <IconeCategoria size={14} style={{ color: categoria.cor }} />
                        </div>
                        {regra.acao.toUpperCase()}
                      </div>
                      <div style={{
                        padding: '16px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.secondary,
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {regra.metricaMinima}
                      </div>
                      <div style={{
                        padding: '16px',
                        backgroundColor: colors.bg.secondary,
                        color: regra.tipo === 'perda' ? '#ef4444' : regra.tipo === 'bonus' ? '#f59e0b' : '#10b981',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {regra.pontuacao}
                      </div>
                    </div>
                  )
                })
              ))}
            </div>
          </div>

          {/* Detalhes por Categoria */}
          <div style={{
            display: 'grid',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {categorias.map((categoria, index) => {
              const IconeCategoria = categoria.icone
              
              return (
                <div key={index} style={getCardStyle()}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: `${categoria.cor}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconeCategoria size={20} style={{ color: categoria.cor }} />
                    </div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: colors.text.primary,
                      margin: 0
                    }}>
                      {categoria.titulo}
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gap: '12px' }}>
                    {categoria.regras.map((regra, rIndex) => (
                      <div key={rIndex} style={{
                        padding: '16px',
                        backgroundColor: colors.bg.tertiary,
                        borderRadius: '8px',
                        border: `1px solid ${colors.border.primary}`
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '12px'
                        }}>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: colors.text.primary,
                            margin: 0
                          }}>
                            {regra.acao}
                          </h4>
                          
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 12px',
                            borderRadius: '12px',
                            backgroundColor: regra.tipo === 'ganho' ? '#10b98120' : 
                                           regra.tipo === 'bonus' ? '#f59e0b20' : '#ef444420',
                            color: regra.tipo === 'ganho' ? '#10b981' : 
                                   regra.tipo === 'bonus' ? '#f59e0b' : '#ef4444',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}>
                            {regra.tipo === 'ganho' ? (
                              <TrendingUp size={14} />
                            ) : regra.tipo === 'bonus' ? (
                              <Star size={14} />
                            ) : (
                              <TrendingDown size={14} />
                            )}
                            {typeof regra.pontos === 'number' && regra.pontos > 0 ? '+' : ''}{regra.pontos} pts
                          </div>
                        </div>

                        <div style={{
                          display: 'grid',
                          gap: '8px'
                        }}>
                          <div style={{
                            fontSize: '14px',
                            color: colors.text.secondary
                          }}>
                            <strong>Métrica:</strong> {regra.metricaMinima}
                          </div>

                          <div style={{
                            fontSize: '14px',
                            color: colors.text.secondary
                          }}>
                            <strong>Pontuação:</strong> {regra.pontuacao}
                          </div>

                          {regra.exemplo && (
                            <div style={{
                              fontSize: '13px',
                              color: colors.text.tertiary,
                              fontStyle: 'italic',
                              marginTop: '4px'
                            }}>
                              <strong>Exemplo:</strong> {regra.exemplo}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Níveis de Membros */}
          <div style={getCardStyle()}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <Crown size={24} style={{ color: '#f59e0b' }} />
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: colors.text.primary,
                margin: 0
              }}>
                Níveis de Membros
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {niveis.map((nivel, index) => {
                const IconeNivel = nivel.icone
                
                return (
                  <div key={index} style={{
                    padding: '20px',
                    backgroundColor: colors.bg.tertiary,
                    borderRadius: '12px',
                    border: `2px solid ${nivel.cor}40`,
                    position: 'relative'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: `${nivel.cor}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconeNivel size={20} style={{ color: nivel.cor }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: colors.text.primary,
                          margin: 0
                        }}>
                          {nivel.nome}
                        </h3>
                        <p style={{
                          fontSize: '14px',
                          color: colors.text.secondary,
                          margin: 0
                        }}>
                          {nivel.pontosMinimos} - {nivel.pontosMaximos === 99999 ? '∞' : nivel.pontosMaximos} pontos
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: colors.text.primary,
                        marginBottom: '8px'
                      }}>
                        Benefícios:
                      </h4>
                      <ul style={{
                        margin: 0,
                        paddingLeft: '16px',
                        color: colors.text.secondary,
                        fontSize: '13px'
                      }}>
                        {nivel.beneficios.map((beneficio, bIndex) => (
                          <li key={bIndex} style={{ marginBottom: '4px' }}>
                            {beneficio}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Observações Importantes */}
          <div style={{
            ...getCardStyle(),
            marginTop: '32px',
            border: `1px solid #3b82f620`,
            backgroundColor: '#3b82f605'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <Info size={24} style={{ color: '#3b82f6' }} />
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: colors.text.primary,
                margin: 0
              }}>
                Observações Importantes
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gap: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <CheckCircle size={16} style={{ color: '#10b981', marginTop: '2px', flexShrink: 0 }} />
                <p style={{
                  fontSize: '14px',
                  color: colors.text.secondary,
                  margin: 0
                }}>
                  <strong>Presença obrigatória:</strong> Mantenha mínimo 75% de presença para evitar penalidades de -30 pontos.
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <CheckCircle size={16} style={{ color: '#10b981', marginTop: '2px', flexShrink: 0 }} />
                <p style={{
                  fontSize: '14px',
                  color: colors.text.secondary,
                  margin: 0
                }}>
                  <strong>Metas mensais:</strong> Cumpra 3 reuniões individuais, 3 recomendações e 1 visitante por mês.
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <CheckCircle size={16} style={{ color: '#10b981', marginTop: '2px', flexShrink: 0 }} />
                <p style={{
                  fontSize: '14px',
                  color: colors.text.secondary,
                  margin: 0
                }}>
                  <strong>Bonus especial:</strong> Receba 100 pontos extras quando sua recomendação se tornar membro ativo.
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <AlertTriangle size={16} style={{ color: '#f59e0b', marginTop: '2px', flexShrink: 0 }} />
                <p style={{
                  fontSize: '14px',
                  color: colors.text.secondary,
                  margin: 0
                }}>
                  <strong>Validação:</strong> Todos os pontos são validados automaticamente pelo sistema ou pela administração.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
