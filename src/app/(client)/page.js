"use client";

import Banar from "@/components/Banar";
import ExploreDestinations from "@/components/ExploreDestinations";
import SearchAttractions from "@/components/SearchAttractions";
import Subscribe from "@/components/Subscribe";
import TopDestinations from "@/components/TopDestinations";
import PrivateRouteHOC from "@/routes/PrivateRoute";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Travel Point | Home</title>
      </Head>
      <main>
        {/* banar section  */}
        <section>
          <Banar />
        </section>

        {/* search section  */}
        <section>
          <SearchAttractions />
          <TopDestinations />
        </section>

        {/* subscribe section  */}
        <Subscribe />

        {/* explore more*/}
        <section>
          <ExploreDestinations />
        </section>
      </main>
    </>
  );
};

Home.getLayout = (page) => {
  return <PrivateRouteHOC>{page}</PrivateRouteHOC>;
};

export default PrivateRouteHOC(Home);
