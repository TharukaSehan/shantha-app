'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function UserLogin() {
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Simplistic mock login for demo purposes
    if (email && password) {
      localStorage.setItem('user_session', JSON.stringify({ email, name: 'Customer' }));
      window.location.href = '/';
    } else {
      setError('Please fill in both fields.');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleLogin} className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--accent-color)', marginBottom: '10px' }}>User Login</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>Sign in to your customer account</p>

        {error && <div style={{ color: 'var(--danger-color)', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

        <input type="email" name="email" placeholder="Email Address" required style={inputStyle} />
        <input type="password" name="password" placeholder="Password" required style={inputStyle} />

        <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>Sign In</button>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Don't have an account? <Link href="/register" style={{ color: 'var(--accent-color)' }}>Register</Link>
        </p>
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid var(--glass-border)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  outline: 'none',
  fontFamily: 'inherit'
};
