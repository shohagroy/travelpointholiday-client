import AttractionView from "@/components/ui/AttractionView";

import Head from "next/head";
import React from "react";

const Attractions = async () => {
  // console.log(params);
  // console.log(searchParams);
  return (
    <>
      <Head>
        <title>Travel Point | Attractions</title>
      </Head>
      <main className="">
        <AttractionView />
      </main>
    </>
  );
};

export default Attractions;
