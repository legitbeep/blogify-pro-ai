import { Input } from "@/components/ui/input";
import { getTokenFromCookie, setCookie } from "@/lib/utils";
import { PropsWithChildren, useEffect, useState } from "react";

const FullScreenLock = ({ children }: PropsWithChildren) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const isAuthenticated = getTokenFromCookie("isAuthenticated");
    if (isAuthenticated && isAuthenticated === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password == "sarthak") {
      setCookie("isAuthenticated", "true", 1);
      setIsAuthenticated(true);
    }
    setPassword("");
  };

  return !isAuthenticated ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className={"h-12 text-lg text-center"}
          required
        />
      </form>
    </div>
  ) : (
    <>{children}</>
  );
};

export default FullScreenLock;
