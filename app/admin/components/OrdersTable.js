'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { updateOrderStatus } from '../actions';

const SHIPPING_FEE = 350;

const formatCurrency = (value) => {
  return Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getOrderSubtotal = (order) => {
  if (Number.isFinite(order?.subtotal)) {
    return order.subtotal;
  }

  return (order.items || []).reduce((sum, item) => {
    return sum + (Number(item.price) || 0) * (Number(item.quantity) || 0);
  }, 0);
};

const getOrderShippingFee = (order) => {
  if (Number.isFinite(order?.shippingFee)) {
    return order.shippingFee;
  }

  return (order?.items?.length || 0) > 0 ? SHIPPING_FEE : 0;
};

const getOrderTotal = (order) => {
  if (Number.isFinite(order?.subtotal) || Number.isFinite(order?.shippingFee)) {
    return getOrderSubtotal(order) + getOrderShippingFee(order);
  }

  if (Number.isFinite(order?.total)) {
    return order.total;
  }

  return getOrderSubtotal(order) + getOrderShippingFee(order);
};

export default function OrdersTable({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeTimerRef = useRef(null);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => Number(b.id) - Number(a.id));
  }, [orders]);

  const openModal = (order) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setSelectedOrder(order);
    requestAnimationFrame(() => {
      setIsModalVisible(true);
    });
  };

  const closeModal = () => {
    setIsModalVisible(false);
    closeTimerRef.current = setTimeout(() => {
      setSelectedOrder(null);
      closeTimerRef.current = null;
    }, 240);
  };

  useEffect(() => {
    if (!selectedOrder) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedOrder]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>ID</th>
              <th style={{ padding: '10px' }}>Customer</th>
              <th style={{ padding: '10px' }}>Details</th>
              <th style={{ padding: '10px' }}>Total</th>
              <th style={{ padding: '10px' }}>Status/Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((o) => (
              <tr
                key={o.id}
                onClick={() => openModal(o)}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
              >
                <td style={{ padding: '10px' }}>{o.id}</td>
                <td style={{ padding: '10px' }}>
                  {o.customerName} ({o.customerEmail || 'No email'})
                </td>
                <td style={{ padding: '10px' }}>{o.items?.length || 0} items</td>
                <td style={{ padding: '10px' }}>Rs. {formatCurrency(getOrderTotal(o))}</td>
                <td style={{ padding: '10px' }} onClick={(e) => e.stopPropagation()}>
                  <form action={updateOrderStatus} style={{ display: 'flex', gap: '10px' }}>
                    <input type="hidden" name="id" value={o.id} />
                    <select
                      name="status"
                      defaultValue={o.status}
                      style={{
                        padding: '5px',
                        background: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px'
                      }}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </select>
                    <button
                      type="submit"
                      className="btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                    >
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        (() => {
          const subtotal = getOrderSubtotal(selectedOrder);
          const shippingFee = getOrderShippingFee(selectedOrder);
          const total = getOrderTotal(selectedOrder);

          return (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(4, 8, 20, 0.55)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            opacity: isModalVisible ? 1 : 0,
            transition: 'opacity 240ms ease, backdrop-filter 240ms ease'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(760px, 96vw)',
              maxHeight: '86vh',
              overflowY: 'auto',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.16)',
              background: 'rgba(12, 19, 40, 0.74)',
              boxShadow: '0 22px 60px rgba(0,0,0,0.45)',
              color: 'var(--text-primary)',
              padding: '22px',
              transform: isModalVisible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.97)',
              opacity: isModalVisible ? 1 : 0,
              transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, color: 'var(--accent-color)' }}>Order #{selectedOrder.id}</h3>
              <button
                type="button"
                onClick={closeModal}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'var(--text-primary)',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginBottom: '16px' }}>
              <p style={{ margin: 0 }}><strong>Customer:</strong> {selectedOrder.customerName || 'N/A'}</p>
              <p style={{ margin: 0 }}><strong>Email:</strong> {selectedOrder.customerEmail || 'N/A'}</p>
              <p style={{ margin: 0 }}><strong>Phone:</strong> {selectedOrder.customerPhone || 'N/A'}</p>
              <p style={{ margin: 0 }}><strong>Status:</strong> {selectedOrder.status || 'N/A'}</p>
              <p style={{ margin: 0 }}><strong>Subtotal:</strong> Rs. {formatCurrency(subtotal)}</p>
              <p style={{ margin: 0 }}><strong>Shipping Fee:</strong> Rs. {formatCurrency(shippingFee)}</p>
              <p style={{ margin: 0 }}><strong>Total:</strong> Rs. {formatCurrency(total)}</p>
              <p style={{ margin: 0 }}>
                <strong>Payment:</strong>{' '}
                {selectedOrder.paymentDetails?.method === 'card' ? 'Card Payment' : 'N/A'}
              </p>
              {selectedOrder.paymentDetails?.method === 'card' && (
                <p style={{ margin: 0 }}>
                  <strong>Card:</strong>{' '}
                  {selectedOrder.paymentDetails?.cardHolderName || 'Card Holder'} ending in {selectedOrder.paymentDetails?.cardLast4 || 'N/A'}
                </p>
              )}
              <p style={{ margin: 0 }}>
                <strong>Created:</strong>{' '}
                {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'N/A'}
              </p>
              <p style={{ margin: 0, gridColumn: '1 / -1' }}>
                <strong>Address:</strong> {selectedOrder.customerAddress || 'N/A'}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '14px' }}>
              <h4 style={{ marginTop: 0, marginBottom: '10px' }}>Items</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(selectedOrder.items || []).map((item, idx) => (
                  <div
                    key={`${item.productId || item.id || idx}-${idx}`}
                    style={{
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '10px',
                      padding: '10px 12px'
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: 700 }}>{item.name || 'Unnamed item'}</p>
                    <p style={{ margin: '6px 0 0' }}>
                      Qty: {item.quantity || 1} | Unit Price: Rs. {Number(item.price || 0).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
          );
        })()
      )}
    </>
  );
}
