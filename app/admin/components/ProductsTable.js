'use client';

import { Fragment, useMemo, useRef, useState } from 'react';
import { deleteProduct, updateProduct } from '../actions';

export default function ProductsTable({ products }) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [editFiles, setEditFiles] = useState({ mainFile: null, galleryFiles: {} });
  const [searchTerm, setSearchTerm] = useState('');
  const mainImageInputRef = useRef(null);
  const galleryInputRefs = useRef({});

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalizedSearch) ||
        String(product.id).includes(normalizedSearch) ||
        product.price.toString().includes(normalizedSearch)
      );
    });
  }, [products, searchTerm]);

  const handleEditClick = (product) => {
    const galleryImages = Array.isArray(product.images)
      ? product.images
      : Array.isArray(product.imageUrls)
        ? product.imageUrls
        : [];

    setEditingId(product.id);
    setEditValues({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || '',
      images: galleryImages,
    });
    setEditFiles({ mainFile: null, galleryFiles: {} });
  };

  const handleSave = async (productId) => {
    if (!editValues.name || editValues.price <= 0) {
      alert('Please enter valid name and price');
      return;
    }

    const formData = new FormData();
    formData.append('id', productId);
    formData.append('name', editValues.name);
    formData.append('price', editValues.price);
    formData.append('imageUrl', editValues.imageUrl || '');
    formData.append(
      'images',
      JSON.stringify((editValues.images || []).map((img) => img.trim()).filter(Boolean))
    );

    if (editFiles.mainFile) {
      formData.append('imageFile', editFiles.mainFile);
    }

    Object.entries(editFiles.galleryFiles || {}).forEach(([index, file]) => {
      if (!file) {
        return;
      }
      formData.append('galleryImageIndex', index);
      formData.append('galleryImageFile', file);
    });

    await updateProduct(formData);
    setEditingId(null);
    setEditValues({});
    setEditFiles({ mainFile: null, galleryFiles: {} });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
    setEditFiles({ mainFile: null, galleryFiles: {} });
  };

  const handleInputChange = (field, value) => {
    setEditValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGalleryImageChange = (index, value) => {
    setEditValues((prev) => {
      const nextImages = [...(prev.images || [])];
      nextImages[index] = value;
      return { ...prev, images: nextImages };
    });
  };

  const handleAddGalleryImage = () => {
    setEditValues((prev) => ({
      ...prev,
      images: [...(prev.images || []), ''],
    }));
  };

  const handleRemoveGalleryImage = (index) => {
    setEditValues((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));

    delete galleryInputRefs.current[index];

    setEditFiles((prev) => {
      const remappedGalleryFiles = {};

      Object.entries(prev.galleryFiles || {}).forEach(([key, file]) => {
        const numericKey = parseInt(key);
        if (Number.isNaN(numericKey) || numericKey === index) {
          return;
        }

        const remappedKey = numericKey > index ? numericKey - 1 : numericKey;
        remappedGalleryFiles[remappedKey] = file;
      });

      return {
        ...prev,
        galleryFiles: remappedGalleryFiles,
      };
    });
  };

  const handleMainImageSelected = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setEditFiles((prev) => ({ ...prev, mainFile: file }));
    handleInputChange('imageUrl', `/images/product/${file.name}`);
  };

  const handleGalleryImageSelected = (index, event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setEditFiles((prev) => ({
      ...prev,
      galleryFiles: {
        ...(prev.galleryFiles || {}),
        [index]: file,
      },
    }));
    handleGalleryImageChange(index, `/images/product/${file.name}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          style={{
            width: '100%',
            maxWidth: '240px',
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            outline: 'none',
            fontSize: '0.9rem'
          }}
        />
      </div>

      <div style={{ maxHeight: '430px', overflowY: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Price</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? filteredProducts.map(p => (
            <Fragment key={p.id}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '10px' }}>{p.id}</td>
              <td style={{ padding: '10px' }}>
                {editingId === p.id ? (
                  <input
                    type="text"
                    value={editValues.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  p.name
                )}
              </td>
              <td style={{ padding: '10px' }}>
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={editValues.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    step="0.01"
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  `Rs. ${p.price.toLocaleString()}`
                )}
              </td>
              <td style={{ padding: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {editingId === p.id ? (
                    <>
                      <button
                        onClick={() => handleSave(p.id)}
                        style={{
                          background: '#10b981',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        style={{
                          background: '#6b7280',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(p)}
                        style={{
                          background: '#3b82f6',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Edit
                      </button>
                      <form action={deleteProduct} style={{ display: 'inline' }}>
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          style={{
                            background: 'var(--danger-color)',
                            color: 'white',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </td>
              </tr>

              {editingId === p.id && (
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td colSpan={4} style={{ padding: '12px 10px 16px' }}>
                    <div style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
                      <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '10px' }}>Product Images</p>

                      <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Main Image URL</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="text"
                            value={editValues.imageUrl || ''}
                            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                            placeholder="/images/product/10.jpg"
                            style={{
                              flex: 1,
                              padding: '8px 10px',
                              background: 'rgba(255,255,255,0.1)',
                              border: '1px solid var(--glass-border)',
                              color: 'var(--text-primary)',
                              borderRadius: '4px',
                              fontSize: '0.85rem'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => mainImageInputRef.current?.click()}
                            style={{
                              background: 'rgba(255,255,255,0.08)',
                              color: 'var(--text-primary)',
                              border: '1px solid var(--glass-border)',
                              borderRadius: '4px',
                              padding: '0 10px',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            Browse
                          </button>
                          <input
                            ref={mainImageInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageSelected}
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Additional Gallery Images</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(editValues.images || []).map((img, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                              <input
                                type="text"
                                value={img}
                                onChange={(e) => handleGalleryImageChange(idx, e.target.value)}
                                placeholder="/images/product/11.jpg"
                                style={{
                                  flex: 1,
                                  padding: '8px 10px',
                                  background: 'rgba(255,255,255,0.1)',
                                  border: '1px solid var(--glass-border)',
                                  color: 'var(--text-primary)',
                                  borderRadius: '4px',
                                  fontSize: '0.85rem'
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => galleryInputRefs.current[idx]?.click()}
                                style={{
                                  background: 'rgba(255,255,255,0.08)',
                                  color: 'var(--text-primary)',
                                  border: '1px solid var(--glass-border)',
                                  borderRadius: '4px',
                                  padding: '0 10px',
                                  fontSize: '0.75rem',
                                  whiteSpace: 'nowrap',
                                  cursor: 'pointer'
                                }}
                              >
                                Browse
                              </button>
                              <input
                                ref={(element) => {
                                  galleryInputRefs.current[idx] = element;
                                }}
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleGalleryImageSelected(idx, event)}
                                style={{ display: 'none' }}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(idx)}
                                style={{
                                  background: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '0 10px',
                                  fontSize: '0.75rem'
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={handleAddGalleryImage}
                          style={{
                            marginTop: '10px',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '6px 10px',
                            fontSize: '0.75rem'
                          }}
                        >
                          Add Image
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          )) : (
            <tr>
              <td colSpan={4} style={{ padding: '18px 10px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                No products match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
