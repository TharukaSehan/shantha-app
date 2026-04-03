import Link from 'next/link';

export default function AboutUs() {
  return (
    <div style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      {/* Hero Section */}
      <div className="container" style={{ marginBottom: '80px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 7vw, 3.5rem)', marginBottom: '20px', color: 'var(--accent-color)' }}>About Shantha Traders</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
          Welcome to Shantha Traders, your premier destination for exquisite jewelry. With a passion for elegance and quality, we bring you the finest collection of rings, earrings, necklaces, bracelets, and more.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="container" style={{ marginBottom: '80px' }}>
        <div className="about-split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', color: 'var(--accent-color)' }}>Our Story</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
              Shantha Traders began with a simple vision: to provide access to premium quality jewelry that reflects individual style and elegance. Our commitment to excellence and customer satisfaction has made us a trusted name in the jewelry industry.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
              Every piece in our collection is carefully curated and crafted with attention to detail. We believe that jewelry is not just an accessory—it's a statement of personal taste and a keeper of precious moments.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', textAlign: 'justify' }}>
              From traditional designs to modern creations, we offer something for every occasion and preference.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '30px', color: 'var(--accent-color)' }}>Why Choose Us?</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <li style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>✨ Premium Quality Jewelry</li>
              <li style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>🎯 Authentic & Certified Products</li>
              <li style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>💎 Extensive Collection</li>
              <li style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>🚚 Fast & Reliable Delivery</li>
              <li style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>❤️ Customer-First Approach</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Owner Section */}
      <div className="container" style={{ marginBottom: '80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'var(--accent-color)' }}>Meet the Owner</h2>
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>P.A.S.V. Shantha</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.1rem' }}>Founder & CEO</p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '25px' }}>
            With years of experience in the jewelry industry, P.A.S.V. Shantha founded Shantha Traders with the vision of bringing quality jewelry to everyone. His dedication to excellence and customer satisfaction drives the company's success.
          </p>
          <a 
            href="https://evaunt.me/Lq2EQ4/PASVipulShanthaPathirana"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'var(--accent-color)',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'opacity 0.3s'
            }}
          >
            View Profile
          </a>
        </div>
      </div>

      {/* Location & Contact Section */}
      <div className="container" style={{ marginBottom: '80px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '50px', color: 'var(--accent-color)', textAlign: 'center' }}>Visit Us</h2>
        <div className="about-visit-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* Map */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7915.037963155919!2d80.6353531!3d7.2954369!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3662bbe5532d5%3A0x1167728bd0f3c8ef!2sShantha%20Traders!5e0!3m2!1sen!2slk!4v1775221580393!5m2!1sen!2slk"
              width="100%"
              height="400"
              style={{ border: 'none', borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--accent-color)' }}>📍 Location</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.8' }}>
                Visit our physical store or check out our location on Google Maps to get directions.
              </p>
              <a
                href="https://maps.app.goo.gl/YfbKD9j2BFzVu1UQ9"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#4285f4',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'background 0.3s'
                }}
              >
                View on Google Maps
              </a>
            </div>

            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--accent-color)' }}>👥 Follow Us</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
                Connect with us on social media to stay updated with our latest collections and offers.
              </p>
              <a
                href="https://www.facebook.com/100077268852839/mentions/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#1877f2',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'background 0.3s'
                }}
              >
                Follow on Facebook
              </a>
            </div>

            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--accent-color)' }}>📞 Business Hours</h3>
              <div style={{ color: 'var(--text-secondary)', display: 'grid', gap: '8px' }}>
                <p><strong>Monday:</strong> 09:00-18:30</p>
                <p><strong>Tuesday:</strong> 09:00-18:30</p>
                <p><strong>Wednesday:</strong> 09:00-18:30</p>
                <p><strong>Thursday:</strong> 09:00-18:30</p>
                <p><strong>Friday:</strong> 09:00-18:30</p>
                <p><strong>Saturday:</strong> 09:00-18:30</p>
                <p><strong>Sunday:</strong> 09:00-16:00</p>
                <p style={{ marginTop: '8px', color: 'var(--accent-color)', fontWeight: 600 }}>Closed on Poya Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container" style={{ textAlign: 'center', padding: '60px 40px', background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(59, 130, 246, 0.1))', borderRadius: '12px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--accent-color)' }}>Explore Our Collection</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1.1rem' }}>
          Discover our exquisite jewelry collection and find the perfect piece for yourself or your loved ones.
        </p>
        <Link href="/products" style={{
          display: 'inline-block',
          background: 'var(--accent-color)',
          color: 'white',
          padding: '15px 40px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1.1rem',
          transition: 'opacity 0.3s'
        }}>
          Shop Now
        </Link>
      </div>
    </div>
  );
}
