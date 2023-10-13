"use client";

import BreadcrumbBanar from "@/components/ui/BreadcrumbBanar";
import { Button, Alert, Table, Card, Flex } from "antd";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { RollbackOutlined } from "@ant-design/icons";

const cartData = [
  {
    id: 1,
    images: "image-url-1",
    title: "Product 1",
    price: 100,
    quantity: 2,
    productId: 1,
    discount: 10,
  },
  {
    id: 2,
    images: "image-url-2",
    title: "Product 2",
    price: 50,
    quantity: 1,
    productId: 2,
    discount: 5,
  },
  // Add more dummy cart items here
];

const CartPage = () => {
  const incQuentaty = (product) => {
    // Implement the logic to increase quantity
  };

  const decQuentaty = (product) => {
    // Implement the logic to decrease quantity
  };

  const handelRemoveCartList = (product) => {
    // Implement the logic to remove a product from the cart
  };

  const tableColumns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
    },
  ];

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
    },
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <Link href={`/${record.productId}`}>{text}</Link>
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text, record) => (
        <div className="flex justify-center items-start">
          {/* Quantity buttons go here */}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <button
          onClick={() => handelRemoveCartList(record)}
          className="text-red-600"
        >
          {/* <BiTrash size={30} /> */}
        </button>
      ),
    },
  ];

  const subtotal = cartData.reduce(
    (acc, product) =>
      acc +
      (product.price - (product.price * product.discount) / 100) *
        product.quantity,
    0
  );
  return (
    <>
      <Head>
        <title>Travel Point | My Carts</title>
      </Head>

      <main>
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
                  Continue Shopping
                </Button>
              </Link>
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
