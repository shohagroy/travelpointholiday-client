import { Button, Card, Drawer, Flex, Image } from "antd";
import React from "react";
import {
  CloseOutlined,
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const CartDrawer = ({ open, setOpen }) => {
  return (
    <Drawer
      className="bg-[#003B95]"
      title={
        <Flex justify="space-between" align="center">
          <p className="text-2xl text-white">
            <ShoppingCartOutlined /> Attractions Cart
          </p>

          <Button
            onClick={() => setOpen(!open)}
            type="primary"
            danger
            size="large"
          >
            <CloseOutlined />
          </Button>
        </Flex>
      }
      footer={
        <Card
          title={
            <Flex justify="space-around" className="font-bold text-2xl">
              <p>Subtotal:</p>
              <p>$1232</p>
            </Flex>
          }
        >
          <Link href={"/my-carts"}>
            <Button className="w-full" type="primary">
              View Cart
            </Button>
          </Link>
        </Card>
      }
      placement="right"
      closable={false}
      width={"500px"}
      onClose={() => setOpen(false)}
      open={open}
      getContainer={false}
    >
      <div className="w-full h-full relative overflow-auto bg-gray-200 rounded-md p-2 text-black">
        {[...Array(12)].map((items, i) => (
          <Card
            key={i}
            title={<p>Burj Khalifa Admission Tickets: Floors 124 and 125</p>}
            className="shadow-md mt-2 "
          >
            <Flex justify="space-between" align="center">
              <Image
                preview={false}
                className="h-[100px] w-[200px]"
                src={
                  "https://res.cloudinary.com/djx9awdb7/image/upload/v1688480287/harri-shop/fl33xnsmypwdyvecsysy.webp"
                }
                alt="image"
              />

              <div className="ml-3">
                <p className="text-xl font-semibold">Ticket Price: {344}</p>
                <p className="text-lg font-semibold">Total ${2334}</p>

                <Flex
                  className="bg-gray-200 rounded-md"
                  justify="space-between"
                  align="center"
                >
                  <Button
                    //   disabled={cartItem?.quantity === 1}
                    //   onClick={() => decQuentaty(cartItem)}
                    className=" text-lg "
                    size="large"
                    type="primary"
                    danger
                    icon={<MinusOutlined />}
                  ></Button>

                  <div className="m-0">
                    <p className=" px-3 py-1 my-0 mx-auto ">{12}</p>
                  </div>

                  <div className="m-0">
                    <Button
                      //   onClick={() => incQuentaty(cartItem)}
                      className="text-lg "
                      size="large"
                      type="primary"
                      icon={<PlusOutlined />}
                    ></Button>
                  </div>
                </Flex>
              </div>
            </Flex>
            <div>
              <Button
                type="primary"
                danger
                className="w-full mt-2"
                icon={<CloseOutlined />}
              >
                Remove from Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Drawer>
  );
};

export default CartDrawer;