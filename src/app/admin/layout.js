"use client";
import AdminHeader from "@/components/admin/AdminHeader";
import SideBar from "@/components/admin/SideBar";
import { Layout } from "antd";

const { Content } = Layout;

const AdminDashboardLayout = ({ children }) => {
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
