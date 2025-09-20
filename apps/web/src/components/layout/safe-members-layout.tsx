'use client';
import { useAuth } from '@/contexts/auth-context';
import { useThemedStyles } from '@/hooks/use-themed-styles';

export function SafeMembersLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { colors } = useThemedStyles();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar semplice */}
      <div style={{
        width: '250px',
        background: colors.bg.primary,
        borderRight: `1px solid ${colors.border.primary}`,
        padding: '20px'
      }}>
        <h3 style={{ color: colors.text.primary, marginBottom: '20px' }}>
          Área do Membro
        </h3>
        <p style={{ color: colors.text.secondary, fontSize: '14px' }}>
          {user?.firstName} {user?.lastName}
        </p>
        
        <nav style={{ marginTop: '30px' }}>
          <div style={{ color: colors.text.primary, padding: '10px 0', fontWeight: '600' }}>Dashboard</div>
          <div style={{ color: colors.text.secondary, padding: '10px 0' }}>Minha Rede</div>
          <div style={{ color: colors.text.secondary, padding: '10px 0' }}>Eventos</div>
          <div style={{ color: colors.text.secondary, padding: '10px 0' }}>Negócios</div>
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

      {/* Contenuto */}
      <div style={{ flex: 1, background: colors.bg.secondary }}>
        {children}
      </div>
    </div>
  );
}
