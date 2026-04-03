'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function ProductDetailClient({ product, category }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const [shareUrl, setShareUrl] = useState('');

  const galleryImages = useMemo(() => {
    const additionalImages = Array.isArray(product.images)
      ? product.images
      : Array.isArray(product.imageUrls)
        ? product.imageUrls
        : [];

    const merged = [product.imageUrl, ...additionalImages].filter(Boolean);
    return [...new Set(merged)];
  }, [product]);

  const visibleThumbCount = 4;
  const maxThumbStart = Math.max(galleryImages.length - visibleThumbCount, 0);

  useEffect(() => {
    setActiveImageIndex(0);
    setThumbStartIndex(0);
  }, [product.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, [product.id]);

  useEffect(() => {
    if (activeImageIndex < thumbStartIndex) {
      setThumbStartIndex(activeImageIndex);
    } else if (activeImageIndex >= thumbStartIndex + visibleThumbCount) {
      setThumbStartIndex(activeImageIndex - visibleThumbCount + 1);
    }
  }, [activeImageIndex, thumbStartIndex]);

  const visibleThumbs = galleryImages.slice(thumbStartIndex, thumbStartIndex + visibleThumbCount);

  const showPreviousImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const shareMessage = `Check out ${product.name} at Shantha Traders`;
  const encodedShareUrl = encodeURIComponent(shareUrl || '');
  const encodedShareMessage = encodeURIComponent(`${shareMessage} ${shareUrl || ''}`);

  const openInstagramShare = async () => {
    try {
      if (navigator?.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      // Ignore clipboard errors; user can still open Instagram.
    }

    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  const openTikTokShare = async () => {
    try {
      if (navigator?.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      // Ignore clipboard errors; user can still open TikTok.
    }

    window.open('https://www.tiktok.com/', '_blank', 'noopener,noreferrer');
  };

  const discount = product.oldPrice ? 
    Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      {/* Breadcrumb */}
      <div className="product-breadcrumb" style={{ marginBottom: '30px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
        {' • '}
        <Link href="/products" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
          {category?.name || 'Products'}
        </Link>
        {' • '}
        <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
      </div>

      <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '60px' }}>
        {/* Product Image */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '700px' }}>
            <div style={{ position: 'relative' }}>
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous image"
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    width: '34px',
                    height: '34px',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'rgba(0,0,0,0.55)',
                    color: 'white',
                    fontSize: '20px',
                    lineHeight: 1,
                  }}
                >
                  ‹
                </button>
              )}

              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next image"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    width: '34px',
                    height: '34px',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'rgba(0,0,0,0.55)',
                    color: 'white',
                    fontSize: '20px',
                    lineHeight: 1,
                  }}
                >
                  ›
                </button>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryImages[activeImageIndex]}
                alt={`${product.name} ${activeImageIndex + 1}`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/product/1.jpg';
                }}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
              />
            </div>

            {galleryImages.length > 1 && (
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setThumbStartIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={thumbStartIndex === 0}
                  aria-label="Previous thumbnails"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '999px',
                    border: 'none',
                    background: thumbStartIndex === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.45)',
                    color: '#fff',
                    opacity: thumbStartIndex === 0 ? 0.4 : 1,
                  }}
                >
                  ‹
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${visibleThumbCount}, minmax(0, 1fr))`, gap: '8px', flex: 1 }}>
                  {visibleThumbs.map((imageSrc, index) => {
                    const imageIndex = thumbStartIndex + index;
                    const isActive = imageIndex === activeImageIndex;

                    return (
                      <button
                        key={`${imageSrc}-${imageIndex}`}
                        type="button"
                        onClick={() => setActiveImageIndex(imageIndex)}
                        aria-label={`Open image ${imageIndex + 1}`}
                        style={{
                          border: isActive ? '2px solid var(--accent-color)' : '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '4px',
                          padding: 0,
                          overflow: 'hidden',
                          background: 'transparent',
                          opacity: isActive ? 1 : 0.7,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageSrc}
                          alt={`${product.name} thumbnail ${imageIndex + 1}`}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/product/1.jpg';
                          }}
                          style={{ width: '100%', height: '82px', objectFit: 'cover', display: 'block' }}
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setThumbStartIndex((prev) => Math.min(prev + 1, maxThumbStart))}
                  disabled={thumbStartIndex >= maxThumbStart}
                  aria-label="Next thumbnails"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '999px',
                    border: 'none',
                    background: thumbStartIndex >= maxThumbStart ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.45)',
                    color: '#fff',
                    opacity: thumbStartIndex >= maxThumbStart ? 0.4 : 1,
                  }}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div>
          {product.quality && (
            <div style={{
              display: 'inline-block',
              background: '#2563eb',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '15px'
            }}>
              {product.quality}
            </div>
          )}

          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '15px', marginTop: '10px' }}>{product.name}</h1>

          {/* Rating */}
          {product.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ color: '#fbbf24', fontSize: '1.1rem' }}>
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && '⯨'}
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {product.rating} ({product.reviews} Sold)
              </span>
            </div>
          )}

          {/* Price */}
          <div style={{ marginBottom: '25px' }}>
            {product.oldPrice && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)' }}>
                  Rs. {product.oldPrice.toLocaleString()}
                </span>
                {discount > 0 && (
                  <span style={{ color: '#ef4444', fontWeight: 600 }}>({discount}%)</span>
                )}
              </div>
            )}
            <span style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent-color)' }}>
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          {/* About This Item */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>About This Item:</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', textAlign: 'justify' }}>
              {product.fullDescription}
            </p>
          </div>

          {/* Product Info */}
          <div style={{ 
            background: 'var(--surface-color)', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '30px'
          }}>
            {product.color && (
              <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Color:</span>
                <span style={{ marginLeft: '10px', fontWeight: 500 }}>{product.color}</span>
              </div>
            )}
            {product.sku && (
              <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>SKU:</span>
                <span style={{ marginLeft: '10px', fontWeight: 500 }}>{product.sku}</span>
              </div>
            )}
            {product.tag && (
              <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tag:</span>
                <span style={{ marginLeft: '10px', fontWeight: 500 }}>{product.tag}</span>
              </div>
            )}
            {product.availability && (
              <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Available:</span>
                <span style={{ marginLeft: '10px', fontWeight: 500, color: '#10b981' }}>{product.availability}</span>
              </div>
            )}
            {product.shippingArea && (
              <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping Area:</span>
                <span style={{ marginLeft: '10px', fontWeight: 500 }}>{product.shippingArea}</span>
              </div>
            )}
            {product.shippingFee && (
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping Fee:</span>
                <span style={{ marginLeft: '10px', fontWeight: 500 }}>{product.shippingFee}</span>
              </div>
            )}
          </div>

          {/* Quantity and Action Buttons */}
          <div className="product-action-row" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              style={{
                width: '80px',
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                background: 'var(--surface-color)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                textAlign: 'center'
              }}
            />
            <button className="product-primary-btn" style={{
              flex: '1 1 200px',
              padding: '12px 30px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.3s'
            }} onMouseEnter={(e) => e.target.style.background = '#2563eb'} onMouseLeave={(e) => e.target.style.background = '#3b82f6'}>
              Add To Cart 🛒
            </button>
            <button className="product-buy-btn" style={{
              padding: '12px 30px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.3s'
            }} onMouseEnter={(e) => e.target.style.background = '#dc2626'} onMouseLeave={(e) => e.target.style.background = '#ef4444'}>
              Buy
            </button>
          </div>

          {/* Back to Products */}
          <Link href="/products" style={{
            color: 'var(--accent-color)',
            textDecoration: 'none',
            fontSize: '0.95rem'
          }}>
            ← Back to Products
          </Link>

          {/* Share Product */}
          <div style={{ marginTop: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Share This Product</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/?text=${encodedShareMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
                style={shareButtonStyle}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Zm0 2a7 7 0 0 1 6.1 10.5l-.2.3.4 2.2-2.3-.6-.3.2A7 7 0 1 1 12 5Zm-3 3.5c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2 1 2.5.3.3 1.5 2.4 3.7 3.3 1.8.7 2.2.6 2.6.6.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.7-.4l-1.1-.5c-.3-.1-.5-.1-.7.1-.2.2-.7.7-.9.8-.2.1-.3.1-.6 0-.4-.1-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.4-.1-.3 0-.5.1-.7.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.4.1-.2 0-.4 0-.6 0-.2-.7-1.7-1-2.3-.2-.5-.4-.5-.6-.5Z" fill="currentColor" />
                </svg>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                title="Share on Facebook"
                style={shareButtonStyle}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v8h3v-8h2.3l.7-3H13V9c0-.6.4-1 1-1Z" fill="currentColor" />
                </svg>
              </a>

              <button
                type="button"
                onClick={openInstagramShare}
                aria-label="Share on Instagram"
                title="Open Instagram (product link copied)"
                style={shareButtonStyle}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M7 3h10c2.2 0 4 1.8 4 4v10c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V7c0-2.2 1.8-4 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 2.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.1-3.1a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z" fill="currentColor" />
                </svg>
              </button>

              <button
                type="button"
                onClick={openTikTokShare}
                aria-label="Share on TikTok"
                title="Open TikTok (product link copied)"
                style={shareButtonStyle}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M14.2 3h2.8c.2 1.3 1 2.5 2.3 3.1.5.3 1.1.5 1.7.5v2.8c-1.5 0-3-.5-4.2-1.4v5.6a5.4 5.4 0 1 1-5.4-5.4c.3 0 .6 0 .9.1v2.8a2.6 2.6 0 1 0 1.9 2.5V3Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const shareButtonStyle = {
  width: '42px',
  height: '42px',
  borderRadius: '999px',
  border: '1px solid rgba(255,255,255,0.25)',
  background: 'rgba(255,255,255,0.04)',
  color: 'var(--text-primary)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  textDecoration: 'none',
};