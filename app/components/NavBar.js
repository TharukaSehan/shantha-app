'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check cart
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    };
    
    // Check user session
    const sessionUrl = localStorage.getItem('user_session');
    if (sessionUrl) {
      try {
        setUser(JSON.parse(sessionUrl));
      } catch (e) {}
    }

    updateCart();
    window.addEventListener('storage', updateCart);
    window.addEventListener('cart-updated', updateCart);
    return () => {
      window.removeEventListener('storage', updateCart);
      window.removeEventListener('cart-updated', updateCart);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <nav style={{ padding: '20px 0', borderBottom: '1px solid var(--glass-border)', background: 'rgba(15, 17, 26, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--accent-color)' }}>
          <Link href="/">Shantha Traders</Link>
        </h1>
        <ul style={{ display: 'flex', gap: '30px', listStyle: 'none', margin: 0, alignItems: 'center' }}>
          <li><Link href="/" style={{ fontWeight: 500 }}>Home</Link></li>
          <li><Link href="/products" style={{ fontWeight: 500 }}>Products</Link></li>
          <li>
            <Link href="/cart" style={{ fontWeight: 800, padding: '8px 16px', background: 'var(--surface-color)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
              Cart ({cartCount})
            </Link>
          </li>
          {user ? (
            <li>
              <span style={{ color: 'var(--text-secondary)', marginRight: '15px' }}>Hi, {user.name}</span>
              <button onClick={handleLogout} style={{ background: 'transparent', color: 'var(--danger-color)', fontWeight: 500 }}>Logout</button>
            </li>
          ) : (
            <li><Link href="/login" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>User Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  )
}
