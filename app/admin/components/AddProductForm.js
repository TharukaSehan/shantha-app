'use client';

import { useRef, useState } from 'react';

export default function AddProductForm({ categories, addProduct, inputStyle }) {
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    // Keep saved value aligned with public images path convention.
    setImageUrl(`/images/product/${file.name}`);
  };

  return (
    <form action={addProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <input type="text" name="name" placeholder="Product Name" required style={inputStyle} />
      <textarea name="description" placeholder="Product Description" rows="3" style={inputStyle}></textarea>
      <input type="number" name="price" placeholder="Price (LKR)" required style={inputStyle} step="0.01" />
      <select name="categoryId" style={inputStyle}>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL (e.g., /images/product/1.jpg)"
          style={{ ...inputStyle, margin: 0 }}
        />
        <button
          type="button"
          onClick={handleBrowseClick}
          style={{
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            padding: '0 14px',
            background: 'rgba(255, 255, 255, 0.08)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          Browse
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        name="imageFile"
        accept="image/*"
        onChange={handleFileSelected}
        style={{ display: 'none' }}
      />

      <p style={{ marginTop: '-8px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        Browse to pick an image file. Save uses path format like <strong>/images/product/10.jpg</strong>.
      </p>
      <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
        Save Product
      </button>
    </form>
  );
}
