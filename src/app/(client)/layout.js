"use client";

import Footer from "@/shared/Footer";
import Header from "@/shared/header/Header";

const ClientLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default ClientLayout;
