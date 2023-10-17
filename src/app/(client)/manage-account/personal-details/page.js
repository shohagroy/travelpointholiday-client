/* eslint-disable react/no-unescaped-entities */
"use client";

import { Avatar, Button, Card, Col, Flex, Row, message } from "antd";
import Head from "next/head";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import DetailsUpdateFilds from "@/components/ui/DetailsUpdateFilds";
import Form from "@/components/forms/From";
import FormInput from "@/components/forms/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordChangeSchema } from "@/schemas/login";
import {
  useChangeUserPasswordMutation,
  useGetUserProfileQuery,
} from "@/redux/features/user/userApi";
import InitialLoading from "@/components/loader/InitialLoading";
import AvatarUpdate from "@/components/ui/AvatarUpdate";

const PersonalDetailsPage = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const [messageApi, contextHolder] = message.useMessage();

  const [changeUserPassword, { isLoading: changeLoading }] =
    useChangeUserPasswordMutation();

  const { name, email, contact, gender, address, profileImg } =
    data?.data || {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <InitialLoading />
      </div>
    );
  }

  const changePasswordHandelar = async (data) => {
    const { oldPassword, newPassword, retypeNewPassword } = data;
    if (newPassword !== retypeNewPassword) {
      messageApi.open({
        type: "error",
        content: "Password does not match!",
      });
    }

    const result = await changeUserPassword({
      newPassword,
      oldPassword,
    }).unwrap();

    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }

    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Password Change Successfully!",
      });
    }
  };
  return (
    <>
      <Head>
        <title>Travel Point | Persomal Details</title>
      </Head>

      <main>
        {contextHolder}
        <section className="max-w-7xl mx-auto my-4">
          <Card
            title={
              <Flex justify="space-between" align="center">
                <div>
                  <h2 className="text-3xl py-2 font-bold">Personal Details</h2>
                  <p className="py-1">
                    Update your info and find out how it's used.
                  </p>
                </div>
                <div>
                  <AvatarUpdate avatar={profileImg} />
                </div>
              </Flex>
            }
          >
            <div>
              <DetailsUpdateFilds
                label={"Full Name"}
                name={"name"}
                value={name}
              />
              <DetailsUpdateFilds
                label={"Email address"}
                name={"email"}
                value={email}
              />

              <DetailsUpdateFilds
                label={"Contact"}
                name={"contact"}
                value={contact}
              />

              <DetailsUpdateFilds
                label={"Gender"}
                name={"gender"}
                value={gender}
              />
              <DetailsUpdateFilds
                label={"Address"}
                name={"address"}
                value={address}
              />
            </div>
          </Card>

          <Card
            className="my-10"
            title={
              <div>
                <h2>Change password</h2>
              </div>
            }
          >
            <div>
              <Form
                submitHandler={changePasswordHandelar}
                resolver={yupResolver(passwordChangeSchema)}
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <FormInput
                      name="oldPassword"
                      label="Old Password"
                      required
                      type="password"
                    />
                  </Col>
                  <Col span={8}>
                    <FormInput
                      name="newPassword"
                      label="Type New Password"
                      type="password"
                      required
                    />
                  </Col>
                  <Col span={8}>
                    <FormInput
                      name="retypeNewPassword"
                      label="Retype New Password"
                      type="password"
                      required
                    />
                  </Col>
                  <Col span={24}>
                    <Button
                      loading={changeLoading}
                      htmlType="submit"
                      className="mt-2 text-center"
                      type="primary"
                    >
                      {changeLoading ? "Loading..." : "Change Password"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
};

export default PersonalDetailsPage;
