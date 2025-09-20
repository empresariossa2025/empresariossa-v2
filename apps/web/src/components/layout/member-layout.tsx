'use client';
import { useAuth } from '@/contexts/auth-context';
import { useThemedStyles } from '@/hooks/use-themed-styles';

export function MemberLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { colors } = useThemedStyles();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Simple Sidebar */}
      <div style={{
        width: '250px',
        background: colors.bg.primary,
        padding: '20px',
        borderRight: `1px solid ${colors.border.primary}`
      }}>
        <h2 style={{ color: colors.text.primary, marginBottom: '20px' }}>
          Área do Membro
        </h2>
        <p style={{ color: colors.text.secondary, fontSize: '14px' }}>
          {user?.firstName} {user?.lastName}
        </p>
        
        <nav style={{ marginTop: '30px' }}>
          <div style={{ color: colors.text.primary, padding: '10px 0' }}>Dashboard</div>
          <div style={{ color: colors.text.primary, padding: '10px 0' }}>Minha Rede</div>
          <div style={{ color: colors.text.primary, padding: '10px 0' }}>Eventos</div>
          <div style={{ color: colors.text.primary, padding: '10px 0' }}>Negócios</div>
        </nav>
        
        <button 
          onClick={logout}
          style={{
            marginTop: '40px',
            padding: '8px 16px',
            background: 'none',
            border: `1px solid ${colors.border.primary}`,
            color: colors.text.secondary,
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sair
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: colors.bg.secondary }}>
        {children}
      </div>
    </div>
  );
}
