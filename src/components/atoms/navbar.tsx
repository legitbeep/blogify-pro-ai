"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";
import SigninButton from "./signin-button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-10 px-6">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl ">New AI</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
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
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <SignedOut>
              <SigninButton>Login</SigninButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <Button variant="outline" className="text-sm">
              Get Started
            </Button>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
