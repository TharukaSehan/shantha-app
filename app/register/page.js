'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function UserRegister() {
  const [error, setError] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (name && email && password) {
      localStorage.setItem('user_session', JSON.stringify({ email, name }));
      window.location.href = '/';
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleRegister} className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--accent-color)', marginBottom: '10px' }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>Join Shantha Traders</p>

        {error && <div style={{ color: 'var(--danger-color)', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

        <input type="text" name="name" placeholder="Full Name" required style={inputStyle} />
        <input type="email" name="email" placeholder="Email Address" required style={inputStyle} />
        <input type="password" name="password" placeholder="Password" required style={inputStyle} />

        <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>Register</button>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--accent-color)' }}>Login</Link>
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
