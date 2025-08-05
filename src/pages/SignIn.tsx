import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.signIn({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await authService.signInWithGoogle();
      // Google OAuth redirects automatically
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#2a2a2a',
        borderRadius: '8px',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          Sign In
        </h1>
        <p style={{
          color: '#888',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          Welcome back to Pagayi
        </p>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '4px',
            padding: '12px',
            marginBottom: '20px',
            color: '#ef4444'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#ccc',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #444',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '16px'
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: '#ccc',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #444',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '16px'
              }}
              placeholder="Enter your password"
            />
          </div>

          <div style={{
            marginBottom: '24px',
            textAlign: 'right'
          }}>
            <Link
              to="/forgot-password"
              style={{
                color: '#4dabf7',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          position: 'relative',
          marginBottom: '20px'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            right: '0',
            height: '1px',
            backgroundColor: '#444',
            transform: 'translateY(-50%)'
          }}></div>
          <div style={{
            position: 'relative',
            textAlign: 'center',
            backgroundColor: '#2a2a2a',
            display: 'inline-block',
            padding: '0 16px',
            margin: '0 auto',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <span style={{ color: '#888', fontSize: '14px' }}>OR</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#fff',
            color: '#1a1a1a',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          color: '#888',
          fontSize: '14px'
        }}>
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: '#4dabf7',
              textDecoration: 'none'
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;