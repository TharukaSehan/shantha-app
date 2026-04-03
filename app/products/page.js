import { readData } from '../lib/db';
import AddToCartButton from '../components/AddToCartButton';
import ProductsFilter from '../components/ProductsFilter';

export default async function Products() {
  const products = readData('products');
  const categories = readData('categories');

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <h1 style={{ fontSize: '3rem' }}>The Collection</h1>
      </div>

      <ProductsFilter products={products} categories={categories} />
    </div>
  )
}
