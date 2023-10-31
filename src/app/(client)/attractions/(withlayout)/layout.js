"use client";

import BreadCrumb from "@/components/ui/Breadcrumb";
import FilterOptions from "@/components/ui/FilterOptions";
import PaginationOprions from "@/components/ui/PaginationOprions";
import SortByFilds from "@/components/ui/SortByFilds";
import { Button, Card, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllAttractionsQuery } from "@/redux/features/attraction/attractionApi";
import { useDebounced } from "@/redux/hooks/useDebounced";
import AttractionLoader from "@/components/skeleton-loader/AttractionLoader";
import { useDispatch, useSelector } from "react-redux";
import { storeAttractionData } from "@/redux/features/attraction/attractionSlice";
import CardLoader from "@/components/skeleton-loader/CardLoader";
import SmFilter from "@/components/ui/SmFilter";

const AttractionLayout = ({ children }) => {
  const { search: attractionSearch } = useSelector((state) => state.attraction);
  const [sortBy, setSortBy] = useState("price");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState(attractionSearch);
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useDispatch();

  const query = {};
  query["size"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
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

  useEffect(() => {
    dispatch(storeAttractionData(data?.data));
  }, [data, dispatch]);

  const breadItems = [
    {
      title: "Attractions",
    },
  ];

  const sortedItemsLg = [
    {
      title: "Our top Picks",
      value: "",
    },
    {
      title: "Price Highest to Lowest",
      value: "desc",
    },
    {
      title: "Price Lowest to Highest",
      value: "asc",
    },
  ];

  const sortedItemsSm = [
    {
      title: "Top Pick",
      value: "",
    },
    {
      title: "High to Low",
      value: "desc",
    },
    {
      title: "Low to High",
      value: "asc",
    },
  ];

  return (
    <div>
      <BreadCrumb breadItems={breadItems} />
      <section className="max-w-7xl mx-auto">
        <div>
          <Row gutter={20} className="relative">
            <Col className="my-3 sticky top-0 hidden lg:block" span={8}>
              {/* <FilterOptions /> */}

              <div className=" sticky top-4" style={{ zIndex: 1 }}>
                <Card className="shadow-md">
                  <div>
                    <Input
                      defaultValue={attractionSearch}
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

            <Col className="my-3 hidden lg:block" span={16}>
              <div className="">
                <SortByFilds
                  data={sortedItemsLg}
                  value={sortOrder}
                  setFn={setSortOrder}
                />
              </div>

              <div className="w-full ">
                {isLoading ? (
                  <AttractionLoader count={10} />
                ) : data?.data?.length ? (
                  children
                ) : (
                  <div className="h-[40vh] flex justify-center items-center">
                    <h2 className="text-xl">No Items found!</h2>
                  </div>
                )}
              </div>

              {data?.data?.length && (
                <PaginationOprions
                  setPage={setPage}
                  size={size}
                  setSize={setSize}
                  page={page}
                  meta={data?.meta}
                />
              )}
            </Col>

            <Col className="my-3 block lg:hidden" span={24}>
              <div className="w-full ">
                <div className="px-4">
                  <Input
                    defaultValue={attractionSearch}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="large"
                    placeholder="search your attraction.."
                    prefix={<SearchOutlined />}
                  />
                </div>
                <div className="">
                  <SortByFilds
                    data={sortedItemsSm}
                    value={sortOrder}
                    setFn={setSortOrder}
                  />
                  <SmFilter
                    setCategoryId={setCategoryId}
                    setCountryId={setCountryId}
                    setCityId={setCityId}
                  />
                </div>
                {isLoading ? (
                  <div>
                    <div className="hidden lg:block">
                      <AttractionLoader count={10} />
                    </div>

                    <div className="lg:hidden">
                      {[...Array(6)].map((_, i) => (
                        <Col
                          key={i}
                          className="my-3"
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                        >
                          <CardLoader />
                        </Col>
                      ))}
                    </div>
                  </div>
                ) : data?.data?.length ? (
                  children
                ) : (
                  <div className="h-[40vh] flex justify-center items-center">
                    <h2 className="text-xl">No Items found!</h2>
                  </div>
                )}
              </div>

              {data?.data?.length && (
                <PaginationOprions
                  setPage={setPage}
                  size={size}
                  setSize={setSize}
                  page={page}
                  meta={data?.meta}
                />
              )}
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default AttractionLayout;
