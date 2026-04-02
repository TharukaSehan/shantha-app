'use client';
import { useFormState } from 'react-dom';
import { loginAdmin } from '../auth';

const initialState = {
  message: null,
};

export default function Login() {
  const [state, formAction] = useFormState(loginAdmin, initialState);

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form action={formAction} className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--accent-color)', marginBottom: '10px' }}>Admin Login</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>Use admin / admin</p>
        
        {state?.error && <div style={{ color: 'var(--danger-color)', textAlign: 'center', fontSize: '0.9rem' }}>{state.error}</div>}

        <input type="text" name="username" placeholder="Username" required style={inputStyle} />
        <input type="password" name="password" placeholder="Password" required style={inputStyle} />
        
        <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>Login</button>
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
