'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if current path is an auth route
  const isAuthRoute = pathname?.startsWith('/login') || pathname?.startsWith('/signup');

  if (isAuthRoute) {
    // Auth pages get full screen without sidebar
    return <>{children}</>;
  }

  // Regular pages get the sidebar layout with protection
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 bg-[#000000] overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
