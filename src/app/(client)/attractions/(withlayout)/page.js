import AttractionView from "@/components/ui/AttractionView";

import Head from "next/head";
import React from "react";

const Attractions = async () => {
  return (
    <>
      <Head>
        <title>Travel Point | Attractions</title>
      </Head>
      <main className="w-full px-2 ">
        <AttractionView />
      </main>
    </>
  );
};

export default Attractions;
