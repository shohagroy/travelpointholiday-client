"use client";

import React, { useState } from "react";
import Text from "./ui/Text";
import { Col, Row, Menu } from "antd";

const ExploreDestinations = () => {
  const [current, setCurrent] = useState("Europe");

  const items = [
    {
      label: "Europe",
      key: "Europe",
    },
    {
      label: "North America",
      key: "North America",
    },
    {
      label: "Asia",
      key: "Asia",
    },
    {
      label: "Africa",
      key: "Africa",
    },
    {
      label: "Bangladesh",
      key: "Bangladesh",
    },
    {
      label: "India",
      key: "India",
    },
  ];

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Row gutter={20}>
        <Col className="my-3" span={8}>
          <Text text={"Explore more destinations"} />
          <p>Find things to do in cities around the world</p>
        </Col>
      </Row>

      <div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>

      <div>
        <Row gutter={20}>
          {[...Array(32)].map((item, i) => (
            <Col className="my-3" key={i} span={6}>
              <div className="h-[200px] w-full relative">
                <div className="h-full w-full  opacity-100 rounded-md overflow-hidden hover:opacity-80 transition-opacity">
                  <img
                    className="w-full h-full object-cover hover:scale-105 duration-300"
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
                <div className="text-white absolute bottom-3 left-4">
                  <p className="font-bold">Dubai</p>
                  <p>122 things to do</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ExploreDestinations;
