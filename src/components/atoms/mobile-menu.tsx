import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "FEATURES" },
    { to: "/", label: "PRICING" },
    { to: "/", label: "CAREERS" },
    { to: "/", label: "CONTACT US" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-[100dvh] w-full">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="text-xl font-bold"
            onClick={() => setOpen(false)}
          >
            New AI
          </Link>
        </div>
        <nav className="flex flex-col space-y-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-2xl py-2 hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
