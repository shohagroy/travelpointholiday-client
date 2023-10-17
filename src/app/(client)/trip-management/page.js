"use client";

import React, { useState } from "react";

import ConfirmModal from "@/components/ui/ConfirmModal";
import DisplayTable from "@/components/table/DisplayTable";
import { Button, Image, message } from "antd";
import Link from "next/link";
import Head from "next/head";
import BreadcrumbBanar from "@/components/ui/BreadcrumbBanar";
import dayjs from "dayjs";
import {
  useCancelBookingMutation,
  useGetUserBookingListQuery,
} from "@/redux/features/booking/bookingApi";

const TripManagePage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const query = {};

  query["page"] = page;
  query["size"] = size;
  query["size"] = size;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  const { data, isLoading } = useGetUserBookingListQuery({ ...query });

  const [open, setOpen] = useState(false);
  const [attractionInfo, setAttractionInfo] = useState({});
  const [modalText, setModalText] = useState({});

  const [cancelBooking, { isLoading: cancelLoading }] =
    useCancelBookingMutation();

  const attractionsData =
    data?.data.map((item) => {
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
        ticket_price: item?.payment / item?.totalTicket,
        total_payment: item?.payment,
        createdAt: item?.createdAt,
        status: item?.status,
      };
    }) || [];
  const meta = data?.meta || {};

  const attractionCancelHandelar = async () => {
    const cancelData = {
      id: attractionInfo?.key,
      totalTicket: attractionInfo?.total_ticket,
    };

    const result = await cancelBooking(cancelData).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Attraction Cancel Successfully!",
      });
      setOpen(false);
    }
  };

  const openModalHandelar = (data) => {
    setAttractionInfo(data);
    setModalText({
      tittle: <p className="">Are your sure Cancel This Booking?</p>,
      details: (
        <div>
          <p>
            Refund amount add to your payment account after 4-5 working days.
          </p>
          <p className="text-red-600 font-bold">
            Total Ticket: {data?.total_ticket}
          </p>
          <p className="text-red-600 font-bold">
            Refund Amount: ${data?.total_payment}
          </p>
        </div>
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
      title: <p>Ticket Price</p>,
      dataIndex: "ticket_price",
      width: 150,
      align: "center",
    },
    {
      title: <p>Total Payment</p>,
      dataIndex: "total_payment",
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
            {data?.status === "cancel" ? (
              <Button type="default" disabled danger>
                Already Cancel
              </Button>
            ) : (
              <Button
                onClick={() => openModalHandelar(data)}
                type="primary"
                danger
              >
                Cancel
                {/* <DeleteOutlined /> */}
              </Button>
            )}
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

  return (
    <>
      <Head>
        <title>Travel Point | Manage Trip</title>
      </Head>
      <main>
        {contextHolder}
        <BreadcrumbBanar
          name={"Attractions"}
          tittle={"My Attractions"}
          breadItems={[{ title: "My Attractions" }]}
        />

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
          submitFn={attractionCancelHandelar}
          setOpen={setOpen}
          open={open}
          loading={cancelLoading}
          modalText={modalText}
        />
      </main>
    </>
  );
};

export default TripManagePage;
