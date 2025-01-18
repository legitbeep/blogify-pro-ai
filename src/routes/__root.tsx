import AuthService from "@/api/services/authService";
import NotificationComponent from "@/components/atoms/notification";
import FullScreenLock from "@/components/layout/full-screen-lock";
import { useQuery } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
  });
  return (
    <React.Fragment>
      <Outlet />
      {/* TODO: Delete this */}
      <FullScreenLock />
      <NotificationComponent />
    </React.Fragment>
  );
}
