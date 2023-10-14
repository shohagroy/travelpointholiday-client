"use client";
import BreadcrumbBanar from "@/components/ui/BreadcrumbBanar";
import Head from "next/head";
import React from "react";
import {
  Row,
  Col,
  Input,
  Form,
  Button,
  Card,
  message,
  Typography,
  Image,
} from "antd";
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import Subscribe from "@/components/Subscribe";

const { Text, Title } = Typography;

const ContactUs = () => {
  const breadItems = [{ title: "Contact us" }];

  const onFinish = (values) => {
    // Handle form submission here
    console.log("Form data:", values);
    message.success("Message sent successfully!");
  };

  return (
    <>
      <Head>
        <title>Travel Point | Contact Us</title>
      </Head>

      <main>
        <BreadcrumbBanar
          breadItems={breadItems}
          name={"Contact Us"}
          tittle={"Get In Touch"}
        />

        <section className="">
          <div className="mt-16 lg:mt-0">
            <div className="lg:py-20 py-10">
              <Row className="max-w-7xl mx-auto" gutter={16}>
                <Col span={24} lg={8}>
                  <Card className="border p-4 rounded-lg text-center">
                    <Image
                      preview={false}
                      src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontact-icon-1.b3ea7c8a.png&w=96&q=75"
                      alt=""
                    />
                    <Title level={3} className="mb-2 font-bold">
                      Contact
                    </Title>
                    <p className="mb-0 opacity-90 leading-7">
                      <a
                        className="text-2xl font-semibold"
                        href="mailto:shohagroy@yahoo.com"
                      >
                        shohagroy@yahoo.com
                      </a>
                      <br />
                      Enteractively grow empowered for process-centric total
                      linkage.
                    </p>
                  </Card>
                </Col>
                <Col span={24} lg={8}>
                  <Card className="border p-4 rounded-lg text-center">
                    {/* <Text type="success" className="text-4xl mb-4">
                        <PhoneOutlined />
                      </Text> */}
                    <Image
                      preview={false}
                      src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontact-icon-3.9effa1ee.png&w=64&q=75"
                      alt=""
                    />
                    <Title level={3} className="mb-2 font-bold">
                      Call Us
                    </Title>
                    <p className="mb-0 opacity-90 leading-7">
                      <a
                        className="text-2xl font-semibold"
                        href="tel:+8801760567555"
                      >
                        +880 1760 567 555
                      </a>{" "}
                      <br />
                      Distinctively disseminate focused solutions
                      clicks-and-mortar ministate.
                    </p>
                  </Card>
                </Col>
                <Col span={24} lg={8}>
                  <Card className="border p-4 rounded-lg text-center">
                    <Image
                      preview={false}
                      src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontact-icon-2.a19f544a.png&w=128&q=75"
                      alt=""
                    />
                    <Title level={3} className="mb-2 font-bold">
                      Social Media
                    </Title>
                    <p className="mb-0 opacity-90 leading-7">
                      Follow us on social media
                    </p>
                    <div className="flex justify-center items-center mt-2">
                      <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          type="link"
                          icon={<FacebookFilled />}
                          size="large"
                          className="text-5xl"
                        />
                      </a>
                      <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          type="link"
                          icon={<TwitterOutlined />}
                          size="large"
                          className="text-5xl"
                        />
                      </a>
                      <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          type="link"
                          icon={<LinkedinFilled />}
                          size="large"
                          className="text-5xl"
                        />
                      </a>
                      <a
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          type="link"
                          icon={<YoutubeFilled />}
                          size="large"
                          className="text-5xl"
                        />
                      </a>
                    </div>
                  </Card>
                </Col>
              </Row>

              <div className="my-10">
                <Subscribe />
              </div>

              <div className="">
                <Row gutter={16} className="pt-12  max-w-7xl mx-auto">
                  <Col xs={24} lg={12}>
                    <Image
                      preview={false}
                      src="https://kachabazar-store.vercel.app/_next/image?url=%2Fcontact-us.png&w=1080&q=75"
                      alt="Contact Us"
                      className="w-full h-full"
                    />
                  </Col>

                  <Col xs={24} lg={12}>
                    <Form name="contact-form" onFinish={onFinish}>
                      <div className="mb-12">
                        <Title
                          level={2}
                          className="font-semibold font-primary mb-3"
                        >
                          For any support, just send your query
                        </Title>
                        <Text>
                          Collaboratively promote client-focused convergence
                          vis-a-vis customer-directed alignments via plagiarized
                          strategic users and standardized infrastructures.
                        </Text>
                      </div>

                      <Form.Item
                        name="name"
                        label="Your Name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Your Name" />
                      </Form.Item>

                      <Form.Item
                        name="email"
                        label="Your Email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Please enter a valid email address!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Your Email" />
                      </Form.Item>

                      <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the subject!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Your Subject" />
                      </Form.Item>

                      <Form.Item
                        name="message"
                        label="Message"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your message!",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder="Write your message here"
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          // className="w-full"
                        >
                          Send Message
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactUs;
