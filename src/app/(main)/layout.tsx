import { MainSidebar } from '@/components/layout/main-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <div className="p-6 md:p-8 lg:p-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
