'use server'

import { readData, writeData, generateId } from '../lib/db';
import { revalidatePath } from 'next/cache';

function normalizeImageUrl(input) {
  const raw = (input || '').toString().trim();
  if (!raw) {
    return '/images/product/1.jpg';
  }

  // Normalize Windows style slashes.
  const unified = raw.replace(/\\/g, '/');

  // If a full local path points into /public, keep only the public-relative URL.
  const publicIndex = unified.toLowerCase().indexOf('/public/');
  if (publicIndex !== -1) {
    return unified.slice(publicIndex + '/public'.length);
  }

  // If user pasted absolute drive path, fallback to a safe default.
  if (/^[a-zA-Z]:\//.test(unified)) {
    return '/images/product/1.jpg';
  }

  // If user entered just a filename (e.g. 12.jpg), assume product folder.
  if (!unified.includes('/')) {
    return `/images/product/${unified}`;
  }

  // If user entered root file path (e.g. /12.jpg), assume product folder.
  if (unified.startsWith('/') && unified.indexOf('/', 1) === -1) {
    return `/images/product${unified}`;
  }

  return unified.startsWith('/') ? unified : `/${unified}`;
}

export async function addProduct(formData) {
  const name = formData.get('name');
  const description = formData.get('description');
  const price = parseFloat(formData.get('price'));
  const categoryId = parseInt(formData.get('categoryId'));
  const imageUrl = normalizeImageUrl(formData.get('imageUrl'));

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

export async function updateProduct(formData) {
  const id = parseInt(formData.get('id'));
  const name = formData.get('name');
  const price = parseFloat(formData.get('price'));
  const imageUrl = normalizeImageUrl(formData.get('imageUrl'));
  const imagesRaw = formData.get('images');

  let images = [];
  if (typeof imagesRaw === 'string' && imagesRaw.trim()) {
    try {
      const parsed = JSON.parse(imagesRaw);
      if (Array.isArray(parsed)) {
        images = parsed
          .map((img) => normalizeImageUrl(img))
          .filter((img) => img && img !== imageUrl);
      }
    } catch {
      images = [];
    }
  }

  const products = readData('products');
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex > -1) {
    products[productIndex].name = name;
    products[productIndex].price = price;
    products[productIndex].imageUrl = imageUrl;

    if (images.length > 0) {
      products[productIndex].images = images;
    } else {
      delete products[productIndex].images;
    }

    writeData('products', products);
  }

  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath('/products');
  return { success: true };
}

export async function updateUser(formData) {
  const id = parseInt(formData.get('id'));
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  const users = readData('users');
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex > -1) {
    users[userIndex].name = name;
    users[userIndex].email = email;
    if (password) {
      users[userIndex].password = password;
    }
    writeData('users', users);
  }

  revalidatePath('/admin');
  return { success: true };
}

