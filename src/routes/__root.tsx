import AuthService from "@/api/services/authService";
import NotificationComponent from "@/components/atoms/notification";
import { MessageLoading } from "@/components/ui/message-loading";
import { useToken } from "@/hooks/useToken";
import {
  CONSTANTS,
  deleteKeyFromLocalStorage,
  getKeyFromLocalStorage,
} from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
import { toast } from "sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const tokenObj = useToken();
  const { user } = useUser();

  const token = getKeyFromLocalStorage(CONSTANTS.AUTH_TOKEN);

  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
    enabled: !!tokenObj.token || !!token,
  });

  React.useEffect(() => {
    if (!!user && userQuery?.isSuccess) {
      if (user?.primaryEmailAddress?.emailAddress != userQuery.data?.email) {
        deleteKeyFromLocalStorage(CONSTANTS.AUTH_TOKEN);
        tokenObj.fetchBackendToken();
        userQuery.refetch();
      }
    }
  }, [user, userQuery?.isSuccess]);

  React.useEffect(() => {
    if (!!tokenObj.error) {
      toast.error("Failed to login!");
      console.log("Error", tokenObj.error);
    }
  }, [tokenObj.error]);

  if (!token && tokenObj?.isLoading) {
    // return full screen animated loader
    return (
      <div className="w-100dvw h-dvh flex items-center justify-center ">
        <MessageLoading />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Outlet />
      <NotificationComponent />
    </React.Fragment>
  );
}
