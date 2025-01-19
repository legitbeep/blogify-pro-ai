import { CONSTANTS, deleteKeyFromLocalStorage } from "@/lib/utils";
import { useClerk, useSession } from "@clerk/clerk-react";
import { useEffect } from "react";

export const useSessionHandler = () => {
  const { session } = useSession();

  useEffect(() => {
    if (!session?.user?.primaryEmailAddress) {
      deleteKeyFromLocalStorage(CONSTANTS.AUTH_TOKEN);
    }
    // Cleanup listeners when component unmounts
    return () => {};
  }, [session?.user?.primaryEmailAddress]);
};
