"use client";

import React from "react";
import { Card, Col, Flex, Image, Row } from "antd";
import Text from "./ui/Text";
import {
  CustomerServiceOutlined,
  SlackOutlined,
  CalendarOutlined,
} from "@ant-design/icons/lib/icons";
import { useGetAllAttractionsQuery } from "@/redux/features/attraction/attractionApi";
import Link from "next/link";
import CardLoader from "./skeleton-loader/CardLoader";

const TopDestinations = () => {
  const { data, isLoading } = useGetAllAttractionsQuery({ size: 6 });
  const items = [
    {
      tittle: "Explore top attractions",
      description:
        "Experience the best of your destination with attractions, tours, activities, and more",
      icon: <SlackOutlined />,
    },
    {
      tittle: "Fast and flexible",
      description:
        "Book tickets online in minutes, with free cancellation on many attractions",
      icon: <CalendarOutlined />,
    },
    {
      tittle: "Support when you need it",
      description:
        "Booking.com's global Customer Service team is here to help 24/7",

      icon: <CustomerServiceOutlined />,
    },
  ];
  return (
    <div className="max-w-7xl mx-auto mt-14  p-3 lg:p-6">
      <Text text={"Top destinations"} />

      <Row className="" gutter={20}>
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <Col key={i} className="my-3" xs={24} sm={12} md={8} lg={8}>
                <CardLoader />
              </Col>
            ))
          : data?.data?.map((item, i) => (
              <Col className="my-3" key={i} xs={24} sm={12} md={8} lg={8}>
                <Link href={`/attractions?categoryId=${item?.category?.id}`}>
                  <Card
                    className="shadow-md"
                    cover={
                      <Image
                        preview={false}
                        className="h-[200px]"
                        alt="example"
                        src={item?.images[0]?.secure_url}
                      />
                    }
                  >
                    <p className="font-bold">{item?.city?.name}</p>
                    <p>{item?.country?.name}</p>
                    <p>{item?.banarTittle}</p>
                  </Card>
                </Link>
              </Col>
            ))}

        {}
      </Row>

      <div
        className="mt-10 p-10"
        style={{
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
        }}
      >
        <Text text={"We've got you covered"} />
        <Row gutter={20}>
          {items.map((item, i) => (
            <Col className="my-3" key={i} xs={24} sm={12} md={8} lg={8}>
              <Flex gap={10}>
                <div className="text-2xl text-green-600">{item?.icon}</div>
                <div>
                  <p className="font-bold">{item?.tittle}</p>
                  <p>{item?.description}</p>
                </div>
              </Flex>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TopDestinations;
