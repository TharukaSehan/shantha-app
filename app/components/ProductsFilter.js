'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

export default function ProductsFilter({ products, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on category and search term
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.categoryId === parseInt(selectedCategory);
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <>
      {/* Filter Controls */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="glass-panel"
          style={{
            padding: '12px 20px',
            color: 'var(--text-primary)',
            outline: 'none',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            background: 'var(--surface-color)',
            flex: '1',
            minWidth: '250px',
            fontSize: '1rem'
          }}
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="glass-panel"
          style={{
            padding: '12px 20px',
            color: 'var(--text-primary)',
            outline: 'none',
            appearance: 'none',
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            minWidth: '200px'
          }}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
        <p>Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
          {filteredProducts.map((product, idx) => (
            <Link href={`/products/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
              <div className={`glass-panel product-card animate-fade-in-up`} style={{ animationDelay: `${idx * 50}ms`, cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease', ':hover': { transform: 'translateY(-5px)' } }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ height: '300px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/product/1.jpg';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{product.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>{product.description}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '1.2rem' }}>Rs. {product.price.toLocaleString()}</span>
                      {product.oldPrice && (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'line-through', margin: '5px 0 0 0' }}>Rs. {product.oldPrice.toLocaleString()}</p>
                      )}
                    </div>
                    <div onClick={(e) => e.preventDefault()}>
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--text-secondary)',
          fontSize: '1.1rem'
        }}>
          <p>No products found matching your criteria.</p>
          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Try adjusting your search or category filters.</p>
        </div>
      )}
    </>
  );
}
