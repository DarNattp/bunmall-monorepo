import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BunMall',
  description: 'Bun + Elysia + Next.js E-commerce',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white`}>
        <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                  BunMall
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                  Shop
                </Link>
                <Link href="/cart" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                  Cart
                </Link>
                <Link href="/login" className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
