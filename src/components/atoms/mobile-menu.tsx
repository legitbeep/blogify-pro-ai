import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { login } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { label: "PRICING" },
    { label: "LOGIN" },
    { label: "GET STARTED" },
  ];

  const onLinkClick = (link: (typeof links)[number]) => {
    switch (link.label) {
      case "PRICING":
        navigate({
          to: "/pricing",
        });
        break;
      case "LOGIN":
        login();
        break;
      case "GET STARTED":
        navigate({
          to: "/",
        });
        break;
    }
    setOpen(false);
  };

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
            <button
              key={link.label}
              onClick={() => onLinkClick(link)}
              className="bg-transparent border-none text-left text-2xl py-2 hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
