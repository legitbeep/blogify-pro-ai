import { FeaturesSectionWithCardGradient } from "@/components/feature-section-with-card-gradient";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/my-drafts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FeaturesSectionWithCardGradient />;
}
