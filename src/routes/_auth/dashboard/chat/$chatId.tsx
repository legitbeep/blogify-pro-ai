import ChatMessages from "@/components/modules/dashboard/chat-messages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/chat/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChatMessages />;
}
