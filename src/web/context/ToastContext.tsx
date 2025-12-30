'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`
                pointer-events-auto min-w-[300px] p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 animate-in slide-in-from-right-full fade-in
                ${t.type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-green-600' : ''}
                ${t.type === 'error' ? 'bg-gradient-to-r from-red-500 to-pink-600' : ''}
                ${t.type === 'info' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                {t.type === 'success' && <span>✅</span>}
                {t.type === 'error' && <span>❌</span>}
                {t.type === 'info' && <span>ℹ️</span>}
                <p className="font-medium text-sm">{t.message}</p>
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
