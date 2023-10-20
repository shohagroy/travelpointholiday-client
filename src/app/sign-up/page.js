"use client";

import React from "react";
import { Button, Col, Divider, Row, message } from "antd";
import Head from "next/head";
import FormInput from "@/components/forms/FormInput";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Header from "@/shared/header/Header";
import Link from "next/link";
import { GoogleOutlined } from "@ant-design/icons";
import Form from "@/components/forms/From";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "@/schemas/login";
import {
  useCreateUserMutation,
  useGetCallBackUrlQuery,
} from "@/redux/features/user/userApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import InitialLoading from "@/components/loader/InitialLoading";

const SignUpPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const { data: callBackUrl, isLoading: initialLoading } =
    useGetCallBackUrlQuery();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (data) => {
    const { email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return messageApi.open({
        type: "error",
        content: "Password does not match!",
      });
    }
    const result = await createUser({ email, password }).unwrap();

    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }

    if (result?.data?.accessToken) {
      messageApi.open({
        type: "success",
        content: "User created Successfully!",
      });
      storeUserInfo({ accessToken: result?.data?.accessToken });
      router.push(router.query?.callbackUrl || "/");
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <InitialLoading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Travel Point | Login</title>
      </Head>

      <main>
        {contextHolder}
        <Header />
        <section className="max-w-7xl mx-auto">
          <Row
            justify="center"
            align="middle"
            style={{
              minHeight: "70vh",
            }}
          >
            <Col sm={12} md={16} lg={10}>
              <Image
                src={loginImage}
                width={500}
                height={500}
                layout="responsive"
                alt="login image"
              />
            </Col>
            <Col sm={12} md={8} lg={8}>
              <h2>Wellcome to Travel Point!</h2>
              <p>
                Already have an Account?
                <Link href={"/login"}>
                  <Button type="link">Login</Button>
                </Link>
              </p>

              <div>
                <Form
                  submitHandler={onSubmit}
                  resolver={yupResolver(SignupSchema)}
                >
                  <div>
                    <FormInput
                      name="email"
                      type="email"
                      size="large"
                      label="Email"
                      required
                    />
                  </div>
                  <div
                    style={{
                      margin: "15px 0px",
                    }}
                  >
                    <FormInput
                      name="password"
                      type="password"
                      size="large"
                      label="Password"
                      required
                    />
                  </div>

                  <div
                    style={{
                      margin: "15px 0px",
                    }}
                  >
                    <FormInput
                      name="confirmPassword"
                      type="password"
                      size="large"
                      label="Confirm Password"
                      required
                    />
                  </div>
                  <Button
                    className="w-full"
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                  >
                    {isLoading ? "Loading..." : "Sign Up"}
                  </Button>
                </Form>
              </div>

              <div>
                <Divider>
                  <small>or use one of these options</small>
                </Divider>
                <Button
                  type="primary"
                  danger
                  icon={<GoogleOutlined />}
                  className="w-full"
                >
                  <a href={callBackUrl?.data}>Continue with Google</a>
                </Button>
              </div>
            </Col>
          </Row>

          <Divider />

          <div className="text-center">
            <p>
              <small>
                By signing in or creating an account, you agree with our{" "}
                <span className="text-blue-600">Terms & Conditions</span> and
                <span className="text-blue-600"> Privacy Statement</span>
              </small>
            </p>
          </div>
          <Divider />

          <div className="text-center">
            <p>
              <small>All rights reserved.</small>
            </p>
            <p>
              <small>
                Copyright (2006-2023) – travelpointholidat.vercel.com™
              </small>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default SignUpPage;
