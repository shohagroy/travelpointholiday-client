"use client";

import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";
import { Card, Col, Row, Calendar } from "antd";
import Head from "next/head";
import React from "react";
import {
  SlackOutlined,
  CheckOutlined,
  CloseOutlined,
  PoundOutlined,
} from "@ant-design/icons"; //

import DashboardCard from "@/components/dashboard/DashboardCard";
import PieChartUi from "@/components/dashboard/PieChartUi";
import { useGetAllAttractionsQuery } from "@/redux/features/attraction/attractionApi";
import { useGetAllBookingListQuery } from "@/redux/features/booking/bookingApi";
import Top10List from "@/components/dashboard/Top10List";
import InitialLoading from "@/components/loader/InitialLoading";
const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const AdminDashboard = () => {
  const { data: attractionsData, isLoading: attractionsLoading } =
    useGetAllAttractionsQuery({});

  const { data: bookingData, isLoading: bookingLoading } =
    useGetAllBookingListQuery({});

  const attractionsDataCopy = [...(attractionsData?.data || [])];

  const top5ListData = attractionsDataCopy
    .sort((a, b) => {
      return b?.bookingSeat - a?.bookingSeat;
    })
    .slice(0, 5)
    .map((item) => {
      return {
        name: item?.tittle,
        booking: item?.bookingSeat,
      };
    });

  const data = {
    attractions: attractionsData?.data?.length,
    bookingList: bookingData?.data?.data?.filter(
      (item) => item?.status === "boocked"
    )?.length,
    cancelList: bookingData?.data?.data?.filter(
      (item) => item?.status === "cancel" && !item?.refundStatus
    )?.length,

    refundList: bookingData?.data?.data?.filter(
      (item) => item?.status === "cancel" && item?.refundStatus
    )?.length,
  };

  if (bookingLoading || attractionsLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <InitialLoading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | Admin | Travel Point</title>
      </Head>
      <main>
        <section>
          <AdminBreadCrumb
            items={[
              {
                label: "Admin",
                link: "/admin",
              },
            ]}
          />
          <div className="max-w-7xl mx-auto mt-10">
            {/* <div>
              <Row gutter={16}>
                <Col span={16}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Card
                        className="bg-[#003B95] text-white"
                        loading={false}
                        hoverable
                        color="red"
                        title={
                          <div className="flex items-center py-4">
                            <Avatar icon={<UserOutlined />} size={"large"} />
                            <h3 className="ml-4 text-white">Admins</h3>
                          </div>
                        }
                      >
                        <Flex justify="space-between" align="center">
                          <p className="text-2xl font-bold">Total Admin:</p>
                          <p className="text-2xl font-bold">234</p>
                        </Flex>
                      </Card>
                    </Col>

                    <Col span={12}>
                      <Card
                        className="bg-red-600 text-white"
                        loading={false}
                        hoverable
                        color="red"
                        title={
                          <div className="flex items-center py-4">
                            <Avatar icon={<UserOutlined />} size={"large"} />
                            <h3 className="ml-4 text-white">Users</h3>
                          </div>
                        }
                      >
                        <Flex justify="space-between" align="center">
                          <p className="text-2xl font-bold">Total Users:</p>
                          <p className="text-2xl font-bold">234</p>
                        </Flex>
                      </Card>
                    </Col>

                    <Col span={24}>
                      <Row gutter={16} className="mt-4">
                        <Col className="" span={8}>
                          <Card
                            className="bg-yellow-400  text-white"
                            loading={false}
                            hoverable
                            color="red"
                            title={
                              <div className="flex items-center py-4">
                                <h3 className=" text-white">Categories</h3>
                              </div>
                            }
                          >
                            <Flex justify="space-between" align="center">
                              <p className="text-2xl font-bold">Total:</p>
                              <p className="text-2xl font-bold">234</p>
                            </Flex>
                          </Card>
                        </Col>

                        <Col className="" span={8}>
                          <Card
                            className="bg-gray-400  text-white"
                            loading={false}
                            hoverable
                            color="red"
                            title={
                              <div className="flex items-center py-4">
                                <h3 className=" text-white">Country</h3>
                              </div>
                            }
                          >
                            <Flex justify="space-between" align="center">
                              <p className="text-2xl font-bold">Total:</p>
                              <p className="text-2xl font-bold">234</p>
                            </Flex>
                          </Card>
                        </Col>

                        <Col className="" span={8}>
                          <Card
                            className="bg-green-600  text-white"
                            loading={false}
                            hoverable
                            color="red"
                            title={
                              <div className="flex items-center py-4">
                                <h3 className=" text-white">City</h3>
                              </div>
                            }
                          >
                            <Flex justify="space-between" align="center">
                              <p className="text-2xl font-bold">Total:</p>
                              <p className="text-2xl font-bold">234</p>
                            </Flex>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col span={8}>
                  <Calendar
                    className="bg-[#003B95] text-white"
                    fullscreen={false}
                    onPanelChange={onPanelChange}
                  />
                </Col>
              </Row>
            </div> */}

            <div className="mt-6">
              <Row gutter={16}>
                <Col span={16}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <DashboardCard
                        // color={"#f7770f"}
                        color={"#003B95"}
                        icon={<SlackOutlined />}
                        label="Attractions"
                        value={data?.attractions}
                      />
                    </Col>

                    <Col span={12}>
                      <DashboardCard
                        // color={"#f7770f"}
                        color={"green"}
                        icon={<CheckOutlined />}
                        label="Bookings"
                        value={data?.bookingList}
                      />
                    </Col>

                    <Col span={24}>
                      <Row gutter={16} className="mt-4">
                        <Col className="" span={12}>
                          <DashboardCard
                            color={"red"}
                            icon={<CloseOutlined />}
                            label="Canceled"
                            value={data?.cancelList}
                          />
                        </Col>

                        <Col className="" span={12}>
                          <DashboardCard
                            color={"gray"}
                            icon={<PoundOutlined />}
                            label="Refund"
                            value={data?.refundList}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col span={8}>
                  <Card hoverable className="h-full">
                    <PieChartUi data={data} />
                  </Card>
                </Col>
              </Row>
            </div>

            <div className="mt-5">
              <Row gutter={16}>
                <Col span={16}>
                  <Card hoverable>
                    <Top10List data={top5ListData} />
                  </Card>
                </Col>

                <Col span={8}>
                  <Calendar
                    className="bg-[#003B95] text-white"
                    fullscreen={false}
                    onPanelChange={onPanelChange}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminDashboard;
