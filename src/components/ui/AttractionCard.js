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

const AttractionCard = () => {
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
            <div>
              <Image
                src="https:r-xx.bstatic.com/xdata/images/xphoto/300x320/144059754.jpg?k=8e2414e149019a810c571938bba5a045c7a2f2be710fbe39b0d2e7704155c536&o="
                alt="image"
                className="w-[180px] h-full rounded-md"
              />
            </div>

            <div className="w-full  pl-3">
              <p className="font-bold">Dubai</p>
              <Link href={"/"}>
                <h2 className="text-blue-600">
                  Burj Khalifa Admission Tickets: Floors 124 and 125
                </h2>
              </Link>
              <p className="">
                Gaze over Dubai from the top of the Burj Khalifa
              </p>

              <div className="mt-2">
                <p className="mr-2 text-gray-600">
                  <FieldTimeOutlined /> <span>Duration 3 hours 30 minites</span>
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
                      From <strong className="text-2xl">$3445</strong>
                    </p>

                    <Link href={"/"}>
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
