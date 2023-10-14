"use client";
import AdminHeader from "@/components/admin/AdminHeader";
import SideBar from "@/components/admin/SideBar";
import InitialLoading from "@/components/loader/InitialLoading";
import { isLoggedIn } from "@/services/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Content } = Layout;

const AdminDashboardLayout = ({ children }) => {
  const router = useRouter();
  const userLoggedIn = isLoggedIn();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);

  if (!isLoading) {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <InitialLoading />
      </div>
    );
  }

  return (
    <Layout hasSider>
      <SideBar />

      <Content
        style={{
          minHeight: "100vh",
          color: "black",
        }}
      >
        <AdminHeader />

        <div
          style={{
            padding: "10px",
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AdminDashboardLayout;
