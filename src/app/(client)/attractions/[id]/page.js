"use client";

import BreadCrumb from "@/components/ui/Breadcrumb";
import ImageGallery from "@/components/ui/ImageGallery";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { StarFilled, CalendarOutlined } from "@ant-design/icons";
import { Col, Flex, Row } from "antd";
import AttractionReview from "@/components/ui/AttractionReview";
import FAQ from "@/components/ui/FAQ";
import LeaveFeedback from "@/components/ui/LeaveFeedback";
import { useGetAttractionQuery } from "@/redux/features/attraction/attractionApi";
import TicketPriceSection from "@/components/ui/TicketPriceSection";
import InitialLoading from "@/components/loader/InitialLoading";

const AttractionDetails = ({ params }) => {
  const { id } = params;

  const { data, isLoading } = useGetAttractionQuery(id);

  const {
    id: attractionId,
    tittle,
    banarTittle,
    images,
    description,
    country,
  } = data?.data || {};

  const breadItems = [
    {
      title: <Link href={"/attractions"}>Attractions</Link>,
    },
    {
      title: tittle,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <InitialLoading />
      </div>
    );
  }

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
                  <p className="font-bold text-gray-500">{country?.name}</p>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>

                {/* review section  */}
                {attractionId && <AttractionReview id={attractionId} />}

                {/* faq section  */}
                <FAQ />

                {/* feedback  */}
                <LeaveFeedback id={attractionId} />
              </Col>

              <Col span={8} className="relative">
                <div className="sticky top-4 z-50">
                  <TicketPriceSection data={data?.data} />
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
