import { readData } from './lib/db';
import Link from 'next/link';

export default async function Home() {
  const products = readData('products');

  return (
    <div>
      {/* Hero Section */}
      <section style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'url(/images/slider/1.png) center/cover no-repeat', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-color), transparent)' }}></div>
        <div className="container animate-fade-in-up" style={{ position: 'relative', zIndex: 10 }}>
          <span style={{ color: 'var(--accent-color)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Exclusive Awurudu Season</span>
          <h1 style={{ fontSize: '4.5rem', margin: '20px 0' }}>Elegance Defined.</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}>Discover the perfect piece to celebrate life's most precious moments with Shantha Traders.</p>
          <Link href="/products" className="btn-primary" style={{ display: 'inline-block' }}>Discover Collection</Link>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Featured Pieces</h2>
            <div style={{ width: '60px', height: '3px', background: 'var(--accent-color)', margin: '20px auto' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {products.slice(0, 4).map((product, idx) => (
              <div key={product.id} className={`glass-panel product-card animate-fade-in-up`} style={{ animationDelay: `${idx * 100}ms` }}>
                <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 15, right: 15, background: 'var(--accent-color)', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>New</div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{product.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>Rs. {product.price.toLocaleString()}</p>
                  <button className="btn-secondary" style={{ width: '100%' }}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Instagram & Feedback Section */}
      <section style={{ width: '100%', marginTop: '80px' }}>
        {/* Instagram Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', height: '250px', width: '100%' }}>
          {['/images/slider/1.png', '/images/product/1.jpg', '/images/slider/2.jpg', '/images/banner/bg-2.jpg', '/images/banner/bg-1.jpg'].map((img, idx) => (
            <div key={idx} style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={img} alt="Instagram post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
          {/* Last image with overlay */}
          <div style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
            <img src="/images/slider/3.jpg" alt="Instagram post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(205, 75, 100, 0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background-color 0.3s' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>@ Shantha_Traders</span>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div style={{ backgroundColor: '#fff', padding: '60px 20px', textAlign: 'center', color: '#333' }}>
          <p style={{ fontSize: '1.2rem', color: '#777', marginBottom: '30px' }}>Enter your feedbacks about our Services</p>
          <form style={{ display: 'flex', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <input type="text" placeholder="Enter Feedbacks ..." required style={{ flex: 1, padding: '18px 20px', border: '1px solid #555', borderRight: 'none', outline: 'none', fontSize: '1rem', color: '#000', backgroundColor: '#fff' }} />
            <button type="submit" style={{ backgroundColor: '#b38222', color: '#fff', border: '1px solid #b38222', padding: '0 40px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.3s' }}>Feedbacks</button>
          </form>
        </div>
      </section>
    </div>
  )
}
