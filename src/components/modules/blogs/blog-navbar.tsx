import { MobileMenu } from "@/components/atoms/mobile-menu";
import ProfileIcon from "@/components/atoms/profile-icon";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

const BlogNavbar = () => {
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My Drafts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {/* create web only visible div with flex items center spaxe-x-4 */}
            <div className="hidden md:block">
              <ProfileIcon size="sm" />
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogNavbar;
