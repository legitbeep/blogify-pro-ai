import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarNav } from "../modules/dashboard/sidebar";
import { ThemeToggle } from "../atoms/theme-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Bell, BellDot } from "lucide-react";
import SigninButton from "../atoms/signin-button";
import { Button } from "../ui/button";
import NotificationButton from "../modules/notification/notification-button";
import { MobileMenu } from "../atoms/mobile-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        <SidebarNav />
        <div className="flex-1 w-full">
          <div className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <NotificationButton />
            </div>
          </div>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
