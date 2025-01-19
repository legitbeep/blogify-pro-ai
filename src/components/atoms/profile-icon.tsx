import AuthService from "@/api/services/authService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import SigninButton from "./signin-button";
import { useNavigate } from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { CONSTANTS, deleteKeyFromLocalStorage } from "@/lib/utils";
const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

type sizeKey = keyof typeof sizeClasses;
const ProfileIcon = ({ size = "md" }: { size?: sizeKey }) => {
  const { session } = useClerk();
  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
  });
  const navigate = useNavigate();

  if (userQuery?.isLoading)
    return (
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 animate-pulse`}
        role="status"
        aria-label="Loading profile"
      ></div>
    );

  // return !!userQuery?.data ? (
  //   <button
  //     onClick={onProfileClick}
  //     className={`${sizeClasses[size]} rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:opacity-90 transition-opacity`}
  //   >
  //     {userQuery?.data?.picture ? (
  //       <img
  //         src={userQuery?.data?.picture}
  //         alt={userQuery?.data?.name}
  //         className="w-full h-full object-cover"
  //         referrerPolicy="no-referrer"
  //       />
  //     ) : (
  //       // Fallback avatar when no image is provided
  //       <div className="w-full h-full bg-gray-200 flex items-center justify-center">
  //         <span className="text-gray-500 text-lg">
  //           {userQuery?.data?.name?.charAt(0)?.toUpperCase()}
  //         </span>
  //       </div>
  //     )}
  //   </button>
  // ) : (
  //   <div className="hidden md:flex items-center space-x-4 w-full">
  //     <SigninButton>Login</SigninButton>
  //   </div>
  // );

  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
};

export default ProfileIcon;
