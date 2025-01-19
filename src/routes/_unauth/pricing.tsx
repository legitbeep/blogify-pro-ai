import { useRazorpay } from "@/api/hooks/useRazorpay";
import PaymentService from "@/api/services/paymentService";
import { Pricing } from "@/components/modules/pricing/pricing";
import { login } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { PropsWithChildren, useState } from "react";
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
import PhoneDialog from "@/components/atoms/phone-number";
import { useQuery } from "@tanstack/react-query";
import AuthService from "@/api/services/authService";

export const Route = createFileRoute("/_unauth/pricing")({
  component: RouteComponent,
});

import React from "react";

const SpotlightContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Main container */}
      <div className="min-h-[800px] rounded-lg px-4 flex justify-center relative">
        {/* Spotlight gradient overlay */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-500 to-yellow-300 dark:from-white/80 dark:to-white/10 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-500 to-yellow-300 dark:from-white/80 dark:to-white/10 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

function RouteComponent() {
  const isLoggedIn = true;
  const razorpayObj = useRazorpay();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePhoneSubmit = (phoneNumber: string) => {
    console.log("Phone number submitted:", phoneNumber);
    // Add your phone submission logic here
    toast.success("We will call you shortly!");
  };

  const onContactSalesClick = () => {
    setDialogOpen(true);
  };

  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
  });

  const onFreePlanClick = () => {
    if (isLoggedIn) {
      toast.message("Already activated!");
    } else {
      toast.error("Please login to continue!");
    }
  };

  const onProPlanClick = async (isMonthly: boolean) => {
    if (!isLoggedIn) {
      toast.error("Please login to continue!");
      return;
    }
    setPaymentLoading(true);
    try {
      const user = {
        name: userQuery?.data?.name || "",
        email: userQuery?.data?.email || "",
      };
      if (!user.name || !user.email) {
        throw new Error("User details not found");
      }
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
          userId: userQuery?.data?.id ?? "",
        },
        order_id: res.id,
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
    setPaymentLoading(false);
  };

  const onScheduleMeetClick = () => {
    window.open("https://calendly.com/superlevelhackathon/30min", "_blank");
  };

  const demoPlans = [
    {
      name: "Free Trial",
      price: "Free",
      yearlyPrice: "Free",
      period: "per month",
      features: [
        "1 free usage",
        "Basic analytics",
        "48-hour support response time",
      ],
      description: "Perfect for individuals and small projects",
      buttonText: isLoggedIn ? "Included in plan" : "Start Free Trial",
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
        "Add 5 more usage!",
        "Advanced analytics",
        "24-hour support response time",
        "Full API access upto 5 usage!",
        "Priority support",
      ],
      description: "Ideal for growing teams and businesses",
      buttonText: "Get Started",
      isPopular: true,
      onClick: onProPlanClick,
      loading: paymentLoading || razorpayObj.isLoading,
    },
    {
      name: "Enterprise",
      price: "Custom Plan",
      yearlyPrice: "Custom Plan",
      period: "per month",
      features: [
        "Everything in Professional",
        "Custom solutions",
        "Dedicated account manager",
        "1-hour support response time",
        "Advanced security",
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
    // <div className="min-h-[800px] rounded-lg px-4 flex justify-center">
    <SpotlightContainer>
      <Pricing
        plans={demoPlans}
        title="Blogify Pro Simple, Transparent Pricing"
        description="Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
      />
      <PhoneDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handlePhoneSubmit}
      />
    </SpotlightContainer>
  );
}
