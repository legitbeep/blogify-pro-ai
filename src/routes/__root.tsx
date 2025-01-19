import AuthService from "@/api/services/authService";
import { FileUploader } from "@/components/atoms/file-uploader";
import NotificationComponent from "@/components/atoms/notification";
import FullScreenLock from "@/components/layout/full-screen-lock";
import { MessageLoading } from "@/components/ui/message-loading";
import { useToken } from "@/hooks/useToken";
import { CONSTANTS, getKeyFromLocalStorage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
import { toast } from "sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const tokenObj = useToken();

  const token = getKeyFromLocalStorage(CONSTANTS.AUTH_TOKEN);

  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
    enabled: !!tokenObj.token || !!token,
  });

  React.useEffect(() => {
    if (!!tokenObj.error) {
      toast.error("Failed to login!");
      console.log("Error", tokenObj.error);
    }
  }, [tokenObj.error]);

  if (!token && tokenObj?.isLoading) {
    // return full screen animated loader
    return (
      <div className="w-100dvw h-dvh flex items-center justify-center bg-secondary">
        <MessageLoading />
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* TODO: Delete this */}
      <FullScreenLock>
        <Outlet />
        <NotificationComponent />
      </FullScreenLock>
    </React.Fragment>
  );
}
