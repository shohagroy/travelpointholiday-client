"use client";

import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";
import DisplayTable from "@/components/table/DisplayTable";
import { Button, Col, Image, Input, Row, Select, message } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryDrawer from "@/components/drawer/CategoryDrawer";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryDataQuery,
} from "@/redux/features/category/categoryApi";
import dayjs from "dayjs";
import { useDebounced } from "@/redux/hooks/useDebounced";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useGetAllAttractionsQuery } from "@/redux/features/attraction/attractionApi";
import { useGetAllCountryDataQuery } from "@/redux/features/country/countryApi";
import { useGetAllCitiesDataQuery } from "@/redux/features/city/cityAPi";

const ManageAttractions = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isEditable, setIsEditable] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [open, setOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({});
  const [modalText, setModalText] = useState({});

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

  const { data: countries, isLoading: countryLoading } =
    useGetAllCountryDataQuery();
  const countryOptions =
    countries?.data?.map((item) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    }) || [];

  const { data: cities, isLoading: cityLoading } = useGetAllCitiesDataQuery();
  const cityOptions =
    cities?.data?.map((item) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    }) || [];

  const { data: categories, isLoading: categoryLoading } =
    useGetAllCategoryDataQuery();
  const categoryOptions =
    categories?.data?.map((item) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    }) || [];

  const { data, isLoading } = useGetAllAttractionsQuery({ ...query });
  const attractionsData =
    data?.data.map((item, i) => {
      return {
        key: item?.id,
        banar: <Image alt="banar" src={item?.images[0]?.secure_url} />,
        tittle: <Link href={`/attractions/${item?.id}`}>{item?.tittle}</Link>,
        category: item?.category?.name,
        city: item?.city?.name,
        country: item?.country?.name,
        createdAt: item?.createdAt,
      };
    }) || [];
  const meta = data?.meta || {};

  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();

  const itemDeleteHandelar = async () => {
    console.log("delete", categoryInfo);
    const result = await deleteCategory(categoryInfo?.key).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Category Delete Successfully!",
      });
      setOpen(false);
    }
  };

  const openModalHandelar = (data) => {
    setCategoryInfo(data);
    setModalText({
      tittle: "Are your sure Delete this Category?",
      details: (
        <div>
          <p>
            Name: <span className="text-xl font-bold">{data?.name}</span>
          </p>
        </div>
      ),
    });
    setOpen(true);
  };

  const handelCategoryUpdate = (data) => {
    setCategoryInfo(data);
    setIsEditable(true);
  };

  const columns = [
    {
      title: <p>Banar</p>,
      dataIndex: "banar",
      width: 200,
      align: "center",
    },
    {
      title: <p>Tittle</p>,
      dataIndex: "tittle",
      width: 300,
      align: "center",
    },
    {
      title: <p>Category</p>,
      dataIndex: "category",
      width: 150,
      align: "center",
    },
    {
      title: <p>Country</p>,
      dataIndex: "country",
      width: 100,
      align: "center",
    },
    {
      title: <p>City</p>,
      dataIndex: "city",
      width: 150,
      align: "center",
    },
    {
      title: <p>CreatedAt</p>,
      dataIndex: "createdAt",
      width: 200, // Set the width here
      align: "center",
      render: function (data) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: <p>Action</p>,
      width: 150, // Set the width here
      align: "center",
      render: function (data) {
        return (
          <>
            <Button
              style={{
                margin: "0px 5px",
              }}
              onClick={() => handelCategoryUpdate(data)}
              type="primary"
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => openModalHandelar(data)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page, pageSize) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination, filter, sorter) => {
    const { order, field } = sorter;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  // const resetFilters = () => {
  //   setSortBy("");
  //   setSortOrder("");
  //   setSearchTerm("");
  // };

  const breadCrumbItems = [
    {
      label: <Link href={"/admin"}>Admin</Link>,
      link: "/admin",
    },
    {
      label: "Manage Attractions",
      link: "/admin/manage-attractions",
    },
  ];
  return (
    <>
      <Head>
        <title>Travel Point | Manage Attractions</title>
      </Head>
      <main>
        {contextHolder}
        <section>
          <AdminBreadCrumb items={breadCrumbItems} />

          <div className="max-w-7xl mx-auto my-4">
            <div className="mt-10">
              <Row gutter={10}>
                <Col span={6}>
                  <Input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="p-2"
                  />
                </Col>

                <Col span={5}>
                  <Select
                    loading={categoryLoading}
                    onChange={(e) => setCategoryId(e)}
                    size={"large"}
                    options={[
                      {
                        label: "All",
                        value: "",
                      },
                      ...categoryOptions,
                    ]}
                    style={{ width: "100%", height: "100%" }}
                    placeholder={"Search by Category"}
                  />
                </Col>

                <Col span={5}>
                  <Select
                    loading={countryLoading}
                    onChange={(e) => setCountryId(e)}
                    size={"large"}
                    options={[
                      {
                        label: "All",
                        value: "",
                      },
                      ...countryOptions,
                    ]}
                    // value={countryId}
                    style={{ width: "100%", height: "100%" }}
                    placeholder={"Search by Country"}
                  />
                </Col>

                <Col span={5}>
                  <Select
                    loading={cityLoading}
                    onChange={(e) => setCityId(e)}
                    size={"large"}
                    options={[
                      {
                        label: "All",
                        value: "",
                      },
                      ...cityOptions,
                    ]}
                    // value={countryId}
                    style={{ width: "100%", height: "100%" }}
                    placeholder={"Search by City"}
                  />
                </Col>

                <Col span={3}>
                  <Link href={"/admin/manage-attractions/create-attraction"}>
                    <Button className="w-full h-full  " type="primary">
                      Create Attraction +
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>

            <div className="my-10">
              <DisplayTable
                loading={isLoading}
                columns={columns}
                dataSource={attractionsData}
                pageSize={size}
                totalPages={meta?.total}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                onTableChange={onTableChange}
                showPagination={true}
              />
            </div>
          </div>
        </section>

        <CategoryDrawer
          open={isEditable}
          setOpen={setIsEditable}
          valueObj={categoryInfo}
          valueFn={setCategoryInfo}
        />
        <ConfirmModal
          submitFn={itemDeleteHandelar}
          setOpen={setOpen}
          open={open}
          loading={deleteLoading}
          modalText={modalText}
        />
      </main>
    </>
  );
};

export default ManageAttractions;
