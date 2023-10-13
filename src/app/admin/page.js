import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";
import Head from "next/head";
import React from "react";

const AdminDashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Admin | Travel Point</title>
      </Head>
      <main>
        <section>
          <AdminBreadCrumb
            items={[
              {
                label: "super_admin",
                link: "/super_admin",
              },
            ]}
          />
          <div>this is admin dashboard</div>;
        </section>
      </main>
    </>
  );
};

export default AdminDashboard;
