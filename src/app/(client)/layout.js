"use client";

import Footer from "@/shared/Footer";
import Header from "@/shared/header/Header";
import { Layout } from "antd";

const ClientLayout = ({ children }) => {
  return (
    <Layout>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </Layout>
  );
};

export default ClientLayout;
