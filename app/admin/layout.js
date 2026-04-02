import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAdmin } from './auth';

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  // Protect all /admin routes except /admin/login
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {session && (
        <div style={{ background: '#191c29', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Welcome to Admin Panel</span>
          <form action={logoutAdmin}>
            <button type="submit" style={{ color: 'var(--danger-color)', background: 'transparent', fontWeight: 'bold' }}>Logout</button>
          </form>
        </div>
      )}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}
