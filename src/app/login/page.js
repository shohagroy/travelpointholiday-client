"use client";

import React from "react";
import { Button, Col, Divider, Row } from "antd";
import Head from "next/head";
import FormInput from "@/components/forms/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Header from "@/shared/header/Header";
import Link from "next/link";
import {
  GithubOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import Form from "@/components/forms/From";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login";

const LoginPage = () => {
  // const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   const res = await userLogin({ ...data }).unwrap();
    //   // console.log(res);
    //   if (res?.accessToken) {
    //     router.push("/profile");
    //     message.success("User logged in successfully!");
    //   }
    //   storeUserInfo({ accessToken: res?.accessToken });
    //   // console.log(res);
    // } catch (err) {
    //   console.error(err.message);
    // }
  };
  return (
    <>
      <Head>
        <title>Travel Point | Login</title>
      </Head>

      <main>
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
              <Image src={loginImage} width={500} alt="login image" />
            </Col>
            <Col sm={12} md={8} lg={8}>
              <h2>Wellcome back!</h2>
              <p>
                New to Travel Point?
                <Link href={"/sign-up"}>
                  <Button type="link">Sign Up</Button>
                </Link>
              </p>

              <div>
                <Form
                  submitHandler={onSubmit}
                  resolver={yupResolver(loginSchema)}
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
                  <Button className="w-full" type="primary" htmlType="submit">
                    Login
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
                  Continue with Google
                </Button>
                <Button
                  type="primary"
                  icon={<FacebookOutlined />}
                  className="w-full mt-2"
                >
                  Continue with Facebook
                </Button>
                <Button
                  type="primary"
                  icon={<GithubOutlined />}
                  className="w-full mt-2 bg-gray-800"
                >
                  Continue with Github
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

export default LoginPage;
