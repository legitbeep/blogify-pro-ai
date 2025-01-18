import { useRazorpay } from "@/api/hooks/useRazorpay";
import useWebSocketDemo from "@/api/hooks/useWebSocketConnection";
// import useWebSocketDemo from "@/api/hooks/useWebSocketConnection";
import PaymentService from "@/api/services/paymentService";
import ImageUpload from "@/components/atoms/image-upload";
// import GradientBackground from "@/components/atoms/gradient-bg";
// import NotificationComponent from "@/components/atoms/notification";
import ChatModal from "@/components/modules/chat-modal";
import {
  PurchaseDialog,
  PurchaseDialogDemo,
} from "@/components/modules/pricing/pricing-modal";
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
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export const Route = createFileRoute("/_unauth/")({
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
  const razorpayObj = useRazorpay();
  const [showChat, setShowChat] = useState(false);

  const { initiatePayment, isLoading } = razorpayObj;

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

  const handlePaymentModalAction = () => {
    razorpayObj?.resetPayment();
  };
  return (
    <AuroraBackground className="min-h-[100dvh]">
      <div className="relative min-h-[100dvh] w-full overflow-x-hidden px-4 flex flex-col ">
        <div className="container w-full flex-grow flex flex-col md:flex-row items-start justify-between py-8 md:py-14">
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
                <ChatModal open={showChat} setOpen={setShowChat} />
                <PurchaseDialog
                  isOpen={razorpayObj?.isSuccess || razorpayObj?.isError}
                  onClose={razorpayObj?.resetPayment}
                  onAction={handlePaymentModalAction}
                  isSuccess={razorpayObj?.isSuccess}
                />
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
