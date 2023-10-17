"use client";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import Form from "@/components/forms/From";
import { useGetAttractionQuery } from "@/redux/features/attraction/attractionApi";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
import { profileSchema } from "@/schemas/profile";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Flex, Row, message } from "antd";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Checkout = ({ searchParams }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { attraction, ticketCount } = searchParams || {};
  const router = useRouter();

  const { data: attractionData, isLoading: attractionLoading } =
    useGetAttractionQuery(attraction);

  const [createBooking, { isLoading: bookingLoading }] =
    useCreateBookingMutation();

  const { data: profileData, isLoading: profileLoading } =
    useGetUserProfileQuery();

  const { id, tittle, images, city, price } = attractionData?.data || {};

  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  const onSubmit = async (data) => {
    const checkoutData = {
      userId: data?.id,
      attractionId: id,
      totalTicket: ticketCount,
    };

    console.log(checkoutData);

    const result = await createBooking(checkoutData).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Attraction Booking Successfully!",
      });
      router.push("/trip-management");
    }
  };

  return (
    <>
      <Head>
        <title>Travel Point | Attraction | Checkout</title>
      </Head>
      <main>
        {contextHolder}
        <section className="max-w-7xl mx-auto my-10">
          <Row gutter={16}>
            <Col span={12}>
              <div className="">
                <Card
                  title={
                    <div>
                      <small>{city?.name}</small>
                      <h2>Attractions Summary</h2>
                    </div>
                  }
                >
                  <div>
                    <Flex>
                      <div className="w-full h-[200px]">
                        {/* <Image
                          src={images[0]?.secure_url}
                          alt="image"
                          height={100}
                          width={100}
                          layout="responsive"
                          className="w-full h-full object-cover"
                        /> */}
                      </div>
                    </Flex>
                    <p className="font-semibold my-1">{tittle}</p>
                  </div>
                  <Flex justify="space-between">
                    <p>Total Ticket:</p>
                    <p className="font-bold">{ticketCount}</p>
                  </Flex>
                  <Flex justify="space-between">
                    <p>Ticket Price:</p>
                    <p className="font-bold">{price}</p>
                  </Flex>
                  <Flex justify="space-between">
                    <p>Discount:</p>
                    <p className="font-bold text-red-600">0%</p>
                  </Flex>

                  <div className="mt-5 font-bold">
                    <Flex justify="space-between">
                      <p>Total Cost:</p>
                      <p className="">0%</p>
                    </Flex>
                  </div>
                </Card>
              </div>
            </Col>

            <Col span={12}>
              <div className="">
                <Card
                  title={
                    <div>
                      <h2>Personal Details</h2>
                    </div>
                  }
                >
                  <div>
                    <Form
                      submitHandler={onSubmit}
                      resolver={yupResolver(profileSchema)}
                      defaultValues={profileData?.data}
                    >
                      <FormInput
                        disabled
                        label={"Full Name"}
                        name={"name"}
                        required
                        type={"text"}
                        size="large"
                      />
                      <div className="mt-2">
                        <FormInput
                          disabled
                          label={"Email"}
                          type="email"
                          name={"email"}
                          size="large"
                          required
                        />
                      </div>

                      <Row gutter={16} className="mt-2">
                        <Col span={12}>
                          <FormInput
                            disabled
                            name={"contact"}
                            label={"Contact Number"}
                            size="large"
                            type="text"
                            required
                          />
                        </Col>

                        <Col span={12}>
                          <FormSelectField
                            name={"gender"}
                            label={"Gender"}
                            options={genderOptions}
                            size="large"
                            required
                          />
                        </Col>
                      </Row>

                      <div className="mt-2">
                        <FormInput
                          disabled
                          label={"Address"}
                          name={"address"}
                          size="large"
                          type="text"
                          required
                        />
                      </div>

                      <div className="mt-10">
                        <Button
                          loading={bookingLoading}
                          htmlType="submit"
                          className="w-full "
                          type="primary"
                          danger
                        >
                          {bookingLoading ? "Loading..." : "Checkout"}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </section>
      </main>
    </>
  );
};

export default Checkout;
