'use client';

import { useMemo, useState } from 'react';
import { deleteUser, updateUser } from '../actions';

export default function UsersTable({ users }) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch) ||
        user.role.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [users, searchTerm]);

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditValues({ name: user.name, email: user.email, password: '' });
  };

  const handleSave = async (userId) => {
    if (!editValues.name || !editValues.email) {
      alert('Please enter valid name and email');
      return;
    }

    const formData = new FormData();
    formData.append('id', userId);
    formData.append('name', editValues.name);
    formData.append('email', editValues.email);
    if (editValues.password) {
      formData.append('password', editValues.password);
    }

    await updateUser(formData);
    setEditingId(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleInputChange = (field, value) => {
    setEditValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          aria-label="Search users"
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

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Name</th>
              <th style={{ padding: '10px' }}>Email</th>
              <th style={{ padding: '10px' }}>Role</th>
              <th style={{ padding: '10px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? filteredUsers.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '10px' }}>
                  {editingId === u.id ? (
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
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td style={{ padding: '10px' }}>
                  {editingId === u.id ? (
                    <input
                      type="email"
                      value={editValues.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)',
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td style={{ padding: '10px' }}>{u.role}</td>
                <td style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {editingId === u.id ? (
                      <>
                        <button
                          onClick={() => handleSave(u.id)}
                          style={{
                            background: '#10b981',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.75rem'
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          style={{
                            background: '#6b7280',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.75rem'
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(u)}
                          style={{
                            background: '#3b82f6',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.75rem'
                          }}
                        >
                          Edit
                        </button>
                        {u.role !== 'ADMIN' && (
                          <form action={deleteUser} style={{ display: 'inline' }}>
                            <input type="hidden" name="id" value={u.id} />
                            <button
                              type="submit"
                              style={{
                                background: 'var(--danger-color)',
                                color: 'white',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.75rem'
                              }}
                            >
                              Delete
                            </button>
                          </form>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} style={{ padding: '18px 10px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  No users match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {editingId !== null && (
          <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              New Password (leave empty to keep current):
            </label>
            <input
              type="password"
              value={editValues.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter new password"
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                borderRadius: '4px',
                fontSize: '0.85rem'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
