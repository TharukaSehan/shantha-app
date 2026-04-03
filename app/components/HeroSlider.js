'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const slides = [
  '/images/slider/1.png',
  '/images/slider/2.jpg',
  '/images/slider/3.jpg',
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="home-hero" style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {slides.map((imageUrl, index) => (
        <div
          key={imageUrl}
          style={{
            position: 'absolute',
            inset: 0,
            background: `url(${imageUrl}) center/cover no-repeat`,
            opacity: activeSlide === index ? 1 : 0,
            transition: 'opacity 900ms ease-in-out',
          }}
        />
      ))}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-color), rgba(0,0,0,0.2))' }} />

      <div className="container animate-fade-in-up" style={{ position: 'relative', zIndex: 10 }}>
        <span style={{ color: 'var(--accent-color)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Exclusive Awurudu Season</span>
        <h1 className="home-hero-title" style={{ fontSize: '4.5rem', margin: '20px 0' }}>Elegance Defined.</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}>Discover the perfect piece to celebrate life's most precious moments with Shantha Traders.</p>
        <Link href="/products" className="btn-primary" style={{ display: 'inline-block' }}>Discover Collection</Link>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: activeSlide === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '999px',
                border: 'none',
                background: activeSlide === index ? 'var(--accent-color)' : 'rgba(255,255,255,0.45)',
                transition: 'all 250ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
