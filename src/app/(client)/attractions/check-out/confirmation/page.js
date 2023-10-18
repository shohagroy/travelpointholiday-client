import { useGetAttractionQuery } from "@/redux/features/attraction/attractionApi";
import Head from "next/head";
import React from "react";

const ConfirmationPage = ({ searchParams }) => {
  const { attraction } = searchParams || {};

  const { data: attractionData, isLoading: attractionLoading } =
    useGetAttractionQuery(attraction);

  return (
    <>
      <Head>
        <title>Travel Point | Attraction | Booking Confirmation</title>
      </Head>

      <main>
        <section>asdfhkjashfdkjshdfkhk</section>
      </main>
    </>
  );
};

export default ConfirmationPage;
