import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { ThemeToggle } from "../atoms/theme-toggle";
import { SidebarNav } from "../modules/dashboard/sidebar";
import NotificationButton from "../modules/notification/notification-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedIn>
        <SidebarProvider>
          <div className="flex min-h-screen w-screen overflow-hidden">
            <SidebarNav />
            <div className="flex flex-col flex-1 w-full">
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
              {/* Make main take full height and create a flex context for its children */}
              <main className="flex-1 p-2 md:p-6 flex">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
