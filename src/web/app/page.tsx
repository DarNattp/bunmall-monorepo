'use client';

import { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';

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
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/v1/products')
      .then((res) => res.json())
      .then((data) => {
        // If API returns array directly or inside data property
        const productsData = Array.isArray(data) ? data : data.products || [];
        setProducts(productsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast('Failed to load products. Is backend running?', 'error');
        setLoading(false);
      });
  }, [toast]);

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
    toast(`Added ${product.name} to cart!`, 'success');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="h-10 w-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
        <p className="text-gray-400 font-medium">Loading catalog...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-background border border-white/10 p-12 lg:p-20 text-center">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-violet-200 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
            v1.0 Now Live
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent pb-2">
            The Future of Commerce.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Experience the blazing speed of Bun + Elysia coupled with the power of Next.js.
            Microservices architecture never looked this good.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95">
              Start Shopping
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white border border-white/10 px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-all">
              View GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Items</h2>
          <div className="h-[1px] flex-grow ml-8 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5 border-dashed">
            <p className="text-gray-500">No products found. Start the backend services.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group relative bg-gray-900/50 rounded-2xl overflow-hidden border border-white/5 transition-all hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                  {/* Abstract ambient background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/20 to-transparent"></div>
                  <span className="text-6xl transform transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl">🛍️</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold group-hover:text-violet-400 transition-colors line-clamp-1">{product.name}</h2>
                    <span className="text-lg font-bold text-white bg-white/10 px-2 py-1 rounded-md">${product.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">{product.description}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-white/5 hover:bg-violet-600 hover:text-white border border-white/10 hover:border-violet-500 text-gray-300 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Add to Cart</span>
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
