'use client';
import { useAuth } from '@/contexts/auth-context';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Award
} from 'lucide-react';

export default function MemberDashboard() {
  const { user } = useAuth();
  const { colors, getCardStyle } = useThemedStyles();

  // Mock data baseado no sistema de pontos
  const memberStats = {
    pontos: 1250,
    ranking: 8,
    totalMembros: 120,
    pontosEsteMs: 180,
    metaMensal: 300,
    nivel: "Empresário Silver"
  };

  const recentActivities = [
    { tipo: "evento", descricao: "Participou do Networking Rio", pontos: 50, data: "2 dias atrás" },
    { tipo: "indicacao", descricao: "Indicou novo membro: João Silva", pontos: 100, data: "1 semana atrás" },
    { tipo: "reuniao", descricao: "Reunião com Maria Santos", pontos: 30, data: "1 semana atrás" }
  ];

  const proximosEventos = [
    { titulo: "Networking Barra da Tijuca", data: "25 Set", hora: "19:00", local: "Matriz" },
    { titulo: "Workshop: Marketing Digital", data: "30 Set", hora: "14:00", local: "Online" },
    { titulo: "Happy Hour Executivo", data: "5 Out", hora: "18:30", local: "Nova América" }
  ];

  const oportunidadesNegocios = [
    { titulo: "Consultoria em TI", categoria: "Tecnologia", membro: "Carlos Tech", compatibilidade: 95 },
    { titulo: "Serviços Jurídicos", categoria: "Advocacia", membro: "Dra. Ana", compatibilidade: 88 },
    { titulo: "Marketing Digital", categoria: "Marketing", membro: "Pedro Ads", compatibilidade: 82 }
  ];

  const progressoMeta = (memberStats.pontosEsteMs / memberStats.metaMensal) * 100;

  return (
    <div style={{ padding: '32px' }}>
      {/* Hero Section - Pontos e Ranking */}
      <div style={{
        ...getCardStyle(),
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: 'white',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '32px',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0 0 8px 0'
            }}>
              Olá, {user?.firstName}!
            </h1>
            <p style={{
              fontSize: '16px',
              opacity: 0.9,
              margin: 0
            }}>
              {memberStats.nivel}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              margin: '0 0 8px 0'
            }}>
              {memberStats.pontos.toLocaleString()}
            </div>
            <div style={{
              fontSize: '14px',
              opacity: 0.9
            }}>
              Pontos Totais
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <Trophy style={{ width: '24px', height: '24px' }} />
              <span style={{ fontSize: '32px', fontWeight: 'bold' }}>#{memberStats.ranking}</span>
            </div>
            <div style={{
              fontSize: '14px',
              opacity: 0.9
            }}>
              de {memberStats.totalMembros} membros
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Progresso Mensal */}
        <div style={getCardStyle()}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: colors.text.primary,
              margin: 0
            }}>
              Meta do Mês
            </h3>
            <TrendingUp style={{ width: '20px', height: '20px', color: '#10b981' }} />
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: colors.text.primary,
            marginBottom: '8px'
          }}>
            {memberStats.pontosEsteMs}/{memberStats.metaMensal}
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: colors.bg.tertiary,
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '8px'
          }}>
            <div style={{
              width: `${Math.min(progressoMeta, 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10b981, #059669)',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{
            fontSize: '12px',
            color: colors.text.secondary
          }}>
            {progressoMeta.toFixed(0)}% da meta mensal
          </div>
        </div>

        {/* Rede de Contatos */}
        <div style={getCardStyle()}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: colors.text.primary,
              margin: 0
            }}>
              Minha Rede
            </h3>
            <Users style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: colors.text.primary,
            marginBottom: '8px'
          }}>
            47
          </div>
          <div style={{
            fontSize: '12px',
            color: colors.text.secondary
          }}>
            Conexões ativas
          </div>
        </div>

        {/* Eventos */}
        <div style={getCardStyle()}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: colors.text.primary,
              margin: 0
            }}>
              Próximos Eventos
            </h3>
            <Calendar style={{ width: '20px', height: '20px', color: '#8b5cf6' }} />
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: colors.text.primary,
            marginBottom: '8px'
          }}>
            3
          </div>
          <div style={{
            fontSize: '12px',
            color: colors.text.secondary
          }}>
            Esta semana
          </div>
        </div>

        {/* Oportunidades */}
        <div style={getCardStyle()}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: colors.text.primary,
              margin: 0
            }}>
              Oportunidades
            </h3>
            <Briefcase style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: colors.text.primary,
            marginBottom: '8px'
          }}>
            12
          </div>
          <div style={{
            fontSize: '12px',
            color: colors.text.secondary
          }}>
            Compatíveis com seu perfil
          </div>
        </div>
      </div>

      {/* Seções Principais */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '32px'
      }}>
        {/* Atividades Recentes */}
        <div style={getCardStyle()}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: colors.text.primary,
            margin: '0 0 24px 0'
          }}>
            Atividades Recentes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivities.map((atividade, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                background: colors.bg.tertiary,
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: atividade.tipo === 'evento' ? '#8b5cf6' : 
                             atividade.tipo === 'indicacao' ? '#10b981' : '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {atividade.tipo === 'evento' && <Calendar style={{ width: '20px', height: '20px', color: 'white' }} />}
                  {atividade.tipo === 'indicacao' && <Award style={{ width: '20px', height: '20px', color: 'white' }} />}
                  {atividade.tipo === 'reuniao' && <Users style={{ width: '20px', height: '20px', color: 'white' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.primary,
                    marginBottom: '4px'
                  }}>
                    {atividade.descricao}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: colors.text.secondary
                  }}>
                    {atividade.data}
                  </div>
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#10b981'
                }}>
                  +{atividade.pontos} pts
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Eventos e Oportunidades */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Próximos Eventos */}
          <div style={getCardStyle()}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: colors.text.primary,
              margin: '0 0 16px 0'
            }}>
              Próximos Eventos
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {proximosEventos.slice(0, 3).map((evento, index) => (
                <div key={index} style={{
                  padding: '12px',
                  background: colors.bg.tertiary,
                  borderRadius: '6px',
                  borderLeft: `3px solid #8b5cf6`
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.primary,
                    marginBottom: '4px'
                  }}>
                    {evento.titulo}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: colors.text.secondary,
                    marginBottom: '2px'
                  }}>
                    <Calendar style={{ width: '12px', height: '12px' }} />
                    {evento.data} • {evento.hora}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: colors.text.secondary
                  }}>
                    <MapPin style={{ width: '12px', height: '12px' }} />
                    {evento.local}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Oportunidades de Negócio */}
          <div style={getCardStyle()}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: colors.text.primary,
              margin: '0 0 16px 0'
            }}>
              Oportunidades
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {oportunidadesNegocios.slice(0, 3).map((oportunidade, index) => (
                <div key={index} style={{
                  padding: '12px',
                  background: colors.bg.tertiary,
                  borderRadius: '6px',
                  borderLeft: `3px solid #f59e0b`
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.primary,
                    marginBottom: '4px'
                  }}>
                    {oportunidade.titulo}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: colors.text.secondary,
                    marginBottom: '4px'
                  }}>
                    por {oportunidade.membro}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontSize: '11px',
                      color: colors.text.tertiary
                    }}>
                      {oportunidade.categoria}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#10b981'
                    }}>
                      {oportunidade.compatibilidade}% match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
