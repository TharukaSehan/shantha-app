'use client';

export default function AddToCartButton({
  product,
  label = 'Add',
  className = 'btn-primary',
  style = { padding: '8px 20px', fontSize: '0.9rem' }
}) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // Trigger event for Navbar
    window.dispatchEvent(new Event('cart-updated'));
    alert(`${product.name} added to cart!`);
  };

  return (
    <button onClick={addToCart} className={className} style={style}>
      {label}
    </button>
  );
}
