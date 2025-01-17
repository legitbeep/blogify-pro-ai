import {
  generateToken,
  onMessageListener,
} from "@/api/services/notificationService";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

const NotificationComponent = () => {
  const generateFcmToken = async () => {
    const token = await generateToken();
    console.log(token, "fcm tkn");
  };

  useEffect(() => {
    generateFcmToken();
  }, []);

  useEffect(() => {
    onMessageListener((payload: any) =>
      toast.message(payload.notification.title, {
        description: payload.notification.body,
      })
    );
  }, []);

  return <Toaster />;
};

export default NotificationComponent;
