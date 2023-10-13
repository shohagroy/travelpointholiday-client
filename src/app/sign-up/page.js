"use client";

import React from "react";
import { Button, Col, Divider, Form, Row, Space } from "antd";
import Head from "next/head";
import FormInput from "@/components/form/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Header from "@/shared/header/Header";
import Link from "next/link";

const SignUpPage = () => {
  const methods = useForm();

  const onSubmit = async (data) => {
    // Handle form submission here
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
              minHeight: "60vh",
            }}
          >
            <Col sm={12} md={16} lg={10}>
              <Image src={loginImage} width={500} alt="login image" />
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
                <FormProvider {...methods}>
                  <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div>
                      <FormInput
                        name="id"
                        type="text"
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
                        name="password"
                        type="password"
                        size="large"
                        label="Confirm Password"
                        required
                      />
                    </div>
                    <Button type="primary" htmlType="submit">
                      Sign up
                    </Button>
                  </Form>
                </FormProvider>
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
