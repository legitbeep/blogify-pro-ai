import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/dashboard/profile"!</div>;
}
