'use client';
import { useAuth } from '@/contexts/auth-context';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { ProMembersSidebar } from '@/components/layout/pro-members-sidebar';
import { SimpleEnhancedHeader } from '@/components/layout/simple-enhanced-header';

export default function MembrosPage() {
  const { user } = useAuth();
  const { colors } = useThemedStyles();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <ProMembersSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SimpleEnhancedHeader title="Dashboard Membros" area="member" />
        <main style={{ flex: 1, background: colors.bg.secondary, padding: '32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <h2 style={{ fontSize: '48px', margin: '0 0 16px 0' }}>1,250</h2>
            <p style={{ fontSize: '18px', margin: 0 }}>
              Pontos • Ranking #8 de 120 membros
            </p>
            <p style={{ fontSize: '16px', margin: '8px 0 0 0', opacity: 0.9 }}>
              Olá, {user?.firstName} {user?.lastName}!
            </p>
          </div>
          <div style={{ color: colors.text.secondary }}>
            ✅ Header completo com avatar e theme toggle<br/>
            ✅ Sidebar professionale viola<br/>
            ✅ Layout completo área membros<br/>
            ✅ Sistema pronto para uso
          </div>
        </main>
      </div>
    </div>
  );
}
