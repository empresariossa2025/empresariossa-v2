'use client';
import { useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { useThemedStyles } from '../../hooks/use-themed-styles';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { colors } = useThemedStyles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const success = await login(email, password);
    
    if (!success) {
      setError('Invalid credentials');
    }
    // Nota: NON facciamo redirect manuale qui
    // L'AuthContext gestisce automaticamente il redirect basato sui ruoli
    
    setIsLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg.secondary
    }}>
      <div style={{
        backgroundColor: colors.bg.primary,
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: colors.text.primary,
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Login - Empresariossa
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${colors.border.primary}`,
                borderRadius: '8px',
                backgroundColor: colors.bg.primary,
                color: colors.text.primary,
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${colors.border.primary}`,
                borderRadius: '8px',
                backgroundColor: colors.bg.primary,
                color: colors.text.primary,
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          
          {error && (
            <div style={{
              color: '#ef4444',
              fontSize: '14px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isLoading ? colors.bg.tertiary : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <p style={{
          marginTop: '16px',
          textAlign: 'center',
          color: colors.text.secondary,
          fontSize: '14px'
        }}>
          Test: test@empresariossa.com / TestPassword123!
        </p>
      </div>
    </div>
  );
}
