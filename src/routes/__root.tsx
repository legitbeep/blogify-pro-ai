import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import AppLayout from "@/components/layout/app-layout";
import AuthService from "@/api/services/authService";

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async () => {
    try {
      const user = await AuthService.getUser();
      console.log({ user });
    } catch (e) {
      console.log(e);
    }
  },
});

function RootComponent() {
  return (
    <React.Fragment>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </React.Fragment>
  );
}
