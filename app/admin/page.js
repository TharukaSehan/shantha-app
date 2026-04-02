import { readData } from '../lib/db';
import { addProduct, deleteProduct, updateOrderStatus, addCategory, deleteCategory, deleteUser } from './actions';

export default async function AdminDashboard() {
  const products = readData('products');
  const categories = readData('categories');
  const users = readData('users');
  const orders = readData('orders');

  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'var(--accent-color)' }}>Admin Dashboard</h1>
      
      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '60px' }}>
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Total Products</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{products.length}</p>
        </div>
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Total Categories</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{categories.length}</p>
        </div>
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Total Orders</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{orders.length}</p>
        </div>
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{users.length}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginBottom: '40px' }}>
        {/* ORDERS MANAGEMENT */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 style={{ marginBottom: '20px' }}>Orders Management</h2>
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
                {orders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px' }}>{o.id}</td>
                    <td style={{ padding: '10px' }}>{o.customerName} ({o.customerEmail})</td>
                    <td style={{ padding: '10px' }}>{o.items.length} items</td>
                    <td style={{ padding: '10px' }}>Rs. {o.total.toLocaleString()}</td>
                    <td style={{ padding: '10px' }}>
                      <form action={updateOrderStatus} style={{ display: 'flex', gap: '10px' }}>
                        <input type="hidden" name="id" value={o.id} />
                        <select name="status" defaultValue={o.status} style={{ padding: '5px', background: '#333', color: 'white', border: 'none', borderRadius: '4px' }}>
                          <option value="PENDING">PENDING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </select>
                        <button type="submit" className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>Update</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', marginBottom: '40px' }}>
        {/* ADD PRODUCT FORM */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 style={{ marginBottom: '20px' }}>Add New Product</h2>
          <form action={addProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" name="name" placeholder="Product Name" required style={inputStyle} />
            <textarea name="description" placeholder="Product Description" rows="3" style={inputStyle}></textarea>
            <input type="number" name="price" placeholder="Price (LKR)" required style={inputStyle} step="0.01" />
            <select name="categoryId" style={inputStyle}>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <input type="text" name="imageUrl" placeholder="Image URL (e.g., /images/product/1.jpg)" style={inputStyle} />
            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Save Product</button>
          </form>
        </div>

        {/* PRODUCTS LIST */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 style={{ marginBottom: '20px' }}>Manage Products</h2>
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
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px' }}>{p.id}</td>
                    <td style={{ padding: '10px' }}>{p.name}</td>
                    <td style={{ padding: '10px' }}>Rs. {p.price.toLocaleString()}</td>
                    <td style={{ padding: '10px' }}>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={p.id} />
                        <button type="submit" style={{ background: 'var(--danger-color)', color: 'white', padding: '5px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* CATEGORIES AND USERS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
         <div className="glass-panel" style={{ padding: '30px' }}>
            <h2 style={{ marginBottom: '20px' }}>Categories</h2>
            <form action={addCategory} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input type="text" name="name" placeholder="New Category Name" required style={inputStyle} />
              <button type="submit" className="btn-primary">Add</button>
            </form>
            <ul style={{ listStyle: 'none', padding: 0 }}>
               {categories.map(c => (
                 <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '10px 0' }}>
                   <span>{c.name}</span>
                   <form action={deleteCategory}>
                     <input type="hidden" name="id" value={c.id} />
                     <button type="submit" style={{ color: 'var(--danger-color)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Remove</button>
                   </form>
                 </li>
               ))}
            </ul>
         </div>

         <div className="glass-panel" style={{ padding: '30px' }}>
            <h2 style={{ marginBottom: '20px' }}>Users</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
               {users.map(u => (
                 <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '10px 0' }}>
                   <span>{u.name} ({u.role}) - {u.email}</span>
                   {u.role !== 'ADMIN' && (
                      <form action={deleteUser}>
                        <input type="hidden" name="id" value={u.id} />
                        <button type="submit" style={{ color: 'var(--danger-color)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Remove</button>
                      </form>
                   )}
                 </li>
               ))}
            </ul>
         </div>
      </div>
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
