import NotificationComponent from "@/components/atoms/notification";
import { DefaultAreaChart } from "@/components/ui/graphs/area-graph/default";
import { DefaultBarGraph } from "@/components/ui/graphs/bar-graph/default";
import { DefaultLineGraph } from "@/components/ui/graphs/line-graph/default";
import { DefaultPieGraph } from "@/components/ui/graphs/pie-graph/default";
import { DefaultRadarGraph } from "@/components/ui/graphs/radar-graph/default";
import { DefaultRadialGraph } from "@/components/ui/graphs/radial-graph/default";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/analytics")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="relative min-h-[calc(100dvh-130px)] ">
        {/* JUST FOR SAMPLE PURPOSE TO SHOW THAT THIS IS INTEGRATED */}
        <div className="grid md:grid-cols-2 md:gap-8 grid-cols-1 gap-4">
          <DefaultAreaChart />
          <DefaultBarGraph />
          <DefaultLineGraph />
          <DefaultPieGraph />
          <DefaultRadarGraph />
          <DefaultRadialGraph />
        </div>
      </div>
    </>
  );
}
