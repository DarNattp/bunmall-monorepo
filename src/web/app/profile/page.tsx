'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../context/ToastContext';

type User = {
  id: string;
  email: string;
  // Add other fields as needed
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Failed to parse user data', e);
        localStorage.removeItem('user');
      }
    } else {
      // Fallback: try to decode token
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);

        if (payload.id && payload.email) {
          const userFromToken = { id: payload.id, email: payload.email };
          setUser(userFromToken);
          // Optionally save to local storage to avoid decoding next time
          localStorage.setItem('user', JSON.stringify(userFromToken));
        }
      } catch (e) {
        console.error('Failed to decode token', e);
        // If we can't get user data, we might want to force logout or just show error
        toast('Session invalid, please login again', 'error');
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  }, [router, toast]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Also clear cart if desired?
    // localStorage.removeItem('cart'); 

    toast('Logged out successfully', 'info');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-violet-900 to-indigo-900 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="h-24 w-24 rounded-full bg-gray-900 border-4 border-gray-900 flex items-center justify-center text-4xl shadow-xl">
              🧑‍🚀
            </div>
          </div>
        </div>

        <div className="pt-14 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold">{user.email.split('@')[0]}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold uppercase tracking-wider">
              Active Member
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/20 rounded-xl p-6 border border-white/5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">User ID</h3>
              <p className="font-mono text-sm break-all text-violet-200">{user.id}</p>
            </div>
            <div className="bg-black/20 rounded-xl p-6 border border-white/5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Account Type</h3>
              <p className="font-medium text-white">Customer</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex justify-end">
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all font-medium text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
