'use client';
import { useAuth } from '@/contexts/auth-context';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { 
  Home, Users, Calendar, Briefcase, Trophy, User, Settings, LogOut,
  Bell, Search, ChevronRight
} from 'lucide-react';

export function MembersLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { colors } = useThemedStyles();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/membros', active: true },
    { icon: Users, label: 'Minha Rede', href: '/membros/rede' },
    { icon: Calendar, label: 'Eventos', href: '/membros/eventos' },
    { icon: Briefcase, label: 'Negócios', href: '/membros/negocios' },
    { icon: Trophy, label: 'Pontuação', href: '/membros/pontuacao' },
    { icon: User, label: 'Meu Perfil', href: '/membros/perfil' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg.secondary }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        background: colors.bg.primary,
        borderRight: `1px solid ${colors.border.primary}`,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header da Sidebar */}
        <div style={{
          padding: '24px',
          borderBottom: `1px solid ${colors.border.primary}`
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '8px',
            padding: '16px',
            color: 'white',
            marginBottom: '12px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
              Área do Membro
            </h3>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            fontSize: '12px'
          }}>
            <div style={{
              background: colors.bg.tertiary,
              padding: '8px',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: '600', color: colors.text.primary }}>1,250</div>
              <div style={{ color: colors.text.tertiary }}>Pontos</div>
            </div>
            <div style={{
              background: colors.bg.tertiary,
              padding: '8px',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: '600', color: colors.text.primary }}>#8</div>
              <div style={{ color: colors.text.tertiary }}>Ranking</div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  color: item.active ? '#10b981' : colors.text.secondary,
                  background: item.active ? colors.bg.tertiary : 'transparent',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: item.active ? '600' : '500',
                  transition: 'all 0.2s ease',
                  borderRight: item.active ? '3px solid #10b981' : 'none'
                }}
              >
                <Icon style={{ width: '18px', height: '18px' }} />
                {item.label}
                {!item.active && <ChevronRight style={{ width: '14px', height: '14px', marginLeft: 'auto' }} />}
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{
          padding: '16px 24px',
          borderTop: `1px solid ${colors.border.primary}`
        }}>
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '12px 0',
              background: 'none',
              border: 'none',
              color: colors.text.tertiary,
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <LogOut style={{ width: '16px', height: '16px' }} />
            Sair da Conta
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{
          background: colors.bg.primary,
          borderBottom: `1px solid ${colors.border.primary}`,
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: colors.text.primary,
            margin: 0
          }}>
            Dashboard
          </h1>
          
          <div style={{ position: 'relative' }}>
            <Search style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: colors.text.tertiary
            }} />
            <input
              type="text"
              placeholder="Buscar membros, eventos..."
              style={{
                padding: '10px 10px 10px 40px',
                border: `1px solid ${colors.border.primary}`,
                borderRadius: '8px',
                background: colors.bg.secondary,
                color: colors.text.primary,
                fontSize: '14px',
                width: '300px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 16px',
            background: colors.bg.tertiary,
            borderRadius: '12px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: colors.text.primary
              }}>
                {user?.firstName}
              </div>
              <div style={{
                fontSize: '12px',
                color: colors.text.tertiary
              }}>
                Membro Ativo
              </div>
            </div>
          </div>
        </header>

        <main style={{
          flex: 1,
          background: colors.bg.secondary,
          overflow: 'auto'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
