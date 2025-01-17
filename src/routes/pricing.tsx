import { useRazorpay } from "@/api/hooks/useRazorpay";
import PaymentService from "@/api/services/paymentService";
import { Pricing } from "@/components/modules/pricing/pricing";
import { login } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  component: RouteComponent,
});

function RouteComponent() {
  const isLoggedIn = true;
  const razorpayObj = useRazorpay();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const onFreePlanClick = () => {
    if (isLoggedIn) {
      toast.message("Already activated!");
    } else {
      login();
    }
  };

  const onProPlanClick = async (isMonthly: boolean) => {
    setPaymentLoading(true);
    try {
      const user = {
        name: "John Doe",
        email: "johndoe@gmail.com",
      };
      const res = await PaymentService.createOrder({
        amount: isMonthly ? 999 : 9999,
        customer_details: user,
      });
      if (res?.status !== "created") {
        toast.error("Order creation failed");
        throw new Error("Order creation failed");
      }
      razorpayObj.initiatePayment({
        amount: res.amount,
        currency: res.currency,
        name: `Pro plan ${isMonthly ? "monthly" : "yearly"}`,
        description: "",
        notes: {
          orderId: res?.orderId ?? "",
        },
        order_id: res.id,
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
    setPaymentLoading(false);
  };

  const onContactSalesClick = () => {
    window.location.href = "mailto:sales@company.com";
  };

  const onScheduleMeetClick = () => {
    window.open("https://calendly.com/superlevelhackathon/30min", "_blank");
  };

  const demoPlans = [
    {
      name: "Free Trial",
      price: "0",
      yearlyPrice: "00",
      period: "per month",
      features: [
        "Up to 10 projects",
        "Basic analytics",
        "48-hour support response time",
      ],
      description: "Perfect for individuals and small projects",
      buttonText: isLoggedIn ? "Your current plan" : "Start Free Trial",
      isPopular: false,
      onClick: onFreePlanClick,
      disabled: isLoggedIn,
    },
    {
      name: "Pro Tier",
      price: "999",
      yearlyPrice: "9999",
      period: "per month",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "24-hour support response time",
        "Full API access",
        "Priority support",
        "Team collaboration",
        "Custom integrations",
      ],
      description: "Ideal for growing teams and businesses",
      buttonText: "Get Started",
      isPopular: true,
      onClick: onProPlanClick,
      loading: paymentLoading || razorpayObj.isLoading,
    },
    {
      name: "Enterprise",
      price: "NA",
      yearlyPrice: "NA",
      period: "per month",
      features: [
        "Everything in Professional",
        "Custom solutions",
        "Dedicated account manager",
        "1-hour support response time",
        "SSO Authentication",
        "Advanced security",
        "Custom contracts",
        "SLA agreement",
      ],
      description: "For large organizations with specific needs",
      isPopular: false,
      multiButton: true,
      buttons: [
        {
          text: "Schedule a Meet",
          onClick: onScheduleMeetClick,
          primary: true,
        },
        {
          text: "Get a Call",
          onClick: onContactSalesClick,
          primary: false,
        },
      ],
    },
  ];
  return (
    <div className="min-h-[800px] rounded-lg px-4 flex justify-center">
      <Pricing
        plans={demoPlans}
        title="New AI Simple, Transparent Pricing"
        description="Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
      />
      <Dialog open={false}>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-5 ">
            <DialogTitle>Contact our team via</DialogTitle>
            <Button variant={"secondary"}> Schedule a Meet </Button>
            <Button> Get a Call</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
