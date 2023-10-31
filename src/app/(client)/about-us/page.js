import BreadcrumbBanar from "@/components/ui/BreadcrumbBanar";
import Head from "next/head";
import React from "react";

import { PlayCircleOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import TeamCard from "@/components/ui/TeamCard";
// import ReviewCard from "@/components/ui/ReviewCard";
import Subscribe from "@/components/Subscribe";

// const { Title, Text } = Typography;

export const metadata = {
  title: "About Us | Travel Point",
};

const teamMembers = [
  {
    name: "Kathryn Murphy",
    role: "Creative Director",
    img: "https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fteam-3.6e879886.jpg&w=384&q=75",
  },
  {
    name: "Leslie Alexander",
    role: "Creative Director",
    img: "https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fteam-4.f9a1082e.jpg&w=384&q=75",
  },
  {
    name: "Zin Denvar",
    role: "Sales Manager",
    img: "https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fteam-5.b4faa92d.jpg&w=384&q=75",
  },
  {
    name: "Guy Hawkins",
    role: "Developer",
    img: "https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fteam-6.888c7851.jpg&w=384&q=75",
  },
  {
    name: "Annette Black",
    role: "Developer",
    img: "https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fteam-2.02167277.jpg&w=384&q=75",
  },
  {
    name: "Deli Yanky",
    role: "Developer",
    img: "https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fteam-1.fa590d96.jpg&w=384&q=75",
  },
];

const AboutUs = () => {
  const breadItems = [
    {
      title: "About Us",
    },
  ];
  return (
    <>
      <Head>
        <title>Travel Point | About Us</title>
      </Head>

      <main>
        <BreadcrumbBanar
          breadItems={breadItems}
          name={"About Us"}
          tittle={"About of Travel Point Holiday"}
        />

        <section className="my-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-0">
            <Row gutter={10}>
              <Col sm={24} lg={12}>
                <div>
                  <h3 className="text-xl lg:text-3xl mb-2 font-semibold">
                    It started with a bang now we are here.
                  </h3>

                  <div className="mt-3 text-base opacity-90 leading-7">
                    <p>
                      Ut at maximus magna. Vestibulum interdum sapien in
                      facilisis imperdiet. Pellentesque habitant morbi tristique
                      senectus et netus et malesuada fames ac turpis egestas.
                      Proin ac placerat risus. Nullam eget tortor felis. Nulla
                      facilisi.Vestibulum mattis diam non luctus elementum. Cras
                      sollicitudin, nisi in semper viverra, felis diam consequat
                      mi, quis tincidunt ligula
                    </p>
                    <p>
                      Nam nibh diam, varius quis lectus eget, laoreet cursus
                      metus. morbi augue lectus, dapibus eget justo nec,
                      consectetur auctor nis luctus neque.!
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-6 mt-8">
                    <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                      <span className="text-3xl block font-extrabold mb-4 text-gray-800">
                        10K
                      </span>
                      <h4 className="text-lg font-bold mb-1">
                        Listed Products
                      </h4>
                      <p className="mb-0 opacity-90 leading-7">
                        Dynamically morph team driven partnerships after
                        vertical.
                      </p>
                    </div>
                    <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                      <span className="text-3xl block font-extrabold mb-4 text-gray-800">
                        8K
                      </span>
                      <h4 className="text-lg font-bold mb-1">
                        Lovely Customer
                      </h4>
                      <p className="mb-0 opacity-90 leading-7">
                        Competently productize virtual models without
                        performance.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col sm={24} lg={12}>
                <div
                  className="relative h-full w-full"
                  style={{
                    backgroundImage: `url("https://hamart-shop.vercel.app/_next/static/media/faq-img.fe5fd98a.jpg")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "100%",
                    with: "100%",
                  }}
                >
                  <div className="bg-black/40 h-full w-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <p className="text-5xl text-white cursor-pointer">
                        <PlayCircleOutlined />
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col sm={24} lg={12}></Col>
            </Row>
          </div>
        </section>

        <div>
          <div className="p-3 lg:p-0">
            <div className="py-10">
              <div className="grid grid-flow-row  lg:grid-cols-2 gap-4 lg:gap-16 items-center"></div>
            </div>

            {/* =====> */}
            {/* <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl">
                <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                  Our Client Reviews
                </h3>
              </div>

              <Row gutter={16}>
                {[...Array(2)].map((item, i) => (
                  <Col span={12} key={i}>
                    <ReviewCard />
                  </Col>
                ))}
              </Row>
            </div> */}
            {/* <OurClientReviews /> */}
          </div>
        </div>

        <div className="my-10">
          <Subscribe />
        </div>

        <section className="max-w-7xl mx-auto my-6">
          <div className="p-3 lg:p-0">
            <div className="py-10">
              <div className="grid grid-flow-row lg:grid-cols-2 gap-4 lg:gap-16 items-center"></div>
              {/* welcome to our part end */}
            </div>

            {/* =====> */}
            <div className=" py-10">
              <div className="max-w-screen-2xl mx-auto">
                <div className="max-w-2xl">
                  <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                    One Team , Many Talents
                  </h3>
                </div>
                <div className="grid sm:grid-cols-1 gap-x-5 gap-y-8 lg:grid-cols-6 xl:gap-x-8">
                  {teamMembers.map((teamMember) => (
                    <TeamCard key={teamMember.name} data={teamMember} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutUs;
