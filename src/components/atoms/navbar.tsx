import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";
import SigninButton from "./signin-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, BellDot } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  // const [isNewMessage, setIsNewMessage] = useState(false);
  let isNewMessage = false;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center md:px-10 px-6">
        <div className="flex flex-1 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl ">New AI</span>
          </Link>

          {/* <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Careers
            </Link>
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact Us
            </Link>
          </nav> */}

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Popover>
              <PopoverTrigger className="">
                {isNewMessage ? (
                  <BellDot className="w-9 h-9 p-2 text-red-500 hover:bg-accent  rounded-full" />
                ) : (
                  <Bell className="w-9 h-9 p-2  hover:bg-accent hover:text-accent-foreground rounded-full" />
                )}
              </PopoverTrigger>
              <PopoverContent>
                Place content for the popover here.
              </PopoverContent>
            </Popover>
            <div className="hidden md:flex items-center space-x-4">
              <SignedOut>
                <SigninButton>Login</SigninButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <Button variant="outline" className="text-sm">
                Get Started
              </Button>
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
