"use client";

import BreadCrumb from "@/components/ui/Breadcrumb";
import ImageGallery from "@/components/ui/ImageGallery";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  StarFilled,
  CalendarOutlined,
  RightOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Button, Col, Descriptions, Flex, Row } from "antd";
import AttractionReview from "@/components/ui/AttractionReview";
import FAQ from "@/components/ui/FAQ";
import LeaveFeedback from "@/components/ui/LeaveFeedback";
import { useGetAttractionQuery } from "@/redux/features/attraction/attractionApi";

const AttractionDetails = ({ params }) => {
  const { id } = params;

  const { data, isLoading } = useGetAttractionQuery(id);

  const { tittle, banarTittle, images, price, duration, city, description } =
    data?.data || {};

  console.log(data?.data);

  console.log(tittle);

  const breadItems = [
    {
      title: <Link href={"/attractions"}>Attractions</Link>,
    },
    {
      title: tittle,
    },
  ];

  return (
    <>
      <Head>
        <title>Travel Point | Attractions | Details</title>
      </Head>
      <main>
        <BreadCrumb breadItems={breadItems} />
        <section className="max-w-7xl mx-auto p-2">
          <div>
            <h1>{tittle}</h1>
            <p>{banarTittle}</p>
          </div>

          <div className="my-4">
            <ImageGallery images={images} />
          </div>

          {/* details section  */}
          <div>
            <Row gutter={16}>
              <Col span={16}>
                <div>
                  <Flex>
                    <p className="text-yellow-500 mr-2">
                      <StarFilled />
                    </p>
                    <p>
                      <strong>4.4/5</strong> (1343 reviews)
                    </p>
                  </Flex>
                  <Flex className="text-green-600 text-xl">
                    <p className=" mr-2 ">
                      <CalendarOutlined />
                    </p>
                    <p>
                      <strong>Free cancellation available</strong>
                    </p>
                  </Flex>
                </div>

                <div className="text-lg mt-4">
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                  {/* <p>
                    On this river cruise in Dubai, you’ll be able to enjoy a
                    buffet of local and international dishes onboard a
                    traditional dhow boat.
                  </p>
                  <br />

                  <p>
                    You’ll sail along the Deira Creek, which is known for being
                    less crowded than the more famous Dubai Creek. As you
                    navigate this waterway through the city, you’ll watch a
                    traditional tanoura dance performance while gaining insights
                    into the local culture and heritage.
                  </p> */}
                </div>

                {/* review section  */}
                <AttractionReview />

                {/* faq section  */}
                <FAQ />

                {/* feedback  */}
                <LeaveFeedback />
              </Col>

              <Col span={8}>
                <div>
                  <Flex>
                    <p className="text-yellow-500 mr-2">
                      <StarFilled />
                    </p>
                    <p>
                      <strong>4.4/5</strong> (1343 reviews)
                    </p>
                  </Flex>
                  <Flex className="text-green-600 text-xl">
                    <p className=" mr-2 ">
                      <CalendarOutlined />
                    </p>
                    <p>
                      <strong>Free cancellation available</strong>
                    </p>
                  </Flex>
                </div>

                <div>
                  <p>
                    On this river cruise in Dubai, you’ll be able to enjoy a
                    buffet of local and international dishes onboard a
                    traditional dhow boat.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </main>
    </>
  );
};

export default AttractionDetails;
