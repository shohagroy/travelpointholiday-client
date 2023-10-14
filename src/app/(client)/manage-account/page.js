/* eslint-disable react/no-unescaped-entities */
"use client";
import { Avatar, Card, Col, Flex, Row } from "antd";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  UserAddOutlined,
  SafetyOutlined,
  BellOutlined,
  SlackOutlined,
  FundProjectionScreenOutlined,
  TransactionOutlined,
} from "@ant-design/icons";

const ManageAccountPage = () => {
  const items = [
    {
      name: "Personal details",
      details: `Update your info and find out how it's used.`,
      icon: <UserAddOutlined />,
      lebel: "Manage personal details",
      link: "/manage-account/personal-details",
    },
    {
      name: "Preferences",
      details: `Change your language, currency, and accessibility requirements`,
      icon: <FundProjectionScreenOutlined />,
      lebel: "Manage preferences",
      link: "/manage-account",
    },

    {
      name: "Security",
      details: `Adjust your security settings and set up two-factor authentication.`,
      icon: <SafetyOutlined />,
      lebel: "Manage account security",
      link: "/manage-account",
    },
    {
      name: "Payment details ",
      details: `Securely add or remove payment methods to make it easier when you book.`,
      icon: <TransactionOutlined />,
      lebel: "Manage payment details ",
      link: "/manage-account",
    },

    {
      name: "Email notifications ",
      details: `Decide what you want to be notified about and unsubscribe from what you don't.`,
      icon: <BellOutlined />,
      lebel: "Manage notifications",
      link: "/manage-account",
    },
    {
      name: "Other travelers",
      details: `Add or edit info about the people you’re traveling with.`,
      icon: <SlackOutlined />,
      lebel: "Manage travelers",
      link: "/manage-account",
    },
  ];

  return (
    <>
      <Head>
        <title>Travel Point | Profile</title>
      </Head>
      <main>
        <section className="max-w-7xl mx-auto">
          <div className="p-2 mt-4">
            <h3 className="text-3xl py-2 font-bold">Account Setting</h3>
            <p className="fontb-semibold">
              Manage your{" "}
              <span className="text-blue-600">
                travelpointholidat.vercel.app
              </span>{" "}
              experience
            </p>
          </div>

          <div>
            <Row gutter={16}>
              {items?.map((item) => (
                <Col className="my-4" key={item.name} span={12}>
                  <Link href={item.link}>
                    <Card className="shadow-md hover:shadow-lg">
                      <Flex
                        justify="start"
                        align="start"
                        className="hover:text-blue-600 duration-300"
                      >
                        <div>
                          <Avatar icon={item?.icon} size={"large"} />
                        </div>

                        <div className="ml-4">
                          <h2>{item?.name}</h2>
                          <p>{item?.details}</p>
                          <p className="text-blue-600">{item?.lebel}</p>
                        </div>
                      </Flex>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      </main>
    </>
  );
};

export default ManageAccountPage;
