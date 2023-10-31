import AttractionView from "@/components/ui/AttractionView";
import React from "react";

export const metadata = {
  title: "Attractions | Travel Point",
};

const Attractions = async () => {
  return (
    <>
      <main className="">
        <AttractionView />
      </main>
    </>
  );
};

export default Attractions;
