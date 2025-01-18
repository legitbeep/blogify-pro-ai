import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { deleteCookie, login } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import AuthService from "@/api/services/authService";
import { router } from "@/main";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
  });

  let links = [{ label: "PRICING" }, { label: "GET STARTED" }];

  if (!!userQuery?.data) {
    links = links.filter((link) => link.label !== "GET STARTED");
    links = [...links, { label: "PROFILE" }, { label: "LOGOUT" }];
  }

  const onLinkClick = (link: (typeof links)[number]) => {
    switch (link.label) {
      case "PRICING":
        navigate({
          to: "/pricing",
        });
        break;
      case "GET STARTED":
        login();
        break;
      case "PROFILE":
        navigate({
          to: "/dashboard/profile",
        });
        break;
      case "LOGOUT":
        deleteCookie("authToken");
        // window.location.href = "/";
        router.navigate({
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
      <SheetContent side="top" className="h-[100dvh] w-full [&>button]:hidden">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-xl " onClick={() => setOpen(false)}>
            New AI
          </Link>
          <button onClick={() => setOpen(false)} className="p-2 rounded-full">
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col ">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => onLinkClick(link)}
              className="bg-transparent border-b text-left text-2xl py-4 hover:text-primary transition-colors max-w-full text-ellipsis overflow-hidden"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
