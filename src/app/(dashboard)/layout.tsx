import React from 'react';
import { Sidebar } from '@/shared/components/Sidebar';
import { Header } from '@/shared/components/Header';
import { AuthGuard } from '@/shared/auth/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-base">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
