import type { ReactNode } from 'react';
import Sidebar from '@/app/components/dashboard/Sidebar';
import MobileTabBar from '@/app/components/dashboard/MobileTabBar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--cf-page)] transition-colors duration-200">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col pb-16 md:pb-0">
        {children}
      </div>
      <MobileTabBar />
    </div>
  );
}
