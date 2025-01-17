"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Package,
  UserCircle,
  Kanban,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const [isAccountOpen, setIsAccountOpen] = React.useState(false);

  return (
    <Sidebar className={cn("border-r", className)} {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="rounded-lg bg-primary p-2">
            <Package className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Acme Inc</span>
            <span className="text-xs text-muted-foreground">Enterprise</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-2 py-2">
          <h2 className="px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/product">
                  <Package className="h-4 w-4" />
                  <span>Product</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Collapsible open={isAccountOpen} onOpenChange={setIsAccountOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <UserCircle className="h-4 w-4" />
                    <span>Account</span>
                    <ChevronDown
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        isAccountOpen && "rotate-180"
                      )}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 py-1">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="/profile">Profile</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="/login">Login</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/kanban">
                  <Kanban className="h-4 w-4" />
                  <span>Kanban</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
            JO
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John</span>
            <span className="text-xs text-muted-foreground">
              demo@gmail.com
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
