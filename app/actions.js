'use server'

import { readData, writeData, generateId } from './lib/db';
import { revalidatePath } from 'next/cache';

export async function placeOrder(prevState, formData) {
  try {
    const cartData = JSON.parse(formData.get('cartData'));
    const total = parseFloat(formData.get('total'));
    const customerName = formData.get('customerName');
    const customerEmail = formData.get('customerEmail');
    const customerPhone = formData.get('customerPhone');
    const customerAddress = formData.get('customerAddress');

    const orders = readData('orders');
    
    const newOrder = {
      id: generateId(orders),
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items: cartData,
      total,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    writeData('orders', orders);

    revalidatePath('/admin');
    return { success: true };
  } catch(e) {
    return { success: false, error: 'Failed to place order.' };
  }
}
