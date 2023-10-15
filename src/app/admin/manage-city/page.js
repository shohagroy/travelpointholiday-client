"use client";

import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";
import DisplayTable from "@/components/table/DisplayTable";
import { Button, Col, Input, Row, Select, message } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import { useDebounced } from "@/redux/hooks/useDebounced";
import ConfirmModal from "@/components/ui/ConfirmModal";
import {
  useDeleteCityMutation,
  useGetAllCitiesQuery,
} from "@/redux/features/city/cityAPi";
import CityDrawer from "@/components/drawer/CityDrawer";
import { useGetAllCountryDataQuery } from "@/redux/features/country/countryApi";
const ManageCityPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isEditable, setIsEditable] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [countryId, setCountryId] = useState("");

  const [open, setOpen] = useState(false);
  const [cityInfo, setCityInfo] = useState({});
  const [modalText, setModalText] = useState({});

  const query = {};
  query["size"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  if (countryId) {
    query["countryId"] = countryId;
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
  const { data, isLoading } = useGetAllCitiesQuery({ ...query });
  const citiesData = data?.data.map((item, i) => {
    return {
      key: item?.id,
      sl: page * size - size + i + 1,
      name: item?.name,
      country: item?.country?.name,
      createdAt: item?.createdAt,
    };
  });
  const meta = data?.meta || {};

  const [deleteCity, { isLoading: deleteLoading }] = useDeleteCityMutation();

  const itemDeleteHandelar = async () => {
    const result = await deleteCity(cityInfo?.key).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "City Delete Successfully!",
      });
      setOpen(false);
    }
  };

  const openModalHandelar = (data) => {
    setCityInfo(data);
    setModalText({
      tittle: "Are your sure Delete this City?",
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

  const handelCityUpdate = (data) => {
    setCityInfo(data);
    setIsEditable(true);
  };

  const columns = [
    {
      title: <p>SL No</p>,
      width: 100,
      align: "center",
      dataIndex: "sl",
    },
    {
      title: <p>Name</p>,
      dataIndex: "name",
      width: 300,
      align: "center",
    },
    {
      title: <p>Country</p>,
      dataIndex: "country",
      width: 300,
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
              onClick={() => handelCityUpdate(data)}
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

  const countryOptions = countries?.data?.map((item) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });

  const breadCrumbItems = [
    {
      label: <Link href={"/admin"}>Admin</Link>,
      link: "/admin",
    },
    {
      label: "Manage City",
      link: "/admin/manage-city",
    },
  ];

  return (
    <>
      <Head>
        <title>Travel Point | Manage City</title>
      </Head>
      <main>
        {contextHolder}
        <section>
          <AdminBreadCrumb items={breadCrumbItems} />

          <div className="max-w-7xl mx-auto my-4">
            <div className="mt-10">
              <Row gutter={16}>
                <Col span={12}>
                  <Input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="p-3 text-xl"
                  />
                </Col>

                <Col span={6}>
                  <Select
                    loading={countryLoading}
                    onChange={(e) => setCountryId(e)}
                    size={"large"}
                    options={countryOptions}
                    // value={countryId}
                    style={{ width: "100%", height: "100%" }}
                    placeholder={"Select Country..."}
                  />
                </Col>
                <Col span={6}>
                  <Button
                    onClick={() => setIsEditable(true)}
                    className="w-full h-full text-xl "
                    type="primary"
                  >
                    Add New City +
                  </Button>
                </Col>
              </Row>
            </div>

            <div className="my-10">
              <DisplayTable
                loading={isLoading}
                columns={columns}
                dataSource={citiesData}
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

        <CityDrawer
          open={isEditable}
          setOpen={setIsEditable}
          valueObj={cityInfo}
          valueFn={setCityInfo}
          options={countryOptions}
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

export default ManageCityPage;
