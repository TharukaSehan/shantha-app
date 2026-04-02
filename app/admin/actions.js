'use server'

import { readData, writeData, generateId } from '../lib/db';
import { revalidatePath } from 'next/cache';

export async function addProduct(formData) {
  const name = formData.get('name');
  const description = formData.get('description');
  const price = parseFloat(formData.get('price'));
  const categoryId = parseInt(formData.get('categoryId'));
  const imageUrl = formData.get('imageUrl') || '/images/product/1.jpg'; // default fallback fallback

  const products = readData('products');
  const newProduct = {
    id: generateId(products),
    name,
    description,
    price,
    categoryId,
    imageUrl
  };

  products.push(newProduct);
  writeData('products', products);
  
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteProduct(formData) {
  const id = parseInt(formData.get('id'));
  const products = readData('products');
  const newProducts = products.filter(p => p.id !== id);
  writeData('products', newProducts);
  revalidatePath('/admin');
  revalidatePath('/products');
}

export async function updateOrderStatus(formData) {
  const id = parseInt(formData.get('id'));
  const status = formData.get('status');
  const orders = readData('orders');
  
  const orderIndex = orders.findIndex(o => o.id === id);
  if (orderIndex > -1) {
    orders[orderIndex].status = status;
    writeData('orders', orders);
    revalidatePath('/admin');
  }
}

export async function addCategory(formData) {
  const name = formData.get('name');
  const categories = readData('categories');
  categories.push({ id: generateId(categories), name });
  writeData('categories', categories);
  revalidatePath('/admin');
  revalidatePath('/products');
}

export async function deleteCategory(formData) {
  const id = parseInt(formData.get('id'));
  const categories = readData('categories');
  writeData('categories', categories.filter(c => c.id !== id));
  revalidatePath('/admin');
  revalidatePath('/products');
}

export async function deleteUser(formData) {
  const id = parseInt(formData.get('id'));
  const users = readData('users');
  writeData('users', users.filter(u => u.id !== id));
  revalidatePath('/admin');
}

