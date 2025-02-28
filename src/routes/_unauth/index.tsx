import AuthService from "@/api/services/authService";

// import useWebSocketDemo from "@/api/hooks/useWebSocketConnection";
import { FileUploader } from "@/components/atoms/file-uploader";
import BlogListing from "@/components/modules/blogs/blogs-listing";

// import GradientBackground from "@/components/atoms/gradient-bg";
// import NotificationComponent from "@/components/atoms/notification";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
// import { DefaultAreaChart } from "@/components/ui/graphs/area-graph/default";
// import { DefaultBarGraph } from "@/components/ui/graphs/bar-graph/default";
// import { DefaultLineGraph } from "@/components/ui/graphs/line-graph/default";
// import { DefaultPieGraph } from "@/components/ui/graphs/pie-graph/default";
// import { DefaultRadarGraph } from "@/components/ui/graphs/radar-graph/default";
// import { DefaultRadialGraph } from "@/components/ui/graphs/radial-graph/default";
import Particles from "@/components/ui/particles";
import { cn, login } from "@/lib/utils";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuth, useSignIn } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

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
  const [createPost, setCreatePost] = useState(false);

  const { isLoaded, signIn } = useSignIn();
  const { isSignedIn } = useAuth();

  const handleGoogleLogin = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  // const [orderLoading, setOrderLoading] = useState(false);
  // const razorpayObj = useRazorpay();
  // const { initiatePayment, isLoading } = razorpayObj;
  // const [showChat, setShowChat] = useState(false);

  const navigate = useNavigate();

  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
  });
  useEffect(() => {
    setColor(theme === "light" ? "#000" : "#fff");
  }, [theme]);

  const onGetStarted = () => {
    if (!!userQuery?.data) {
      if (userQuery?.data?.post_remaining == 0) {
        toast.error("Your AI usage limit has been reached, purchase more!");
        navigate({
          to: "/pricing",
        });
      } else setCreatePost(true); // Open FileUploader
    } else {
      handleGoogleLogin();
    }
  };

  const closeFileUploader = () => {
    setCreatePost(false); // Close FileUploader
  };

  return (
    <>
      <AuroraBackground className="min-h-[100dvh]">
        <div className="relative min-h-[100dvh] w-full overflow-x-hidden px-4 flex flex-col">
          <div className="container mx-auto w-full flex-grow flex flex-col md:flex-row items-center justify-center py-8 md:py-14">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
              <div className="text-center space-y-6">
                <div className="w-auto flex items-center justify-center">
                  <AnimatedGradientText>
                    ✨ <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                    <span
                      className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                      )}
                    >
                      Introducing Blogify Pro
                    </span>
                    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedGradientText>
                </div>
                <h1 className="bg-gradient-to-br leading-none text-transparent dark:from-white from-black/80 from-40% dark:to-black/30 to-orange-700 bg-clip-text text-2xl font-bold text-balance sm:text-2xl md:text-4xl lg:text-6xl animate-fade-in text-center">
                  Blogify Pro is the way to create blogs Fast!
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl text-center mx-auto">
                  Access an ever-growing collection of premium, meticulously
                  crafted templates and component packs. Save time and focus on
                  what matters—building standout websites that captivate your
                  audience.
                </p>
                <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                  <Button
                    size="lg"
                    className="h-11 group relative"
                    onClick={onGetStarted}
                    disabled={userQuery?.isLoading}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 ease-in-out group-hover:translate-x-4" />
                  </Button>
                  <Button
                    size="lg"
                    className="h-11"
                    variant={"secondary"}
                    onClick={() =>
                      navigate({
                        to: "/pricing",
                      })
                    }
                  >
                    Pricing Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Particles
            className="absolute inset-0 z-0"
            quantity={60}
            ease={80}
            color={color}
            refresh
          />
        </div>
      </AuroraBackground>
      <BlogListing />
      {createPost && (
        <FileUploader isOpen={createPost} onClose={closeFileUploader} />
      )}
    </>
  );
}
