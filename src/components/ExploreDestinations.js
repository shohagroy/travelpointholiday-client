"use client";

import React, { useEffect, useState } from "react";
import Text from "./ui/Text";
import { Col, Row, Menu } from "antd";
import { useGetAllCountryDataQuery } from "@/redux/features/country/countryApi";
import { useGetAllAttractionsQuery } from "@/redux/features/attraction/attractionApi";
import Image from "next/image";
import Link from "next/link";
import CardLoader from "./skeleton-loader/CardLoader";

const ExploreDestinations = () => {
  const [current, setCurrent] = useState("");

  const { data: countryData, isLoading: countryLoading } =
    useGetAllCountryDataQuery();

  useEffect(() => {
    if (!countryLoading) {
      setCurrent(countryData?.data[0]?.id);
    }
  }, [countryLoading, countryData]);

  const { data: attractionData, isLoading: attravtionLoading } =
    useGetAllAttractionsQuery({
      countryId: current,
      size: 20,
    });

  const countryOptions = countryData?.data?.map((items) => {
    return {
      label: items?.name,
      key: items?.id,
    };
  });

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Row gutter={20}>
        <Col className="my-3" span={24}>
          <Text text={"Explore more destinations"} />
          <p>Find things to do in cities around the world</p>
        </Col>
      </Row>

      <div>
        {countryLoading ? (
          <div className="animate-pulse bg-white ">
            <div className="flex items-center py-4">
              <div className=" h-6 ml-4 w-[150px] rounded bg-gray-200"></div>
              <div className=" h-6 ml-4 w-[150px] rounded bg-gray-200"></div>
              <div className=" h-6 ml-4 w-[150px] rounded bg-gray-200"></div>
            </div>
          </div>
        ) : (
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={countryOptions}
          />
        )}
      </div>

      <div>
        <Row gutter={20}>
          {attravtionLoading ? (
            [...Array(8)].map((_, i) => (
              <Col className="my-3" key={i} xs={24} sm={24} md={12} lg={6}>
                <CardLoader />
              </Col>
            ))
          ) : attractionData?.data?.length > 0 ? (
            attractionData?.data.map((item, i) => (
              <Col className="my-3" key={i} xs={24} sm={24} md={12} lg={6}>
                <Link key={i} href={`/attractions/${item?.id}`}>
                  <div className="h-[200px] w-full relative">
                    <div className="h-full w-full  opacity-100 rounded-md overflow-hidden hover:opacity-60 transition-opacity">
                      <Image
                        className="w-full bg-gray-200 h-full object-cover hover:scale-105 duration-300"
                        alt="example"
                        src={item?.images[0]?.secure_url}
                        height={100}
                        width={100}
                      />
                    </div>
                    <div className="text-white absolute bottom-3 left-4">
                      <p className="font-bold">{item?.city?.name}</p>
                      <p>{item?.banarTittle}</p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))
          ) : (
            <Col className="my-3" span={24}>
              <div className="text-2xl font-bold text-center text-red-600 min-h-[200px] flex justify-center items-center">
                <h3> No Data Found!</h3>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default ExploreDestinations;
