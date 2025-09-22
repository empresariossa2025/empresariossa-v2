'use client';
import { useAuth } from '@/contexts/auth-context';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { ResponsiveLayout } from '@/components/layout/responsive/responsive-layout';
import {
  TrendingUp,
  Users,
  Calendar,
  Target,
  Award,
  Clock,
  ArrowUpRight,
  MapPin,
  Star,
  Zap
} from 'lucide-react';
export default function MembrosPage() {
  const { user } = useAuth();
  const { colors } = useThemedStyles();
  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }: any) => (
    <div style={{
      background: colors.bg.primary,
      borderRadius: '16px',
      padding: '24px',
      border: `1px solid ${colors.border.primary}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
        {trend && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: trend > 0 ? '#10b981' : '#ef4444',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <h3 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: colors.text.primary,
        margin: '0 0 4px 0'
      }}>
        {value}
      </h3>
      <p style={{
        fontSize: '14px',
        color: colors.text.secondary,
        margin: '0 0 4px 0',
        fontWeight: '600'
      }}>
        {title}
      </p>
      <p style={{
        fontSize: '12px',
        color: colors.text.tertiary,
        margin: 0
      }}>
        {subtitle}
      </p>
    </div>
  );
  const QuickAction = ({ label, icon: Icon, color }: any) => (
    <button style={{
      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
      border: 'none',
      borderRadius: '12px',
      padding: '16px',
      cursor: 'pointer',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.2s ease'
    }}>
      <Icon style={{ width: '20px', height: '20px', color: 'white' }} />
      <span style={{
        color: 'white',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        {label}
      </span>
    </button>
  );
  const EventCard = ({ title, date, location, attendees }: any) => (
    <div style={{
      background: colors.bg.tertiary,
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      border: `1px solid ${colors.border.primary}`
    }}>
      <h4 style={{
        color: colors.text.primary,
        fontSize: '14px',
        fontWeight: '600',
        margin: '0 0 8px 0'
      }}>
        {title}
      </h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: colors.text.tertiary }}>
        <span>📅 {date}</span>
        <span>📍 {location}</span>
        <span>👥 {attendees}</span>
      </div>
    </div>
  );
  const recentActivities = [
    { action: 'Participou do evento "Workshop de Vendas"', time: '2 horas atrás', points: '+50 pts' },
    { action: 'Nova conexão com Maria Silva', time: '1 dia atrás', points: '+10 pts' },
    { action: 'Completou objetivo "Networking Mensal"', time: '3 dias atrás', points: '+100 pts' }
  ];
  return (
    <ResponsiveLayout title="Dashboard">
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        color: 'white',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          margin: '0 0 8px 0'
        }}>
          Olá, {user?.firstName || 'Membro'}! 👋
        </h1>
        <p style={{
          fontSize: '16px',
          opacity: 0.9,
          margin: 0
        }}>
          Acompanhe seu progresso e mantenha-se conectado com sua rede empresarial
        </p>
      </div>
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <StatCard
          title="Pontos Totais"
          value="1,250"
          subtitle="Ranking #8 de 120 membros"
          icon={Award}
          color="#8b5cf6"
          trend={12}
        />
        <StatCard
          title="Conexões Ativas"
          value="47"
          subtitle="15 novas este mês"
          icon={Users}
          color="#10b981"
          trend={8}
        />
        <StatCard
          title="Eventos Participados"
          value="23"
          subtitle="6 eventos este mês"
          icon={Calendar}
          color="#f59e0b"
          trend={15}
        />
        <StatCard
          title="Meta Mensal"
          value="78%"
          subtitle="156/200 pontos"
          icon={Target}
          color="#ef4444"
        />
      </div>
      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column */}
        <div>
          {/* Performance Chart */}
          <div style={{
            background: colors.bg.primary,
            borderRadius: '16px',
            padding: '24px',
            border: `1px solid ${colors.border.primary}`,
            marginBottom: '24px'
          }}>
            <h3 style={{
              color: colors.text.primary,
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 24px 0'
            }}>
              Performance dos Últimos 6 Meses
            </h3>
            <div style={{
              height: '200px',
              background: colors.bg.secondary,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.text.tertiary
            }}>
              📊 Gráfico de Performance (Implementar com Recharts)
            </div>
          </div>
          {/* Recent Activity */}
          <div style={{
            background: colors.bg.primary,
            borderRadius: '16px',
            padding: '24px',
            border: `1px solid ${colors.border.primary}`
          }}>
            <h3 style={{
              color: colors.text.primary,
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 16px 0'
            }}>
              Atividade Recente
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivities.map((activity, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: colors.bg.tertiary,
                  borderRadius: '8px'
                }}>
                  <div>
                    <p style={{
                      color: colors.text.primary,
                      margin: '0 0 4px 0',
                      fontSize: '14px'
                    }}>
                      {activity.action}
                    </p>
                    <p style={{
                      color: colors.text.tertiary,
                      margin: 0,
                      fontSize: '12px'
                    }}>
                      {activity.time}
                    </p>
                  </div>
                  <span style={{
                    color: '#10b981',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {activity.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div>
          {/* Quick Actions */}
          <div style={{
            background: colors.bg.primary,
            borderRadius: '16px',
            padding: '24px',
            border: `1px solid ${colors.border.primary}`,
            marginBottom: '24px'
          }}>
            <h3 style={{
              color: colors.text.primary,
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 16px 0'
            }}>
              Ações Rápidas
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <QuickAction label="Agendar Reunião" icon={Calendar} color="#8b5cf6" />
              <QuickAction label="Encontrar Conexões" icon={Users} color="#10b981" />
              <QuickAction label="Ver Eventos" icon={Clock} color="#f59e0b" />
              <QuickAction label="Indicar Membro" icon={Star} color="#ef4444" />
            </div>
          </div>
          {/* Upcoming Events */}
          <div style={{
            background: colors.bg.primary,
            borderRadius: '16px',
            padding: '24px',
            border: `1px solid ${colors.border.primary}`
          }}>
            <h3 style={{
              color: colors.text.primary,
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 16px 0'
            }}>
              Próximos Eventos
            </h3>
            <EventCard
              title="Networking Breakfast"
              date="25 Set"
              location="Matriz"
              attendees="23 inscritos"
            />
            <EventCard
              title="Workshop IA"
              date="01 Out"
              location="Online"
              attendees="45 inscritos"
            />
            <EventCard
              title="Happy Hour"
              date="08 Out"
              location="Barra"
              attendees="12 inscritos"
            />
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
