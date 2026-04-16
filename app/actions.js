'use server'

import { readData, writeData, generateId } from './lib/db';
import { revalidatePath } from 'next/cache';

const SHIPPING_FEE = 350;

export async function placeOrder(prevState, formData) {
  try {
    const cartData = JSON.parse(formData.get('cartData'));
    const subtotal = Number.parseFloat(formData.get('subtotal')) || 0;
    const submittedTotal = Number.parseFloat(formData.get('total')) || 0;
    const customerName = formData.get('customerName');
    const customerEmail = formData.get('customerEmail');
    const customerPhone = formData.get('customerPhone');
    const customerAddress = formData.get('customerAddress');
    const paymentMethod = formData.get('paymentMethod') || 'card';
    const cardHolderName = formData.get('cardHolderName');
    const cardNumber = (formData.get('cardNumber') || '').toString().replace(/\s+/g, '');
    const cardExpiry = formData.get('cardExpiry');
    const cardCvv = formData.get('cardCvv');

    if (paymentMethod !== 'card') {
      return { success: false, error: 'Invalid payment method.' };
    }

    const isValidCardNumber = /^\d{13,19}$/.test(cardNumber);
    const isValidExpiry = /^(0[1-9]|1[0-2])\/\d{2}$/.test((cardExpiry || '').toString());
    const isValidCvv = /^\d{3,4}$/.test((cardCvv || '').toString());

    if (!cardHolderName || !isValidCardNumber || !isValidExpiry || !isValidCvv) {
      return { success: false, error: 'Please enter valid card payment details.' };
    }

    const calculatedSubtotal = cartData.reduce((sum, item) => {
      return sum + (Number(item.price) || 0) * (Number(item.quantity) || 0);
    }, 0);
    const finalSubtotal = Number.isFinite(subtotal) && subtotal > 0 ? subtotal : calculatedSubtotal;
    const finalShippingFee = cartData.length > 0 ? SHIPPING_FEE : 0;
    const total = finalSubtotal + finalShippingFee;

    if (Math.abs(submittedTotal - total) > 0.01) {
      return { success: false, error: 'Order total mismatch. Please review your cart and try again.' };
    }

    const paymentDetails = {
      method: paymentMethod,
      cardHolderName,
      cardLast4: cardNumber.slice(-4),
      cardExpiry
    };

    const orders = readData('orders');
    
    const newOrder = {
      id: generateId(orders),
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      paymentDetails,
      items: cartData,
      subtotal: finalSubtotal,
      shippingFee: finalShippingFee,
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
