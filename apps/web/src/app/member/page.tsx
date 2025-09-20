'use client';
import { useAuth } from '@/contexts/auth-context';

export default function MemberPage() {
  const { user } = useAuth();
  
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>🎉 Member Area - Redirect Funziona!</h1>
      <p>Benvenuto: {user?.firstName} {user?.lastName}</p>
      <p>Ruolo: {user?.role}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
