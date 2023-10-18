"use client";

import BreadcrumbBanar from "@/components/ui/BreadcrumbBanar";
import { Button, Alert, Table, Card, Flex, message, Image, Input } from "antd";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

import DisplayTable from "@/components/table/DisplayTable";
import {
  useAddToCartMutation,
  useDecrementCartItemsMutation,
  useGetUserCartsQuery,
  useRemoveToCartMutation,
} from "@/redux/features/cart/cartApi";

const CartPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // const { data } = useSelector((state) => state.cartData);

  const { data: cartData, isLoading } = useGetUserCartsQuery();

  const [addToCart, { incrementLoading }] = useAddToCartMutation();

  const [decrementCartItems, { decrementLoading }] =
    useDecrementCartItemsMutation();

  const [removeToCart, { removeLoading }] = useRemoveToCartMutation();

  const addToCartHandelar = async (data) => {
    const result = await addToCart(data).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Cart Item Increment successfully!",
      });
    }
  };

  const removeToCartHandelar = async (data) => {
    const result = await removeToCart(data).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Cart Remove successfully!",
      });
    }
  };

  const decrementCartItemsQuantity = async (data) => {
    const result = await decrementCartItems(data).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Cart Item Decrement successfully!",
      });
    }
  };

  const cartList = cartData?.data?.map((item) => {
    return {
      key: item?.id,
      banar: item?.image,
      title: item?.tittle,
      price: `$${item?.price}`,
      ticket: item?.totalTicket,
      total: `$${item?.price * item?.totalTicket}`,
      incDec: item,
    };
  });

  const columns = [
    {
      title: <p>Banar</p>,
      dataIndex: "banar",
      width: 150,
      align: "center",
      render: function (data) {
        return <Image src={data} alt="banar" />;
      },
    },
    {
      title: <p>Title</p>,
      dataIndex: "title",
      width: 250,
      align: "center",
    },
    {
      title: <p>Price</p>,
      dataIndex: "price",
      width: 100,
      align: "center",
    },
    {
      title: <p>Ticket</p>,
      dataIndex: "ticket",
      width: 100,
      align: "center",
    },
    {
      title: <p>Total Price</p>,
      dataIndex: "total",
      width: 100,
      align: "center",
    },
    {
      title: <p>Inc/Dec</p>,
      dataIndex: "incDec",
      width: 200,
      align: "center",
      render: function (data) {
        return (
          <div
            className="p-1 w-full"
            style={{
              border: "1px solid #003A94",
              borderRadius: "10px",
            }}
          >
            <Flex>
              <Button
                onClick={() => decrementCartItemsQuantity(data)}
                loading={decrementLoading}
                type="link"
                // icon={}
              >
                <MinusOutlined />
              </Button>

              <Input value={data?.totalTicket} className="text-center" />

              <Button
                loading={incrementLoading}
                onClick={() => addToCartHandelar(data)}
                type="link"
                // icon={}
              >
                <PlusOutlined />
              </Button>
            </Flex>
          </div>
        );
      },
    },
    {
      title: <p>Action</p>,
      width: 200,
      align: "center",
      render: function (data) {
        return (
          <>
            <Button
              loading={removeLoading}
              className="mx-1"
              onClick={() => removeToCartHandelar({ ...data, id: data?.key })}
              type="primary"
              danger
              icon={<DeleteOutlined />}
            >
              Remove
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Head>
        <title>Travel Point | My Carts</title>
      </Head>

      <main>
        {contextHolder}
        <BreadcrumbBanar
          name={"My Carts"}
          tittle={"My Carts"}
          breadItems={[{ title: "My Carts" }]}
        />
        <section>
          <div className="max-w-7xl mx-auto">
            <div className="my-10 w-full bg-gray-200 p-2">
              <Link href={"/"}>
                <Button
                  className=" font-bold"
                  type="link"
                  icon={<RollbackOutlined />}
                >
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="my-10">
              <DisplayTable
                loading={isLoading}
                columns={columns}
                dataSource={cartList}
                // pageSize={size}
                // totalPages={meta?.total}
                // showSizeChanger={true}
                // onPaginationChange={onPaginationChange}
                // onTableChange={onTableChange}
                // showPagination={true}
              />
            </div>

            <div>
              <Card title="Carts Total">
                <Flex justify="space-between">
                  <div>
                    <p>Subtotal:</p>
                  </div>
                  <div>{1200}</div>
                </Flex>
                <Flex justify="space-between">
                  <div>
                    <p>Discount:</p>
                  </div>
                  <div>{1200}</div>
                </Flex>
                <Flex justify="space-between">
                  <div>
                    <p>Total:</p>
                  </div>
                  <div>{1200}</div>
                </Flex>

                <Button className="w-full" type="primary">
                  Proceed to checkout
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CartPage;
