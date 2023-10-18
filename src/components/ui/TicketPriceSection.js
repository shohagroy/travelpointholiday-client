"use client";

import { Button, Card, Col, Flex, Input, Row } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import {
  CalendarOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const TicketPriceSection = ({ data }) => {
  const [ticketCount, setTicketCount] = useState(1);

  const { id, tripDate, tripTime, price, city, bookingSeat, totalSeat } =
    data || {};
  return (
    <div className="relative mt-6">
      <Row gutter={20} className="sticky top-4">
        <Col span={24}>
          <div className="sticky top-4 w-full h-full" style={{ zIndex: 1 }}>
            <Card
              title={
                <div className="py-2">
                  <h2>Ticket and Price</h2>
                  <p>Ticket availability by date</p>
                </div>
              }
              className="shadow-md w-full"
            >
              <p className="font-bold">{city?.name}</p>
              <div>
                <p className="text-2xl my-3 font-semibold bg-[#003A94] text-white text-center p-3 rounded-mm">
                  Trip Date: {dayjs(tripDate).format("MMM D, YYYY")}
                </p>

                <p className="text-2xl my-3 font-semibold bg-[#003A94] text-white text-center p-3 rounded-mm">
                  Journey Time: {tripTime} PM.
                </p>

                <p className="text-2xl my-3 font-semibold bg-[#003A94] text-white text-center p-3 rounded-mm">
                  Ticket: ${price} Only.
                </p>
              </div>

              <Card
                title={
                  <div>
                    <h4>General admission only.</h4>
                  </div>
                }
              >
                <div>
                  <Flex className="text-green-600 text-xl">
                    <p className=" mr-2 ">
                      <CalendarOutlined />
                    </p>
                    <div>
                      <p className="text-xl font-bold">
                        Free cancellation available
                      </p>
                      <p className="text-black text-sm">
                        When canceled more than 48 hours before the start time
                      </p>
                    </div>
                  </Flex>
                </div>

                <div>
                  <Flex
                    className={
                      totalSeat + bookingSeat < 10
                        ? "text-red-400"
                        : "text-green-400"
                    }
                    justify="space-between"
                    align="center"
                  >
                    <p>Available tickets</p>
                    <p className="font-bold">
                      {bookingSeat || 0}/{bookingSeat + totalSeat || 0}
                    </p>
                  </Flex>
                </div>

                <div className="my-4">
                  <p className="font-bold">How many tickets?</p>
                  <Flex justify="space-between" align="start">
                    <div className="w-full">
                      <p className="text-md font-semibold">Adult (age 18+)</p>
                      <p className="text-xs">AED 169.92</p>
                    </div>
                    <div
                      className="p-1 w-[250px]"
                      style={{
                        border: "1px solid #003A94",
                        borderRadius: "10px",
                      }}
                    >
                      <Flex>
                        <Button
                          onClick={() => setTicketCount(ticketCount - 1)}
                          type="link"
                          // icon={}
                        >
                          <MinusOutlined />
                        </Button>

                        <Input value={ticketCount} className="text-center" />

                        <Button
                          onClick={() => setTicketCount(ticketCount + 1)}
                          type="link"
                          // icon={}
                        >
                          <PlusOutlined />
                        </Button>
                      </Flex>
                    </div>
                  </Flex>

                  <Link
                    href={`/attractions/check-out?attraction=${id}&ticketCount=${ticketCount}`}
                  >
                    <Button className="mt-4 text-center w-full" type="primary">
                      Reserve
                    </Button>
                  </Link>
                </div>
              </Card>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TicketPriceSection;
