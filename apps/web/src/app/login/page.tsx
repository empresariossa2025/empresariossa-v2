'use client';
import { useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useThemedStyles } from '../../hooks/use-themed-styles';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();
  const { colors } = useThemedStyles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      router.push('/');
    } else {
      setError('Invalid credentials');
    }
    
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
        border: `1px solid ${colors.border.primary}`,
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ 
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
                color: colors.text.primary
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
                color: colors.text.primary
              }}
            />
          </div>
          
          {error && (
            <div style={{
              color: '#ef4444',
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
              background: colors.brand.gradient,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
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
