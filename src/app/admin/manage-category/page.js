"use client";

import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";
import DisplayTable from "@/components/table/DisplayTable";
import { Button, Col, Input, Modal, Row, message } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryDrawer from "@/components/ui/CategoryDrawer";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/category/categoryApi";
import dayjs from "dayjs";
import { useDebounced } from "@/redux/hooks/useDebounced";
import ConfirmModal from "@/components/ui/ConfirmModal";

const ManageCategoryPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isEditable, setIsEditable] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({});
  const [modalText, setModalText] = useState({});

  console.log(categoryInfo);

  const query = {};
  query["size"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["search"] = debouncedTerm;
  }

  const { data, isLoading } = useGetAllCategoriesQuery({ ...query });
  const categoriesData = data?.data.map((item, i) => {
    return {
      key: item?.id,
      sl: page * size - size + i + 1,
      name: item?.name,
      createdAt: item?.createdAt,
    };
  });
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
      title: <p>CreatedAt</p>,
      dataIndex: "createdAt",
      width: 250, // Set the width here
      align: "center",
      render: function (data) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: <p>Action</p>,
      width: 100, // Set the width here
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
      label: "Manage Category",
      link: "/admin/manage-category",
    },
  ];
  return (
    <>
      <Head>
        <title>Travel Point | Manage Category</title>
      </Head>
      <main>
        {contextHolder}
        <section>
          <AdminBreadCrumb items={breadCrumbItems} />

          <div className="max-w-7xl mx-auto my-4">
            <div className="mt-10">
              <Row gutter={16}>
                <Col span={16}>
                  <Input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="p-3 text-xl"
                  />
                </Col>
                <Col span={8}>
                  <Button
                    onClick={() => setIsEditable(true)}
                    className="w-full h-full text-xl "
                    type="primary"
                  >
                    Add New Category +
                  </Button>
                </Col>
              </Row>
            </div>

            <div className="my-10">
              <DisplayTable
                loading={isLoading}
                columns={columns}
                dataSource={categoriesData}
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

export default ManageCategoryPage;
