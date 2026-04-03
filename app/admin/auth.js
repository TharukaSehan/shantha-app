'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(previousState, formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  // Hardcoded simple check or check against users.json
  if (username === 'admin' && password === 'admin') {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', { secure: true, httpOnly: true, path:('/') });
    redirect('/admin');
  } else {
    return { error: 'Invalid credentials. Use admin/admin' };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
