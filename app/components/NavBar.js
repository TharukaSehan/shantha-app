'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
    window.location.href = '/login';
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="site-nav" style={{ padding: '20px 0', borderBottom: '1px solid var(--glass-border)', background: 'rgba(15, 17, 26, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container nav-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="nav-brand" style={{ fontSize: '1.5rem', margin: 0, color: 'var(--accent-color)' }}>
          <Link href="/">Shantha Traders</Link>
        </h1>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className="nav-links desktop-nav" style={{ display: 'flex', gap: '30px', listStyle: 'none', margin: 0, alignItems: 'center' }}>
          <li><Link href="/" style={{ fontWeight: 500 }}>Home</Link></li>
          <li><Link href="/products" style={{ fontWeight: 500 }}>Products</Link></li>
          <li><Link href="/about" style={{ fontWeight: 500 }}>About</Link></li>
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

      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={closeMobileMenu} />
      )}

      <aside className={`mobile-nav-panel ${isMobileMenuOpen ? 'open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-nav-header">
          <h2 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--accent-color)' }}>Menu</h2>
          <button type="button" aria-label="Close menu" className="mobile-nav-close" onClick={closeMobileMenu}>
            &times;
          </button>
        </div>

        <ul className="mobile-nav-links">
          <li><Link href="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link href="/products" onClick={closeMobileMenu}>Products</Link></li>
          <li><Link href="/about" onClick={closeMobileMenu}>About</Link></li>
          <li><Link href="/cart" onClick={closeMobileMenu}>Cart ({cartCount})</Link></li>
          {user ? (
            <>
              <li><span style={{ color: 'var(--text-secondary)' }}>Hi, {user.name}</span></li>
              <li>
                <button type="button" onClick={handleLogout} className="mobile-logout-btn">Logout</button>
              </li>
            </>
          ) : (
            <li><Link href="/login" onClick={closeMobileMenu}>User Login</Link></li>
          )}
        </ul>
      </aside>
    </nav>
  )
}
