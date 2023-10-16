"use client";

import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";
import InitialLoading from "@/components/loader/InitialLoading";
import AttractionsEdit from "@/components/ui/AttractionsEdit";
import AttractionsImageEdit from "@/components/ui/AttractionsImageEdit";
import { useGetAttractionQuery } from "@/redux/features/attraction/attractionApi";

import Head from "next/head";
import Link from "next/link";
import React from "react";

const CreateAttractionPage = ({ params }) => {
  const { id } = params;
  const { data: attractionInfo, isLoading: initialLoading } =
    useGetAttractionQuery(id);

  const breadCrumbItems = [
    {
      label: <Link href={"/admin"}>Admin</Link>,
      link: "/admin",
    },
    {
      label: "Manage Attractions",
      link: "/admin/manage-attractions",
    },
    {
      label: `Edit Attractions - ${attractionInfo?.data?.tittle}`,
      // link: "/admin/manage-attractions/edit",
    },
  ];

  if (initialLoading) {
    return (
      <div className="h-screen">
        <InitialLoading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Travel Point | Attractions | Create Attractions</title>
      </Head>

      <main>
        <section>
          <AdminBreadCrumb items={breadCrumbItems} />

          <div className="max-w-7xl mx-auto my-6">
            <div className="my-4">
              <AttractionsImageEdit images={attractionInfo?.data?.images} />
              <AttractionsEdit defaultInfo={attractionInfo?.data} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateAttractionPage;
