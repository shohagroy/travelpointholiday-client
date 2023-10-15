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
                label: "Admin",
                link: "/admin",
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
