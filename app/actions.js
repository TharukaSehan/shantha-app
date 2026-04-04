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
    const paymentMethod = formData.get('paymentMethod') || 'cash_on_delivery';
    const cardHolderName = formData.get('cardHolderName');
    const cardNumber = (formData.get('cardNumber') || '').toString().replace(/\s+/g, '');
    const cardExpiry = formData.get('cardExpiry');
    const cardCvv = formData.get('cardCvv');

    if (paymentMethod !== 'cash_on_delivery' && paymentMethod !== 'card') {
      return { success: false, error: 'Invalid payment method.' };
    }

    let paymentDetails = { method: paymentMethod };
    if (paymentMethod === 'card') {
      const isValidCardNumber = /^\d{13,19}$/.test(cardNumber);
      const isValidExpiry = /^(0[1-9]|1[0-2])\/\d{2}$/.test((cardExpiry || '').toString());
      const isValidCvv = /^\d{3,4}$/.test((cardCvv || '').toString());

      if (!cardHolderName || !isValidCardNumber || !isValidExpiry || !isValidCvv) {
        return { success: false, error: 'Please enter valid card payment details.' };
      }

      paymentDetails = {
        method: paymentMethod,
        cardHolderName,
        cardLast4: cardNumber.slice(-4),
        cardExpiry
      };
    }

    const orders = readData('orders');
    
    const newOrder = {
      id: generateId(orders),
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      paymentDetails,
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
