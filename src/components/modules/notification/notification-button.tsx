import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, BellDot } from "lucide-react";
import React from "react";

const NotificationButton = () => {
  let isNewMessage = false;
  return (
    <Popover>
      <PopoverTrigger className="">
        {isNewMessage ? (
          <BellDot className="w-9 h-9 p-2 text-red-500 hover:bg-accent  rounded-full" />
        ) : (
          <Bell className="w-9 h-9 p-2  hover:bg-accent hover:text-accent-foreground rounded-full" />
        )}
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
