"use client";

import { Button, Input, Space } from "antd";
import React from "react";
import { SlackOutlined, SearchOutlined } from "@ant-design/icons";

const SearchAttractions = () => {
  return (
    <div className="bg-[#013A95] text-white ">
      <div className="max-w-7xl mx-auto p-4 lg:p-10 relative">
        <div>
          <h1 className="lg:text-5xl">
            Attractions, activities, and <br /> experiences
          </h1>

          <p className="py-3 lg:py-6 lg:text-2xl">
            Discover new attractions and experiences to match your <br />{" "}
            interests and travel style
          </p>
        </div>

        <div className="absolute lg:-bottom-5 w-full left-0">
          <Space direction="vertical" size="large" className=" px-5 w-full ">
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input
                className="bg-white border-2 p-3 border-[#FFB601]"
                prefix={
                  <p className="text- bg-white border-r">
                    <SlackOutlined />
                  </p>
                }
                placeholder="Search Attractions... "
              />

              <Button
                icon={<SearchOutlined />}
                type="primary"
                className="border-2 p-3 border-[#FFB601] h-[50px]"
                size="large"
              >
                Search
              </Button>
            </Space.Compact>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default SearchAttractions;
