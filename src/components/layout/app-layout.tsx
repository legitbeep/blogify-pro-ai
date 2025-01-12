import React, { PropsWithChildren } from "react";
import Footer from "../atoms/footer";
import Navbar from "../atoms/navbar";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
