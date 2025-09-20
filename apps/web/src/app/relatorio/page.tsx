'use client';
import { useState, useEffect } from 'react';
import { useThemedStyles } from '../../hooks/use-themed-styles';
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
  RefreshCw
} from 'lucide-react';
import { api } from '../../lib/api';

export default function RelatorioPage() {
  const { colors } = useThemedStyles();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalMembers: 0,
      activeMembers: 0,
      totalPoints: 0,
      averagePoints: 0,
      monthlyGrowth: 0
    },
    pointsDistribution: [],
    memberActivity: [],
    performanceMetrics: []
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Fetch overview data
      const overviewResponse = await api.get('/points/overview');
      const leaderboardResponse = await api.get('/points/leaderboard?limit=10');
      
      setAnalyticsData({
        overview: {
          totalMembers: overviewResponse.data.totalMembers || 0,
          activeMembers: overviewResponse.data.totalMembers || 0,
          totalPoints: overviewResponse.data.totalPoints || 0,
          averagePoints: Math.round(overviewResponse.data.averagePoints || 0),
          monthlyGrowth: 15.2 // Mock data for demo
        },
        pointsDistribution: leaderboardResponse.data || [],
        memberActivity: [
          { month: 'Jan', points: 450 },
          { month: 'Fev', points: 520 },
          { month: 'Mar', points: 680 },
          { month: 'Abr', points: 750 },
          { month: 'Mai', points: 890 },
          { month: 'Jun', points: 1025 }
        ],
        performanceMetrics: [
          { category: 'Presença', points: 840, trend: '+12%' },
          { category: 'Reuniões', points: 620, trend: '+8%' },
          { category: 'Visitantes', points: 380, trend: '+25%' },
          { category: 'Recomendações', points: 590, trend: '+18%' }
        ]
      });
    } catch (error) {
      console.error('Erro ao carregar dados analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportReport = () => {
    // Mock export functionality
    console.log('Exportando relatório...');
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: colors.bg.secondary,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: colors.text.primary,
            marginBottom: '8px'
          }}>
            Relatórios e Analytics
          </h1>
          <p style={{
            color: colors.text.secondary,
            fontSize: '16px'
          }}>
            Análises detalhadas de performance, membros e engajamento
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '8px 16px',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: '8px',
              backgroundColor: colors.bg.primary,
              color: colors.text.primary,
              fontSize: '14px'
            }}
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="1y">Último ano</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={fetchAnalyticsData}
            disabled={isLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: colors.bg.tertiary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: '8px',
              color: colors.text.primary,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            <RefreshCw style={{ width: '16px', height: '16px' }} />
            {isLoading ? 'Atualizando...' : 'Atualizar'}
          </button>

          {/* Export Button */}
          <button
            onClick={exportReport}
            style={{
              padding: '8px 16px',
              background: colors.brand.gradient,
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '500'
            }}
          >
            <Download style={{ width: '16px', height: '16px' }} />
            Exportar
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {[
          {
            title: 'Total de Membros',
            value: analyticsData.overview.totalMembers,
            icon: Users,
            color: '#3b82f6',
            trend: '+12%'
          },
          {
            title: 'Membros Ativos',
            value: analyticsData.overview.activeMembers,
            icon: TrendingUp,
            color: '#10b981',
            trend: '+8%'
          },
          {
            title: 'Total de Pontos',
            value: analyticsData.overview.totalPoints.toLocaleString(),
            icon: Award,
            color: '#8b5cf6',
            trend: '+25%'
          },
          {
            title: 'Média de Pontos',
            value: analyticsData.overview.averagePoints,
            icon: Target,
            color: '#f59e0b',
            trend: '+5%'
          }
        ].map((card, index) => (
          <div
            key={index}
            style={{
              backgroundColor: colors.bg.primary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px'
            }}>
              <div style={{
                backgroundColor: `${card.color}20`,
                padding: '8px',
                borderRadius: '8px'
              }}>
                <card.icon style={{ width: '20px', height: '20px', color: card.color }} />
              </div>
              <span style={{
                fontSize: '12px',
                color: '#10b981',
                fontWeight: '500'
              }}>
                {card.trend}
              </span>
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: colors.text.primary,
              marginBottom: '4px'
            }}>
              {card.value}
            </h3>
            <p style={{
              fontSize: '14px',
              color: colors.text.secondary
            }}>
              {card.title}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Points Distribution Chart */}
        <div style={{
          backgroundColor: colors.bg.primary,
          border: `1px solid ${colors.border.primary}`,
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: colors.text.primary,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <BarChart3 style={{ width: '20px', height: '20px', color: colors.brand.primary }} />
            Top 5 Membros - Pontuação
          </h3>
          
          <div style={{ space: '12px' }}>
            {analyticsData.pointsDistribution.slice(0, 5).map((member, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: index < 4 ? `1px solid ${colors.border.secondary}` : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: colors.brand.primary,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  <div>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      margin: 0
                    }}>
                      {member.member?.firstName} {member.member?.lastName}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: colors.text.secondary,
                      margin: 0
                    }}>
                      {member.member?.email}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    {member.totalPoints}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: colors.text.secondary,
                    margin: 0
                  }}>
                    pontos
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance by Category */}
        <div style={{
          backgroundColor: colors.bg.primary,
          border: `1px solid ${colors.border.primary}`,
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: colors.text.primary,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Target style={{ width: '20px', height: '20px', color: colors.brand.primary }} />
            Performance por Categoria
          </h3>
          
          <div style={{ space: '16px' }}>
            {analyticsData.performanceMetrics.map((metric, index) => (
              <div key={index} style={{
                padding: '16px 0',
                borderBottom: index < analyticsData.performanceMetrics.length - 1 ? `1px solid ${colors.border.secondary}` : 'none'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.primary
                  }}>
                    {metric.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: colors.text.primary
                    }}>
                      {metric.points}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#10b981',
                      fontWeight: '500'
                    }}>
                      {metric.trend}
                    </span>
                  </div>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: colors.bg.tertiary,
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(metric.points / 1000) * 100}%`,
                    height: '100%',
                    backgroundColor: colors.brand.primary,
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div style={{
        backgroundColor: colors.bg.primary,
        border: `1px solid ${colors.border.primary}`,
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: colors.text.primary,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Calendar style={{ width: '20px', height: '20px', color: colors.brand.primary }} />
          Evolução Mensal de Pontos
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '16px'
        }}>
          {analyticsData.memberActivity.map((month, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '16px 8px'
            }}>
              <div style={{
                height: '80px',
                backgroundColor: colors.bg.tertiary,
                borderRadius: '8px',
                marginBottom: '8px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${(month.points / 1200) * 100}%`,
                  backgroundColor: colors.brand.primary,
                  borderRadius: '8px',
                  transition: 'height 0.3s ease'
                }} />
              </div>
              <p style={{
                fontSize: '12px',
                color: colors.text.secondary,
                margin: '4px 0'
              }}>
                {month.month}
              </p>
              <p style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: colors.text.primary,
                margin: 0
              }}>
                {month.points}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
