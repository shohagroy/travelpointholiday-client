"use client";

import BreadCrumb from "@/components/ui/Breadcrumb";
import FilterOptions from "@/components/ui/FilterOptions";
import PaginationOprions from "@/components/ui/PaginationOprions";
import SortByFilds from "@/components/ui/SortByFilds";
import { Button, Card, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllAttractionsQuery } from "@/redux/features/attraction/attractionApi";
import InitialLoading from "@/components/loader/InitialLoading";
import { useDebounced } from "@/redux/hooks/useDebounced";

const AttractionLayout = ({ children }) => {
  const [sortBy, setSortBy] = useState("top-pick");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const query = {};
  query["size"] = size;
  query["page"] = page;
  // query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  if (countryId) {
    query["countryId"] = countryId;
  }
  if (cityId) {
    query["cityId"] = cityId;
  }
  if (categoryId) {
    query["categoryId"] = categoryId;
  }

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["search"] = debouncedTerm;
  }

  const { data, isLoading } = useGetAllAttractionsQuery({ ...query });

  const breadItems = [
    {
      title: "Attractions",
    },
  ];

  return (
    <div>
      <BreadCrumb breadItems={breadItems} />
      <section className="max-w-7xl mx-auto">
        <div>
          <Row gutter={20} className="relative">
            <Col className="my-3 sticky top-0" span={8}>
              {/* <FilterOptions /> */}

              <div className="sticky top-4" style={{ zIndex: 1 }}>
                <Card className="shadow-md">
                  <div>
                    <Input
                      onChange={(e) => setSearchTerm(e.target.value)}
                      size="large"
                      placeholder="search your attraction.."
                      prefix={<SearchOutlined />}
                    />
                    <Button size="large" type="primary" className="w-full mt-2">
                      Search
                    </Button>
                  </div>
                </Card>

                <FilterOptions
                  setCategoryId={setCategoryId}
                  setCountryId={setCountryId}
                  setCityId={setCityId}
                />
              </div>
            </Col>

            <Col className="my-3" span={16}>
              <SortByFilds value={sortBy} setFn={setSortBy} />

              <div className="">
                {isLoading ? (
                  <div className="flex justify-center items-center h-screen">
                    <InitialLoading />
                  </div>
                ) : (
                  children
                )}
              </div>
              {}
              <PaginationOprions meta={data?.meta} />
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default AttractionLayout;
