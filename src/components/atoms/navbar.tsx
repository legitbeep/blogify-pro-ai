import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileMenu } from "./mobile-menu";
import SigninButton from "./signin-button";
import { ThemeToggle } from "./theme-toggle";
import ProfileIcon from "./profile-icon";
import LanguageDialog from "./language-dialog";
import { SignedIn } from "@clerk/clerk-react";
import { Button } from "../ui/button";

export function Navbar() {
  // const [isNewMessage, setIsNewMessage] = useState(false);
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
      <div className="flex h-14 items-center md:px-10 px-6">
        <div className="flex flex-1 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl ">Blogify Pro</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <div className="hidden md:flex space-x-4">
              <SignedIn>
                <Link to="/dashboard/my-drafts">
                  <Button variant={"secondary"}>My Drafts</Button>
                </Link>
              </SignedIn>
              <ProfileIcon size="sm" />
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
