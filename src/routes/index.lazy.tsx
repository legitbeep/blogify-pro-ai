import { useRazorpay } from "@/api/hooks/useRazorpay";
import useWebSocketDemo from "@/api/hooks/useWebSocketConnection";
// import useWebSocketDemo from "@/api/hooks/useWebSocketConnection";
import PaymentService from "@/api/services/paymentService";
import ImageUpload from "@/components/atoms/image-upload";
// import GradientBackground from "@/components/atoms/gradient-bg";
// import NotificationComponent from "@/components/atoms/notification";
import ChatModal from "@/components/modules/chat-modal";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
// import { DefaultAreaChart } from "@/components/ui/graphs/area-graph/default";
// import { DefaultBarGraph } from "@/components/ui/graphs/bar-graph/default";
// import { DefaultLineGraph } from "@/components/ui/graphs/line-graph/default";
// import { DefaultPieGraph } from "@/components/ui/graphs/pie-graph/default";
// import { DefaultRadarGraph } from "@/components/ui/graphs/radar-graph/default";
// import { DefaultRadialGraph } from "@/components/ui/graphs/radial-graph/default";
import Particles from "@/components/ui/particles";
import { useThemeStore } from "@/store/useThemeStore";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

// dummy data :
const DUMMY_PAYMENT = {
  amount: 10,
  amount_due: 1000,
  amount_paid: 0,
  attempts: 0,
  created_at: 1736798811,
  currency: "INR",
  entity: "order",
  id: "order_Pj3OGMt1ynmun2",
  notes: [],
  offer_id: null,
  receipt: "order_rcpt_1736779010.612232",
  status: "created",
};

function RouteComponent() {
  const { theme } = useThemeStore();
  const [color, setColor] = React.useState(theme === "light" ? "#000" : "#fff");
  const [orderLoading, setOrderLoading] = useState(false);
  const { initiatePayment, isLoading } = useRazorpay();

  useEffect(() => {
    setColor(theme === "light" ? "#000" : "#fff");
  }, [theme]);

  const handlePayment = async () => {
    setOrderLoading(true);
    try {
      const user = {
        name: "John Doe",
        email: "johndoe@gmail.com",
      };
      const res = await PaymentService.createOrder({
        amount: DUMMY_PAYMENT.amount,
        customer_details: user,
      });
      if (res?.status !== "created") throw new Error("Order creation failed");
      initiatePayment({
        amount: res.amount,
        currency: res.currency,
        name: "Warp Speed",
        description: "",
        notes: {
          orderId: res?.orderId ?? "",
        },
        order_id: res.id,
      });
    } catch (err) {
      console.error(err);
    }
    setOrderLoading(false);
  };

  // return (
  //   <>
  //     <NotificationComponent />

  //     <div className="relative min-h-[calc(100dvh-130px)] ">
  //       <div className="container flex flex-col items-center justify-center space-y-6 py-8 text-center md:py-14">
  //         <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-3xl font-medium leading-none text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in ">
  //           New AI is the way <br className="hidden md:block" />
  //           to analyze social data.
  //         </h1>
  //         <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl mt-0">
  //           Access an ever-growing collection of premium, meticulously crafted
  //           templates and component packs. Save time and focus on what
  //           matters—building standout websites that captivate your audience.
  //         </p>
  //         <div className="flex flex-col gap-4 min-[400px]:flex-row">
  //           <Button
  //             disabled={isLoading || orderLoading}
  //             size="lg"
  //             className="h-11"
  //             onClick={handlePayment}
  //           >
  //             {isLoading || orderLoading ? (
  //               <Loader2 className="h-3 w-3 animate-spin" />
  //             ) : (
  //               "Random Payment"
  //             )}
  //           </Button>

  //           <ChatModal />
  //         </div>
  //         <Particles
  //           className="absolute inset-0 z-0"
  //           quantity={20}
  //           ease={80}
  //           color={color}
  //           refresh
  //         />
  //         <GradientBackground className="absolute inset-0 -z-10" />
  //       </div>

  //       {/* JUST FOR SAMPLE PURPOSE TO SHOW THAT THIS IS INTEGRATED */}
  //       <DefaultAreaChart />
  //       <DefaultBarGraph />
  //       <DefaultLineGraph />
  //       <DefaultPieGraph />
  //       <DefaultRadarGraph />
  //       <DefaultRadialGraph />
  //       <div>
  //         <h3>WebSocket Demo</h3>
  //         <button
  //           onClick={() => changeSocketUrl("wss://demos.kaazing.com/echo")}
  //         >
  //           Change Socket URL
  //         </button>
  //         <button
  //           onClick={() =>
  //             sendTestMessage({
  //               user_id: "999",
  //               message_type: "Image",
  //               content: "Test Content",
  //             })
  //           }
  //           disabled={connectionStatus !== "Open"}
  //         >
  //           Send JSON Message
  //         </button>
  //         <div>
  //           <p>Current WebSocket URL: {socketUrl}</p>
  //           <p>Status: {connectionStatus}</p>
  //           {lastMessage && <p>Last message: {lastMessage.data}</p>}
  //           <ul>
  //             {messageHistory.map((msg, idx) => (
  //               <li key={idx}>{msg?.data}</li>
  //             ))}
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  return (
    <AuroraBackground className="min-h-[100dvh]">
      <div className="relative min-h-[100dvh] w-full overflow-x-hidden px-4 flex flex-col ">
        <div className="container flex-grow flex flex-col md:flex-row items-start justify-between py-8 md:py-14">
          <div className="w-full md:w-1/2 order-2 md:order-1 mt-auto md:mt-0">
            <div className="text-center md:text-left space-y-6 md:absolute md:bottom-14 md:left-14">
              <h1 className="bg-gradient-to-br text-transparent dark:from-white from-black/80 from-30% dark:to-black/10 to-black/100 bg-clip-text text-3xl font-bold leading-none text-balance sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in">
                New AI is the way to analyze social data.
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                Access an ever-growing collection of premium, meticulously
                crafted templates and component packs. Save time and focus on
                what matters—building standout websites that captivate your
                audience.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center md:justify-start">
                <Button
                  disabled={isLoading || orderLoading}
                  size="lg"
                  className="h-11"
                  onClick={handlePayment}
                >
                  {isLoading || orderLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    "Random Payment"
                  )}
                </Button>
                <ChatModal />
              </div>
            </div>
          </div>
        </div>
        <Particles
          className="absolute inset-0 z-0"
          quantity={20}
          ease={80}
          color={color}
          refresh
        />
      </div>
    </AuroraBackground>
  );
}
