import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { ToastProvider } from '../context/ToastContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BunMall | The Speed of Commerce',
  description: 'Bun + Elysia + Next.js E-commerce Experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-violet-500/30 selection:text-violet-200`}>
        <ToastProvider>
          <div className="flex flex-col min-h-screen">
            <nav className="border-b border-white/5 bg-background/60 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20">
                      B
                    </div>
                    <Link href="/" className="text-xl font-bold tracking-tight">
                      BunMall
                    </Link>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-4">
                    <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white px-3 py-2 rounded-md transition-colors hover:bg-white/5">
                      Shop
                    </Link>
                    <Link href="/cart" className="text-sm font-medium text-gray-400 hover:text-white px-3 py-2 rounded-md transition-colors hover:bg-white/5 group relative">
                      Cart
                      <span className="absolute right-1 top-2 h-2 w-2 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </Link>
                    <Link href="/login" className="ml-2 text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/5">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
              {children}
            </main>
            <footer className="border-t border-white/5 bg-background/50 py-12 mt-12">
              <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} BunMall. Built for speed.</p>
              </div>
            </footer>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
