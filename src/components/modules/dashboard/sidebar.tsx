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
import { cn, CONSTANTS } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { useMatches, useNavigate, useParams } from "@tanstack/react-router";
import LanguageDialog from "@/components/atoms/language-dialog";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

interface GroupData {
  room_id: string;
  name: string;
  hideActions?: boolean;
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
  });
  const navigate = useNavigate();
  const matches = useMatches();

  // Find if there's a chat route match that has params
  const chatMatch = matches.find(
    (match) => match.routeId === "/_auth/dashboard/chat/$chatId"
  );

  const chatId = chatMatch?.params?.chatId;

  const [groups, setGroups] = React.useState([
    {
      room_id: CONSTANTS.CHATBOT_ID,
      name: "Chat Bot",
      hideActions: true,
    },
  ]);

  React.useEffect(() => {}, []);

  const handleGroupClick = (group: GroupData) => {
    navigate({
      to: `/dashboard/chat/${group.room_id}`,
    });
  };

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
          <h2 className="px-2 text-md font-normal tracking-tight flex items-center gap-4 justify-between w-full">
            Chats
          </h2>
          <div className="border-t dark:border-t border-t-slate-800 mt-2 mb-4" />
          <SidebarMenu>
            {groups.map((group) => (
              <SidebarMenuItem key={group.room_id}>
                <SidebarMenuButton asChild>
                  <Button
                    variant={group.room_id == chatId ? "default" : "outline"}
                    onClick={() => {
                      if (group.room_id != chatId) handleGroupClick(group);
                    }}
                    className="w-full border-r-2 flex align-center justify-between"
                  >
                    <span>{group.name}</span>
                    {
                      // if not hide actions then show popover with 2-3 random options
                      !group.hideActions ? (
                        <ChevronDown />
                      ) : (
                        <div className="w-4 h-2" />
                      )
                    }
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <LanguageDialog />
        <div className="flex items-center gap-2 p-4">
          <ProfileIcon size="sm" />
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
