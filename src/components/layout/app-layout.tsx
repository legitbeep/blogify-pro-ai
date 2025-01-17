import { PropsWithChildren } from "react";
import Footer from "../atoms/footer";
import Navbar from "../atoms/navbar";
import { Toaster } from "sonner";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen min-w-screen">
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </div>
  );
};

export default AppLayout;
