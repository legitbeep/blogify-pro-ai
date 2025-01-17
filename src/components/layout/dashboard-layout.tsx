import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarNav } from "../modules/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SidebarNav />
        <div className="flex-1">
          <div className="flex h-16 items-center gap-4 border-b px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
