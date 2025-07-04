'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppLayout } from '@/components/layout/app-layout';

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppLayout>{children}</AppLayout>
    </SidebarProvider>
  );
}
