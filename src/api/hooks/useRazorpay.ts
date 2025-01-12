import { loadScript } from "@/lib/utils";
import { useThemeStore } from "@/store/useThemeStore";
import { useState, useCallback } from "react";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    backdrop_color?: string;
  };
}

interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface UseRazorpayReturn {
  initiatePayment: (options: Omit<RazorpayOptions, "key">) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

const ZINC_THEME = {
  dark: {
    color: "#71717a", // zinc-500
    backdrop_color: "#18181b", // zinc-900
    text_color: "#fafafa", // zinc-50
  },
  light: {
    color: "#3f3f46", // zinc-700
    backdrop_color: "#fafafa", // zinc-50
    text_color: "#18181b", // zinc-900
  },
};

const isRazorpayLoaded = (): boolean => {
  return window.hasOwnProperty("Razorpay");
};

export const useRazorpay = (): UseRazorpayReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { theme } = useThemeStore();

  const loadRazorpayScript = async (): Promise<boolean> => {
    // Return true immediately if script is already loaded
    if (isRazorpayLoaded()) {
      return true;
    }

    // Load the script if it's not already loaded
    return await loadScript(RAZORPAY_SCRIPT_URL);
  };

  const initiatePayment = useCallback(
    async (options: Omit<RazorpayOptions, "key">) => {
      try {
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        // Load Razorpay script
        const isScriptLoaded = await loadRazorpayScript();

        if (!isScriptLoaded) {
          throw new Error("Razorpay SDK failed to load");
        }

        // Initialize Razorpay
        const razorpay = new (window as any).Razorpay({
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          ...options,
          theme: {
            ...ZINC_THEME[theme],
            ...options.theme,
          },
          handler: function (response: PaymentResponse) {
            setIsSuccess(true);
            setIsLoading(false);
            // You can implement additional success callbacks here
            console.log("Payment successful:", response);
          },
        });
        const styleElement = document.createElement("style");
        styleElement.textContent = `
          .razorpay-backdrop {
            background: ${ZINC_THEME[theme].backdrop_color} !important;
            opacity: 0.95 !important;
          }
          .razorpay-payment-button {
            background: ${ZINC_THEME[theme].color} !important;
            color: ${ZINC_THEME[theme].text_color} !important;
          }
          .razorpay-modal {
            background: ${ZINC_THEME[theme].backdrop_color} !important;
            color: ${ZINC_THEME[theme].text_color} !important;
            border: 1px solid ${ZINC_THEME[theme].color} !important;
          }
        `;
        document.head.appendChild(styleElement);

        razorpay.on("payment.failed", function (response: any) {
          setError(response.error.description || "Payment failed");
          setIsLoading(false);
          // You can implement additional failure callbacks here
          console.error("Payment failed:", response.error);
        });

        // Open Razorpay payment dialog
        razorpay.open();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setIsLoading(false);
      }
    },
    []
  );

  return {
    initiatePayment,
    isLoading,
    error,
    isSuccess,
  };
};
