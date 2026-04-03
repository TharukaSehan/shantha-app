import { readData } from '../../lib/db';
import ProductDetailClient from '../../components/ProductDetailClient';

export default async function ProductDetail({ params }) {
  const resolvedParams = await params;
  const products = readData('products');
  const categories = readData('categories');
  const product = products.find(p => p.id === parseInt(resolvedParams.id));

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', textAlign: 'center' }}>
        <h1>Product not found</h1>
        <a href="/products" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>
          Back to Products
        </a>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);

  return <ProductDetailClient product={product} category={category} />;
}