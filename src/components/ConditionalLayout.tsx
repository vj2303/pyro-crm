'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if current path is an auth route
  const isAuthRoute = pathname?.startsWith('/login') || pathname?.startsWith('/signup');

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      {isAuthRoute ? (
        // Auth pages get full screen without sidebar
        <>{children}</>
      ) : (
        // Regular pages get the sidebar layout with protection
        <ProtectedRoute>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 bg-[#000000] overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </ProtectedRoute>
      )}
    </>
  );
}
