'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product: Product) => {
    // Simple local storage cart for demo
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((p: { productId: string; quantity: number }) => p.productId === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  if (loading) return <div className="text-center py-20">Loading amazing products...</div>;

  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Discover Unique Items</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Built with Bun, Elysia, and Next.js. Experience the speed of modern web development.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1">
            <div className="h-48 bg-gray-800 flex items-center justify-center">
              <span className="text-4xl">🛍️</span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-400">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
