import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await authService.resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
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
          Reset Password
        </h1>
        <p style={{
          color: '#888',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          Enter your email to receive a password reset link
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

        {success && (
          <div style={{
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '4px',
            padding: '12px',
            marginBottom: '20px',
            color: '#22c55e'
          }}>
            Password reset email sent! Check your inbox for further instructions.
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
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
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
          </form>
        )}

        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          color: '#888',
          fontSize: '14px'
        }}>
          Remember your password?{' '}
          <Link
            to="/signin"
            style={{
              color: '#4dabf7',
              textDecoration: 'none'
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;