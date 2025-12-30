'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '../../context/ToastContext';

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const removeItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast('Item removed from cart', 'info');
  };

  const handleCheckout = async () => {
    if (!userId) {
      toast('Please enter a User ID to checkout', 'error');
      return;
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          items: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast(`Order placed successfully! ID: ${data.id}`, 'success');
        localStorage.removeItem('cart');
        setCart([]);
      } else {
        toast(`Order failed: ${data.message || 'Unknown error'}`, 'error');
      }
    } catch (e) {
      toast('Network error placing order', 'error');
      console.error(e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Your Cart</h1>
        <span className="text-gray-400">{cart.length} items</span>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-32 bg-white/5 rounded-3xl border border-white/5 border-dashed">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold mb-2">It&apos;s empty inside.</h2>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">Your cart is looking a little lonely. Browse our catalog to find something you&apos;ll love.</p>
          <Link href="/" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/5 flex items-center justify-between group hover:border-violet-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-2xl">
                    🎁
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-400 text-sm">Qty: {item.quantity} &times; ${item.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg mb-1">${(item.price * item.quantity).toFixed(2)}</div>
                  <button onClick={() => removeItem(idx)} className="text-xs text-red-400 hover:text-red-300 transition-colors underline">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-3xl p-8 border border-white/5 h-fit sticky top-24 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6">Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="h-[1px] bg-white/10 my-4"></div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">User ID (Demo)</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                  placeholder="Paste UUID from login..."
                />
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-violet-500/25 active:scale-95"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
