"use client"
import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  DollarSign,
  Target,
  Award,
  Download,
  Filter,
  RefreshCw,
  FileText,
  Eye,
  Share
} from "lucide-react"

export default function RelatoriosPage() {
  const { colors, getCardStyle } = useThemedStyles()
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [isLoading, setIsLoading] = useState(false)

  // Dados mock para demonstração
  const metricsData = {
    totalRelatorios: 24,
    relatoriosGerados: 18,
    visualizacoes: 342,
    downloads: 156
  }

  const recentReports = [
    {
      id: 1,
      title: "Relatório Mensal de Membros",
      description: "Análise completa do desempenho dos membros no último mês",
      category: "membros",
      date: "19/09/2025",
      views: 45,
      downloads: 12,
      status: "published"
    },
    {
      id: 2,
      title: "Análise Financeira Q3 2025",
      description: "Relatório detalhado das receitas e despesas do terceiro trimestre",
      category: "financeiro", 
      date: "15/09/2025",
      views: 67,
      downloads: 23,
      status: "published"
    },
    {
      id: 3,
      title: "Performance de Eventos",
      description: "Estatísticas de participação e engajamento nos eventos realizados",
      category: "eventos",
      date: "12/09/2025",
      views: 34,
      downloads: 15,
      status: "draft"
    },
    {
      id: 4,
      title: "Sistema de Pontuação - Ranking",
      description: "Análise do sistema de gamificação e ranking dos membros",
      category: "pontuacao",
      date: "08/09/2025",
      views: 89,
      downloads: 34,
      status: "published"
    }
  ]

  const reportTemplates = [
    {
      id: 1,
      name: "Relatório de Membros",
      description: "Dados dos membros, estatísticas de engajamento e performance",
      icon: Users,
      category: "membros",
      fields: ["Nome", "Email", "Pontuação", "Último acesso", "Status"]
    },
    {
      id: 2,
      name: "Relatório Financeiro",
      description: "Análise de receitas, despesas e indicadores financeiros",
      icon: DollarSign,
      category: "financeiro", 
      fields: ["Receitas", "Despesas", "Lucro líquido", "ROI", "Fluxo de caixa"]
    },
    {
      id: 3,
      name: "Relatório de Eventos",
      description: "Estatísticas de eventos, participação e feedback",
      icon: Calendar,
      category: "eventos",
      fields: ["Nome do evento", "Data", "Participantes", "Taxa presença", "Avaliação"]
    },
    {
      id: 4,
      name: "Relatório de Pontuação",
      description: "Sistema de gamificação, ranking e conquistas dos membros",
      icon: Award,
      category: "pontuacao",
      fields: ["Membro", "Pontos totais", "Pontos mensais", "Ranking", "Conquistas"]
    }
  ]

  const handleGenerateReport = (templateId: number) => {
    setIsLoading(true)
    // Simular geração de relatório
    setTimeout(() => {
      setIsLoading(false)
      alert('Relatório gerado com sucesso!')
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return '#10b981'
      case 'draft': return '#f59e0b'
      default: return colors.text.tertiary
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'published': return 'Publicado'
      case 'draft': return 'Rascunho'
      default: return 'Desconhecido'
    }
  }

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '32px' 
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: colors.text.primary,
              margin: 0,
              marginBottom: '8px',
              transition: 'color 0.3s ease'
            }}>
              Relatórios
            </h1>
            <p style={{
              fontSize: '16px',
              color: colors.text.secondary,
              margin: 0,
              transition: 'color 0.3s ease'
            }}>
              Análises, métricas e relatórios gerenciais completos
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: colors.bg.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: '8px',
              color: colors.text.primary,
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = colors.bg.tertiary
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = colors.bg.secondary
            }}>
              <RefreshCw style={{ width: '16px', height: '16px' }} />
              Atualizar
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            borderRadius: '12px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <FileText style={{ width: '24px', height: '24px' }} />
              <span style={{ fontSize: '14px', fontWeight: '500', opacity: 0.9 }}>Total Relatórios</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
              {metricsData.totalRelatorios}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              +3 este mês
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <TrendingUp style={{ width: '24px', height: '24px' }} />
              <span style={{ fontSize: '14px', fontWeight: '500', opacity: 0.9 }}>Relatórios Gerados</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
              {metricsData.relatoriosGerados}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              75% do total
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            borderRadius: '12px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Eye style={{ width: '24px', height: '24px' }} />
              <span style={{ fontSize: '14px', fontWeight: '500', opacity: 0.9 }}>Visualizações</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
              {metricsData.visualizacoes}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              +12% vs mês anterior
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Download style={{ width: '24px', height: '24px' }} />
              <span style={{ fontSize: '14px', fontWeight: '500', opacity: 0.9 }}>Downloads</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
              {metricsData.downloads}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              46% taxa conversão
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
          
          {/* Templates de Relatórios */}
          <div style={getCardStyle()}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: colors.text.primary,
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                Templates de Relatórios
              </h3>
              <BarChart3 style={{ 
                width: '20px', 
                height: '20px', 
                color: colors.text.tertiary 
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reportTemplates.map((template) => {
                const IconComponent = template.icon
                return (
                  <div key={template.id} style={{
                    padding: '16px',
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = colors.bg.tertiary
                    e.currentTarget.style.borderColor = colors.border.secondary
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = colors.border.primary
                  }}
                  onClick={() => handleGenerateReport(template.id)}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <IconComponent style={{ 
                        width: '20px', 
                        height: '20px', 
                        color: '#8b5cf6',
                        marginTop: '2px'
                      }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: colors.text.primary,
                          margin: '0 0 4px 0',
                          transition: 'color 0.3s ease'
                        }}>
                          {template.name}
                        </h4>
                        <p style={{
                          fontSize: '12px',
                          color: colors.text.secondary,
                          margin: '0 0 8px 0',
                          lineHeight: '1.4',
                          transition: 'color 0.3s ease'
                        }}>
                          {template.description}
                        </p>
                        <div style={{
                          fontSize: '11px',
                          color: colors.text.tertiary,
                          transition: 'color 0.3s ease'
                        }}>
                          {template.fields.length} campos disponíveis
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Relatórios Recentes */}
          <div style={getCardStyle()}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: colors.text.primary,
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                Relatórios Recentes
              </h3>
              <Filter style={{ 
                width: '20px', 
                height: '20px', 
                color: colors.text.tertiary,
                cursor: 'pointer'
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentReports.map((report) => (
                <div key={report.id} style={{
                  padding: '16px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = colors.bg.tertiary
                  e.currentTarget.style.borderColor = colors.border.secondary
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = colors.border.primary
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.text.primary,
                      margin: 0,
                      flex: 1,
                      transition: 'color 0.3s ease'
                    }}>
                      {report.title}
                    </h4>
                    <div style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: getStatusColor(report.status) + '20',
                      border: `1px solid ${getStatusColor(report.status)}`,
                      fontSize: '10px',
                      fontWeight: '500',
                      color: getStatusColor(report.status)
                    }}>
                      {getStatusText(report.status)}
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '12px',
                    color: colors.text.secondary,
                    margin: '0 0 12px 0',
                    lineHeight: '1.4',
                    transition: 'color 0.3s ease'
                  }}>
                    {report.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px',
                      color: colors.text.tertiary,
                      transition: 'color 0.3s ease'
                    }}>
                      {report.date}
                    </span>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye style={{ width: '12px', height: '12px', color: colors.text.tertiary }} />
                        <span style={{ fontSize: '11px', color: colors.text.tertiary }}>
                          {report.views}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Download style={{ width: '12px', height: '12px', color: colors.text.tertiary }} />
                        <span style={{ fontSize: '11px', color: colors.text.tertiary }}>
                          {report.downloads}
                        </span>
                      </div>
                      <Share style={{ 
                        width: '14px', 
                        height: '14px', 
                        color: colors.text.tertiary,
                        cursor: 'pointer'
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: colors.bg.primary,
              padding: '32px',
              borderRadius: '12px',
              textAlign: 'center',
              maxWidth: '300px'
            }}>
              <RefreshCw style={{ 
                width: '32px', 
                height: '32px', 
                color: '#8b5cf6',
                animation: 'spin 1s linear infinite',
                marginBottom: '16px'
              }} />
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: colors.text.primary,
                margin: '0 0 8px 0'
              }}>
                Gerando Relatório
              </h3>
              <p style={{
                fontSize: '14px',
                color: colors.text.secondary,
                margin: 0
              }}>
                Por favor, aguarde...
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
