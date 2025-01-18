import useWebSocketDemo from "@/api/hooks/useWebSocketConnection";
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
  const {
    socketUrl,
    messageHistory,
    changeSocketUrl,
    sendTestMessage,
    connectionStatus,
    lastMessage,
  } = useWebSocketDemo();

  return (
    <>
      <NotificationComponent />

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
        <div>
          <h3>WebSocket Demo</h3>
          <button
            onClick={() => changeSocketUrl("wss://demos.kaazing.com/echo")}
          >
            Change Socket URL
          </button>
          <button
            onClick={() =>
              sendTestMessage({
                user_id: "999",
                message_type: "Image",
                content: "Test Content",
              })
            }
            disabled={connectionStatus !== "Open"}
          >
            Send JSON Message
          </button>
          <div>
            <p>Current WebSocket URL: {socketUrl}</p>
            <p>Status: {connectionStatus}</p>
            {lastMessage && <p>Last message: {lastMessage.data}</p>}
            <ul>
              {messageHistory.map((msg, idx) => (
                <li key={idx}>{msg?.data}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
