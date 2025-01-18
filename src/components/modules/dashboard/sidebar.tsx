"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Package,
  UserCircle,
  Kanban,
  ChevronDown,
  AlignEndHorizontal,
  BotMessageSquare,
  ArrowRight,
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
import { useQuery } from "@tanstack/react-query";
import AuthService from "@/api/services/authService";
import ProfileIcon from "@/components/atoms/profile-icon";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
  });

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
          <h2 className="px-2 text-lg font-semibold tracking-tight flex items-center gap-4 justify-between w-full">
            Overview <ArrowRight className="h-4 w-4" />
          </h2>
          <div className="border-t dark:border-t-slate-400 border-t-slate-800 my-4" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/chat">
                  <BotMessageSquare className="h-4 w-4" />
                  <span>AI Chat</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* <SidebarMenuItem>
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
            </SidebarMenuItem> */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/analytics">
                  <AlignEndHorizontal className="h-4 w-4" />
                  <span>Analytics</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 p-4">
          <ProfileIcon />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{userQuery?.data?.name}</span>
            <span className="text-xs text-muted-foreground">
              {userQuery?.data?.email}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
