'use client';
import { useState, useEffect } from 'react';
import { placeOrder } from '../actions';
import { useFormState } from 'react-dom';

const initialState = { success: false, error: null };

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [state, formAction] = useFormState(placeOrder, initialState);

  useEffect(() => {
    const loadedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(loadedCart);
    setTotal(loadedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0));
  }, []);

  useEffect(() => {
    if (state?.success) {
      localStorage.removeItem('cart');
      setCart([]);
      setTotal(0);
      window.dispatchEvent(new Event('cart-updated'));
    }
  }, [state]);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    setTotal(newCart.reduce((acc, item) => acc + (item.price * item.quantity), 0));
    window.dispatchEvent(new Event('cart-updated'));
  };

  if (state?.success) {
    return (
      <div className="container" style={{ paddingTop: '100px', textAlign: 'center', minHeight: '60vh' }}>
        <h1 style={{ color: 'var(--accent-color)', fontSize: '3rem' }}>Order Placed!</h1>
        <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>Thank you for shopping with Shantha Traders.</p>
        <a href="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '30px' }}>Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Your Cart</h1>
      
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          <div>
            {cart.map((item, idx) => (
              <div key={idx} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', marginBottom: '20px' }}>
                <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem' }}>{item.name}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Quantity: {item.quantity}</p>
                </div>
                <div style={{ fontWeight: 600, fontSize: '1.2rem' }}>
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </div>
                <button onClick={() => removeFromCart(idx)} style={{ background: 'transparent', color: 'var(--danger-color)', fontSize: '1.5rem' }}>&times;</button>
              </div>
            ))}
          </div>

          <div className="glass-panel" style={{ padding: '30px', height: 'fit-content' }}>
            <h2 style={{ marginBottom: '20px' }}>Checkout</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 600 }}>
              <span>Total:</span>
              <span style={{ color: 'var(--accent-color)' }}>Rs. {total.toLocaleString()}</span>
            </div>
            
            <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="hidden" name="cartData" value={JSON.stringify(cart)} />
              <input type="hidden" name="total" value={total} />
              <input type="text" name="customerName" placeholder="Full Name" required style={inputStyle} />
              <input type="email" name="customerEmail" placeholder="Email Address" required style={inputStyle} />
              <input type="text" name="customerPhone" placeholder="Phone Number" required style={inputStyle} />
              <input type="text" name="customerAddress" placeholder="Delivery Address" required style={inputStyle} />
              <button type="submit" className="btn-primary">Place Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid var(--glass-border)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  outline: 'none',
  fontFamily: 'inherit'
};
