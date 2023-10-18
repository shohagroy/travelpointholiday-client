"use client";

import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";
import DisplayTable from "@/components/table/DisplayTable";
import { Avatar, Button, Input, message } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useDebounced } from "@/redux/hooks/useDebounced";
import ConfirmModal from "@/components/ui/ConfirmModal";

import {
  useChangeUserRoleMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "@/redux/features/user/userApi";
import { loginUser } from "@/utils/LoginUser";

const ManageUserPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [modalText, setModalText] = useState({});

  const query = { role: "admin" };
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

  const { data, isLoading } = useGetAllUserQuery({ ...query });

  const userData = data?.data?.data.map((item, i) => {
    return {
      key: item?.id,
      sl: page * size - size + i + 1,
      name: item?.name,
      avatar: (
        <Avatar
          src={item?.profileImg?.secure_url}
          size="large"
          icon={<UserOutlined />}
        />
      ),
      email: item?.email,
      role: item,
      createdAt: item?.createdAt,
    };
  });

  const meta = data?.data?.meta || {};

  const [changeUserRole, { isLoading: userRoleLoading }] =
    useChangeUserRoleMutation();

  const [deleteUser, { isLoading: userDeleteLoading }] =
    useDeleteUserMutation();

  const removeAdminHandelar = async () => {
    const data = {
      id: userInfo?.key,
      role: "admin",
    };
    const result = await changeUserRole(data).unwrap();

    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Remove Admin Successfully!",
      });
      setOpen(false);
    }
  };

  const userDeleteHandelar = async () => {
    const data = {
      email: userInfo?.email,
    };
    const result = await deleteUser(data).unwrap();

    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "User Delete Successfully!",
      });
      setOpen(false);
    }
  };

  const openModalHandelar = (data) => {
    setUserInfo(data);

    setModalText({
      tittle: data?.create
        ? "Are you sure Remove admin this user?"
        : "Are your sure Delete this user?",
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

  const columns = [
    {
      title: <p>SL No</p>,
      width: 50,
      align: "center",
      dataIndex: "sl",
    },
    {
      title: <p>Avatar</p>,
      dataIndex: "avatar",
      width: 80,
      align: "center",
    },
    {
      title: <p>Name</p>,
      dataIndex: "name",
      width: 150,
      align: "center",
    },
    {
      title: <p>Email</p>,
      dataIndex: "email",
      width: 200,
      align: "center",
    },
    {
      title: <p>CreatedAt</p>,
      dataIndex: "createdAt",
      width: 150, // Set the width here
      align: "center",
      render: function (data) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: <p>Action</p>,
      width: 200, // Set the width here
      align: "center",
      render: function (data) {
        return (
          <>
            <Button
              disabled={loginUser().email === data?.email}
              className="mx-1"
              onClick={() => openModalHandelar({ ...data, create: true })}
              type="primary"
            >
              Remove Admin
            </Button>

            <Button
              disabled={loginUser().email === data?.email}
              className="mx-1"
              onClick={() => openModalHandelar({ ...data, delete: true })}
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
      label: "Manage Users",
      link: "/admin/manage-users",
    },
  ];
  return (
    <>
      <Head>
        <title>Travel Point | Manage Users</title>
      </Head>
      <main>
        {contextHolder}
        <section>
          <AdminBreadCrumb items={breadCrumbItems} />

          <div className="max-w-7xl mx-auto my-4">
            <div className="mt-10">
              <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="p-3 text-xl w-full"
              />
            </div>

            <div className="my-10">
              <DisplayTable
                loading={isLoading}
                columns={columns}
                dataSource={userData}
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

        <ConfirmModal
          submitFn={userInfo.create ? removeAdminHandelar : userDeleteHandelar}
          setOpen={setOpen}
          open={open}
          loading={userRoleLoading || userDeleteLoading}
          modalText={modalText}
        />
      </main>
    </>
  );
};

export default ManageUserPage;
