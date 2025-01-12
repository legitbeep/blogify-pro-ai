import { useRazorpay } from "@/api/hooks/useRazorpay";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { useThemeStore } from "@/store/useThemeStore";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import React from "react";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

// dummy data :
const DUMMY_PAYMENT = {
  amount: 1000,
  amount_due: 1000,
  amount_paid: 0,
  attempts: 0,
  created_at: 1736709560,
  currency: "INR",
  entity: "order",
  id: "order_Pie2x76MX2M8C4",
  notes: [],
  offer_id: null,
  receipt: "order_rcpt_1736689759.731231",
  status: "created",
};
function RouteComponent() {
  const { theme } = useThemeStore();
  const [color, setColor] = React.useState(theme === "light" ? "#000" : "#fff");

  const { initiatePayment, isLoading } = useRazorpay();

  const handlePayment = () => {
    initiatePayment({
      amount: DUMMY_PAYMENT.amount_due,
      currency: DUMMY_PAYMENT.currency,
      name: "Warp Speed",
      description: "Random Payment",
      order_id: DUMMY_PAYMENT.id,
      theme: {
        color,
      },
    });
  };

  return (
    <div className="relative min-h-100dvh">
      <div className="container flex flex-col items-center justify-center space-y-10 py-32 text-center md:py-36">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Build world class <br />
          websites at warp speed
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Access an ever-growing collection of premium, meticulously crafted
          templates and component packs. Save time and focus on what
          matters—building standout websites that captivate your audience.
        </p>
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Button size="lg" className="h-11" onClick={handlePayment}>
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              "Random Payment"
            )}
          </Button>
          <Button size="lg" variant="outline" className="h-11">
            Explore Collection
          </Button>
        </div>
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
      </div>
    </div>
  );
}
