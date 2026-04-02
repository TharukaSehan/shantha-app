import './globals.css'
import NavBar from './components/NavBar';

export const metadata = {
  title: 'Shantha Traders | Premium Jewelry',
  description: 'Exclusive jewelry, gold rings, diamonds and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer style={{ backgroundColor: '#fff', color: '#777', padding: '60px 0 30px', fontSize: '0.9rem', width: '100%' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px', textAlign: 'left' }}>
        {/* Col 1 */}
        <div>
          <p style={{ marginBottom: '15px' }}>Address : No 21 Castel Lane, Kandy, Sri Lanka</p>
          <p style={{ marginBottom: '15px' }}>Phone : (+94)75687654355</p>
          <p style={{ marginBottom: '25px' }}>Email : shanthatraders.businessmail@gmail.com</p>
          <div style={{ display: 'flex', gap: '10px' }}>
             {/* Social Circles */}
             {['f', 'ig', 'wa', 'g+', 'yt'].map((ico, i) => (
                <div key={i} style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
                   {ico}
                </div>
             ))}
          </div>
        </div>
        {/* Col 2 */}
        <div>
           <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.4' }}>
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact</li>
              <li>Services</li>
              <li>Collection</li>
              <li>Portfolio</li>
           </ul>
        </div>
        {/* Col 3 */}
        <div>
           <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.4' }}>
              <li>My Account</li>
              <li>Contact</li>
              <li>Wishlist</li>
              <li>Track Orders</li>
              <li>Portfolio</li>
              <li style={{ color: '#b38222' }}>Checkout</li>
           </ul>
        </div>
        {/* Col 4 */}
        <div>
           <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.4' }}>
              <li>About Us</li>
              <li>Your Feedbacks</li>
              <li>Contact</li>
              <li>Services</li>
              <li>Collection</li>
              <li>Location</li>
              <li><a href="/admin/login" style={{ color: '#b38222', textDecoration: 'underline' }}>Admin Login</a></li>
           </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '30px' }}>
         <p style={{ marginBottom: '20px' }}>Copyright &copy; 2024 <span style={{ color: '#b38222' }}>Shantha_Traders</span> All Rights Reserved.</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <span style={{ padding: '4px 8px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontWeight: 'bold', color: '#1a1f71', fontSize: '12px' }}>VISA</span>
            <span style={{ padding: '4px 8px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontWeight: 'bold', color: '#eb001b', fontSize: '12px' }}>MasterCard</span>
            <span style={{ padding: '4px 8px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontWeight: 'bold', color: '#003087', fontSize: '12px' }}>PayPal</span>
            <span style={{ padding: '4px 8px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontWeight: 'bold', color: '#8b1348', fontSize: '12px' }}>Skrill</span>
         </div>
      </div>
    </footer>
  )
}
