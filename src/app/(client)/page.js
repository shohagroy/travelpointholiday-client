import Banar from "@/components/Banar";
import ExploreDestinations from "@/components/ExploreDestinations";
import SearchAttractions from "@/components/SearchAttractions";
import Subscribe from "@/components/Subscribe";
import TopDestinations from "@/components/TopDestinations";

export const metadata = {
  title: "Travel Point | Home",
};

const Home = ({ searchParams }) => {
  return (
    <main>
      {/* banar section  */}
      <section>
        <Banar token={searchParams?.token} />
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
  );
};

export default Home;
