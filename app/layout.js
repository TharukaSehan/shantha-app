import './globals.css'
import NavBar from './components/NavBar';

export const metadata = {
  title: 'Shantha Traders | Premium Jewelry',
  description: 'Exclusive jewelry, gold rings, diamonds and more.',
}

export const viewport = {
   width: 'device-width',
   initialScale: 1,
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
         <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px', textAlign: 'left', alignItems: 'start' }}>
        {/* Col 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
               <div style={{ marginBottom: '14px', lineHeight: 0 }}>
                  <img src="/images/logo.png" alt="Shantha Traders Logo" style={{ maxWidth: '140px', height: 'auto', display: 'block' }} />
               </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', width: '100%' }}>
             <ContactItem
                label="No 21 Castel Lane, Kandy, Sri Lanka"
                iconPath="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
             />
             <ContactItem
                label="+94 77 780 7055"
                iconPath="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.4 2.7.7 4.1.7.7 0 1.2.5 1.2 1.2V20c0 .7-.5 1.2-1.2 1.2C10.8 21.2 2.8 13.2 2.8 3.2 2.8 2.5 3.3 2 4 2h3.1c.7 0 1.2.5 1.2 1.2 0 1.4.3 2.8.7 4.1.1.4 0 .9-.2 1.2l-2.2 2.3Z"
             />
             <ContactItem
                label="shanthatraders.businessmail@gmail.com"
                iconPath="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Zm0 2v.3l8 5.2 8-5.2V6H4Zm16 12V9.1l-7.4 4.8c-.4.2-.8.2-1.2 0L4 9.1V18h16Z"
             />
          </div>
               <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                   <SocialIcon href="https://www.facebook.com/100077268852839/mentions/" label="Facebook">
                      <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v8h3v-8h2.3l.7-3H13V9c0-.6.4-1 1-1Z" fill="currentColor" />
                   </SocialIcon>
                   <SocialIcon href="https://www.instagram.com/_shantha_traders_/" label="Instagram">
                      <path d="M7 3h10c2.2 0 4 1.8 4 4v10c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V7c0-2.2 1.8-4 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 2.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.1-3.1a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z" fill="currentColor" />
                   </SocialIcon>
                   <SocialIcon href="https://wa.me/94777807055" label="WhatsApp">
                      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Zm0 2a7 7 0 0 1 6.1 10.5l-.2.3.4 2.2-2.3-.6-.3.2A7 7 0 1 1 12 5Zm-3 3.5c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2 1 2.5.3.3 1.5 2.4 3.7 3.3 1.8.7 2.2.6 2.6.6.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.7-.4l-1.1-.5c-.3-.1-.5-.1-.7.1-.2.2-.7.7-.9.8-.2.1-.3.1-.6 0-.4-.1-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.4-.1-.3 0-.5.1-.7.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.4.1-.2 0-.4 0-.6 0-.2-.7-1.7-1-2.3-.2-.5-.4-.5-.6-.5Z" fill="currentColor" />
                   </SocialIcon>
                   <SocialIcon href="https://linktr.ee/shantha_traders" label="Linktree">
                      <path d="M11 3h2v4h3l-4 4-4-4h3V3Zm-6 8h4l-4 4-4-4h4V9h2v2Zm12 0h4l-4 4-4-4h4V9h2v2Zm-6 2h2v8h-2v-8Z" fill="currentColor" />
                   </SocialIcon>
                   <SocialIcon href="https://www.tiktok.com/@shantha_traders" label="TikTok">
                      <path d="M14.2 3h2.8c.2 1.3 1 2.5 2.3 3.1.5.3 1.1.5 1.7.5v2.8c-1.5 0-3-.5-4.2-1.4v5.6a5.4 5.4 0 1 1-5.4-5.4c.3 0 .6 0 .9.1v2.8a2.6 2.6 0 1 0 1.9 2.5V3Z" fill="currentColor" />
                   </SocialIcon>
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
         <div className="footer-payments" style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <span style={{ padding: '4px 8px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontWeight: 'bold', color: '#1a1f71', fontSize: '12px' }}>VISA</span>
            <span style={{ padding: '4px 8px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontWeight: 'bold', color: '#eb001b', fontSize: '12px' }}>MasterCard</span>
            <span style={{ padding: '4px 8px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontWeight: 'bold', color: '#003087', fontSize: '12px' }}>PayPal</span>
            <span style={{ padding: '4px 8px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontWeight: 'bold', color: '#8b1348', fontSize: '12px' }}>Skrill</span>
         </div>
      </div>
    </footer>
  )
}

function ContactItem({ iconPath, label }) {
   return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#333', fontWeight: 500, lineHeight: 1.25, whiteSpace: 'nowrap' }}>
         <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(179, 130, 34, 0.12)', color: '#b38222', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
               <path d={iconPath} fill="currentColor" />
            </svg>
         </span>
         <span style={{ color: '#777', whiteSpace: 'nowrap' }}>{label}</span>
      </div>
   );
}

function SocialIcon({ href, label, children }) {
   return (
      <a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         aria-label={label}
         title={label}
         style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#333', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flexShrink: 0 }}
      >
         <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            {children}
         </svg>
      </a>
   );
}
