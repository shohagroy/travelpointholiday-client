"use client";

import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import { SlackOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { searchQuery } from "@/redux/features/attraction/attractionSlice";

const SearchAttractions = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const setSearchQueryHandelar = () => {
    dispatch(searchQuery(search));
  };

  return (
    <div className="bg-[#013A95] text-white ">
      <div className="max-w-7xl mx-auto p-4 lg:p-10 relative">
        <div>
          <h1 className="lg:text-5xl">
            Attractions, activities, and <br /> experiences
          </h1>

          <p className="py-3 lg:py-6 lg:text-2xl">
            Discover new attractions and experiences to <br /> match your
            interests and travel style
          </p>
        </div>

        <div className="absolute lg:-bottom-10 w-full left-0 px-4">
          <Space
            direction="vertical"
            size="large"
            className=" hidden lg:block lg:px-5 w-full "
          >
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border-2 text-2xl h-[80px] p-3 border-[#FFB601]"
                prefix={
                  <p className="text- bg-white border-r">
                    <SlackOutlined />
                  </p>
                }
                value={search}
                placeholder="Search Attractions... "
              />

              <Link href={`/attractions`}>
                <Button
                  onClick={() => setSearchQueryHandelar()}
                  icon={<SearchOutlined />}
                  type="primary"
                  className="border-2 h-[80px] p-3 border-[#FFB601]"
                  size="large"
                >
                  Search
                </Button>
              </Link>
            </Space.Compact>
          </Space>

          <Space
            direction="vertical"
            size="small"
            className=" lg:hidden w-full "
          >
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border-2  p-3 border-[#FFB601]"
                prefix={
                  <p className=" bg-white border-r">
                    <SlackOutlined />
                  </p>
                }
                value={search}
                placeholder="Search Attractions... "
              />

              <Link href={`/attractions`}>
                <Button
                  onClick={() => setSearchQueryHandelar()}
                  icon={<SearchOutlined />}
                  type="primary"
                  className="border-2 h-full border-[#FFB601]"
                  size="small"
                >
                  Search
                </Button>
              </Link>
            </Space.Compact>
          </Space>

          {/* <div className="felx justify-center items-center">
            <input
              placeholder="search..."
              className="bg-white border-2 p-4 border-[#FFB601] text-xl w-[90%] h-[100px] rounded-md"
            />
            <Button className="" size="large" type="primary h-[100px] w-[10%]">
              Search
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchAttractions;
