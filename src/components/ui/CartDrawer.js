import { Button, Card, Drawer, Flex, Image, Input, message } from "antd";
import React from "react";
import {
  CloseOutlined,
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
  useAddToCartMutation,
  useDecrementCartItemsMutation,
  useRemoveToCartMutation,
} from "@/redux/features/cart/cartApi";

const CartDrawer = ({ open, setOpen, data }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const total = data?.reduce((acc, item) => {
    return acc + item.price * item.totalTicket;
  }, 0);

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
              <p>${total}</p>
            </Flex>
          }
        >
          <Link href={"/my-carts"}>
            <Button
              onClick={() => setOpen(false)}
              className="w-full"
              type="primary"
            >
              View Cart
            </Button>
          </Link>
        </Card>
      }
      placement="right"
      closable={false}
      width={450}
      onClose={() => setOpen(false)}
      open={open}
      getContainer={false}
    >
      {contextHolder}
      <div className="w-full h-full relative overflow-auto bg-gray-200 rounded-md p-2 text-black">
        {data?.map((item, i) => (
          <Card
            key={i}
            title={
              <div>
                <p>{item?.tittle}</p>
                <Flex justify="space-between" align="center" className="mt-2">
                  <p>
                    Price: <span className="font-bold">${item?.price}</span>
                  </p>
                  <p>
                    Total:{" "}
                    <span className="font-bold">
                      ${item?.price * item?.totalTicket}
                    </span>
                  </p>
                </Flex>
              </div>
            }
            className="shadow-md mt-2 "
          >
            <div className="w-full h-full">
              <Image
                className="rounded-md w-full"
                src={item?.image}
                alt="image"
              />
            </div>

            <div className="mt-2">
              <div
                className="p-1 w-full"
                style={{
                  border: "1px solid #003A94",
                  borderRadius: "10px",
                }}
              >
                <Flex>
                  <Button
                    onClick={() => decrementCartItemsQuantity(item)}
                    loading={decrementLoading}
                    type="link"
                    // icon={}
                  >
                    <MinusOutlined />
                  </Button>

                  <Input value={item?.totalTicket} className="text-center" />

                  <Button
                    loading={incrementLoading}
                    onClick={() => addToCartHandelar(item)}
                    type="link"
                    // icon={}
                  >
                    <PlusOutlined />
                  </Button>
                </Flex>
              </div>
              <Button
                onClick={() => removeToCartHandelar(item)}
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
