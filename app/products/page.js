import { readData } from '../lib/db';
import AddToCartButton from '../components/AddToCartButton';

export default async function Products() {
  const products = readData('products');
  const categories = readData('categories');

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem' }}>The Collection</h1>
        {/* Simple mock filter */}
        <select className="glass-panel" style={{ padding: '10px 20px', color: 'var(--text-primary)', outline: 'none', appearance: 'none', background: 'var(--surface-color)' }}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
        {products.map((product, idx) => (
          <div key={product.id} className={`glass-panel product-card animate-fade-in-up`} style={{ animationDelay: `${idx * 50}ms` }}>
            <div style={{ height: '300px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{product.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '1.2rem' }}>Rs. {product.price.toLocaleString()}</span>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
