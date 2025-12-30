'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState(''); // Manual input for demo

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!userId) {
      alert('Please enter a User ID (from Login/Register response) to checkout.');
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
        alert('Order placed successfully! ID: ' + data.id);
        localStorage.removeItem('cart');
        setCart([]);
      } else {
        alert('Order failed: ' + JSON.stringify(data));
      }
    } catch (e) {
      alert('Error placing order');
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-10 bg-gray-900 rounded-xl">
          <p className="text-gray-400 mb-4">Your cart is empty.</p>
          <Link href="/" className="text-blue-400 hover:underline">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <div className="p-6 space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="font-bold text-green-400">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-800 p-6 flex flex-col items-end">
            <div className="text-2xl font-bold mb-6">
              Total: <span className="text-green-400">${total.toFixed(2)}</span>
            </div>

            <div className="w-full max-w-sm space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">User ID (Paste from Login)</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                  placeholder="UUID..."
                />
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-3 rounded-lg transition-all"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
