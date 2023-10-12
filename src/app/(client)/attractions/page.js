"use client";

import AttractionCard from "@/components/ui/AttractionCard";
import Head from "next/head";
import React from "react";
const Attractions = () => {
  return (
    <>
      <Head>
        <title>Travel Point | Attractions</title>
      </Head>
      <main className="">
        {[...Array(20)].map((item, i) => (
          <AttractionCard key={i} />
        ))}
      </main>
    </>
  );
};

export default Attractions;
