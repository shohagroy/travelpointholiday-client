"use client";

import DisplayTable from "@/components/table/DisplayTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import {
  useCancelAndRefundMutation,
  useGetAllBookingListQuery,
} from "@/redux/features/booking/bookingApi";
import { Button, Image, message } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import dayjs from "dayjs";
import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";

const BookingListPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const query = { booked: "booked" };

  query["page"] = page;
  query["size"] = size;
  query["size"] = size;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const [open, setOpen] = useState(false);

  const [attractionInfo, setAttractionInfo] = useState({});
  const [modalText, setModalText] = useState({});

  const { data, isLoading } = useGetAllBookingListQuery({ ...query });

  const [candAndRefund, { isLoading: refundConfirmLoading }] =
    useCancelAndRefundMutation();

  const attractionsData =
    data?.data?.data?.map((item) => {
      return {
        key: item?.id,
        banar: (
          <Image alt="banar" src={item.attraction?.images[0]?.secure_url} />
        ),
        tittle: (
          <Link href={`/attractions/${item?.attraction?.id}`}>
            {item?.attraction?.tittle}
          </Link>
        ),
        total_ticket: item?.totalTicket,
        user: item?.userInfo?.name,
        return: item?.payment,
        createdAt: item?.createdAt,
        status: item?.status,
        totalTicket: item?.totalTicket,
      };
    }) || [];
  const meta = data?.meta || {};

  const refundSubmitHandelar = async () => {
    const refundData = {
      id: attractionInfo?.key,
      totalTicket: attractionInfo?.totalTicket,
    };

    const result = await candAndRefund(refundData).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Booking cancel and Refund Successfully!",
      });
      setOpen(false);
    }
  };

  const refundModalHandelar = (data) => {
    setAttractionInfo(data);
    setModalText({
      tittle: (
        <p className="">Are your sure Refund back this cancel Booking?</p>
      ),
      details: (
        <>
          <p className="text-red-600 font-bold">
            Total Ticket: {data?.total_ticket}
          </p>
          <p className="text-red-600 font-bold">
            Return Amount: ${data?.return}
          </p>
        </>
      ),
    });
    setOpen(true);
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
      title: <p>Total Ticket</p>,
      dataIndex: "total_ticket",
      width: 150,
      align: "center",
    },
    {
      title: <p>Return Price</p>,
      dataIndex: "return",
      width: 150,
      align: "center",
    },
    {
      title: <p>User Name</p>,
      dataIndex: "user",
      width: 200,
      align: "center",
    },
    {
      title: <p>CreatedAt</p>,
      dataIndex: "createdAt",
      width: 200,
      align: "center",
      render: function (data) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: <p>Action</p>,
      width: 150,
      align: "center",
      render: function (data) {
        return (
          <>
            <Button
              onClick={() => refundModalHandelar(data)}
              className="m-1"
              type="primary"
            >
              Refund Back
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

  const breadCrumbItems = [
    {
      label: <Link href={"/admin"}>Admin</Link>,
      link: "/admin",
    },
    {
      label: "Manage Attractions",
      link: "/admin/manage-attractions",
    },
    {
      label: "Booking List",
      link: "/admin/manage-attractions/booking-list",
    },
  ];

  return (
    <>
      <Head>
        <title>Travel Point | Attraction | Refund List</title>
      </Head>
      <main>
        {contextHolder}
        <AdminBreadCrumb items={breadCrumbItems} />
        <section>
          <div className="max-w-7xl mx-auto my-4">
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

        <ConfirmModal
          submitFn={refundSubmitHandelar}
          setOpen={setOpen}
          open={open}
          loading={refundConfirmLoading}
          modalText={modalText}
        />
      </main>
    </>
  );
};

export default BookingListPage;
