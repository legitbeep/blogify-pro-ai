import { PropsWithChildren } from "react";
import Footer from "../atoms/footer";
import Navbar from "../atoms/navbar";
import { Toaster } from "sonner";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </>
  );
};

export default AppLayout;
