import React from "react";
import { Card, Col, Flex, Image, Row } from "antd";
import Text from "./ui/Text";
import {
  CustomerServiceOutlined,
  SlackOutlined,
  CalendarOutlined,
} from "@ant-design/icons/lib/icons";

const TopDestinations = () => {
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
        {[...Array(6)].map((item, i) => (
          <Col className="my-3" key={i} span={8}>
            <Card
              className="shadow-md"
              cover={
                <Image
                  className="h-[200px]"
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <p className="font-bold">Dubai</p>
              <p>United Arab Emirates</p>
              <p>667 thinks to do!</p>
            </Card>
          </Col>
        ))}
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
            <Col className="my-3" key={i} span={8}>
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
