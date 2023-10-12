import Banar from "@/components/Banar";
import ExploreDestinations from "@/components/ExploreDestinations";
import SearchAttractions from "@/components/SearchAttractions";
import TopDestinations from "@/components/TopDestinations";
import Head from "next/head";

export default function Home() {
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

        {/* explore more*/}
        <section>
          <ExploreDestinations />
        </section>
      </main>
    </>
  );
}
