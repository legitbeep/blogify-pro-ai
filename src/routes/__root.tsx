import AuthService from "@/api/services/authService";
import NotificationComponent from "@/components/atoms/notification";
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
      <NotificationComponent />
    </React.Fragment>
  );
}
