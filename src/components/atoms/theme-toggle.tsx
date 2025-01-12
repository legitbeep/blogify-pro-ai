import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";

export function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <Button onClick={toggleTheme} variant={"ghost"} size={"icon"}>
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
