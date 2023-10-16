"use client";

import React from "react";
import { Badge, Button, Card, Flex, Image, Space } from "antd";
import {
  StarFilled,
  CalendarOutlined,
  RightOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const AttractionCard = ({ data }) => {
  const { id, banarTittle, images, price, tittle, duration, city } = data || {};

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        width: "100%",
        margin: "10px 0",
      }}
    >
      <Badge.Ribbon text="Hippies" color="#003B95">
        <Card className="shadow-sm hover:shadow-md duration-200">
          <Flex>
            <div className="w-[400px] h-[200px] bg-gray-200  rounded-md">
              <Image
                preview={false}
                src={images[0]?.secure_url}
                alt="image"
                className=" w-full h-[200px]  rounded-md"
                style={{ objectFit: "fill" }}
              />
            </div>

            <div className="w-full  pl-3">
              <p className="font-bold">{city?.name}</p>
              <Link href={"/"}>
                <h2 className="text-blue-600">{tittle}</h2>
              </Link>
              <p className="">{banarTittle}</p>

              <div className="mt-2">
                <p className="mr-2 text-gray-600">
                  <FieldTimeOutlined /> <span>Duration: {duration}</span>
                </p>
                <Flex justify="space-between" align="start">
                  <div>
                    <Flex>
                      <p className="text-yellow-500 mr-2">
                        <StarFilled />
                      </p>
                      <p>
                        <strong>4.4/5</strong> (1343 reviews)
                      </p>
                    </Flex>

                    <p className="mr-2 text-green-600">
                      <CalendarOutlined />{" "}
                      <span>Free cancellation available</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-right py-1">
                      From <strong className="text-2xl">${price}</strong>
                    </p>

                    <Link href={`/attractions/${id}`}>
                      <Button
                        size="large"
                        type="link"
                        className="px-6 font-bold border border-blue-600"
                      >
                        See Availability <RightOutlined />
                      </Button>
                    </Link>
                  </div>
                </Flex>
              </div>
            </div>
          </Flex>
        </Card>
      </Badge.Ribbon>
    </Space>
  );
};

export default AttractionCard;
