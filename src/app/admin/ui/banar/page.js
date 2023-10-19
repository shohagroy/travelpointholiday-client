"use client";

import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";
import { Button, Card, Col, Flex, Image, Modal, Row, message } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import ConfirmModal from "@/components/ui/ConfirmModal";
import InputImage from "@/components/ui/InputImage";
import {
  useDeleteBanarMutation,
  useGetAllBanarsQuery,
  useUploadNewBanarMutation,
} from "@/redux/features/banar/banarApi";
import InitialLoading from "@/components/loader/InitialLoading";

const BanarManagePage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpem] = useState(false);
  const [images, setImages] = useState([]);
  const [imgPreview, setImgPreview] = useState(true);
  const [modalText, setModalText] = useState("");

  const { data: banarData, isLoading: initialLoading } = useGetAllBanarsQuery();
  const [deleteBanar, { isLoading: deleteLoading }] = useDeleteBanarMutation();
  const [uploadNewBanar, { uploadLoading }] = useUploadNewBanarMutation();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setImages([]);
    setOpen(false);
    setImgPreview(false);
  };

  const banarDeleteHandelar = async () => {
    const result = await deleteBanar(modalText?.data).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    console.log(result);
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Banar Delete Successfully!",
      });
      setModalOpem(false);
    }
  };

  const openModalHandelar = (data) => {
    setModalText({
      data,
      tittle: "Are your sure Delete this Banar?",
    });
    setModalOpem(true);
  };

  const handelUpload = async () => {
    const result = await uploadNewBanar(images).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }

    if (result?.data?.count) {
      messageApi.open({
        type: "success",
        content: "Banars Upload Successfully!",
      });
      setImages([]);
      setOpen(false);
      setImgPreview(true);
    }
  };

  const breadCrumbItems = [
    {
      label: <Link href={"/admin"}>Admin</Link>,
      link: "/admin",
    },
    {
      label: "Website Setting",
      link: "/admin/ui/banar",
    },
  ];

  if (initialLoading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <InitialLoading />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Travel Point | Website | Banar</title>
      </Head>
      <main>
        {contextHolder}
        <section>
          <AdminBreadCrumb items={breadCrumbItems} />

          <div className="max-w-7xl mx-auto my-4">
            <div className="mt-10">
              <Flex justify="end">
                <div>
                  <Button onClick={showModal} type="primary">
                    Upload New
                  </Button>
                </div>
              </Flex>
            </div>

            <Modal
              title="Upload Banar"
              open={open}
              onOk={handelUpload}
              confirmLoading={uploadLoading}
              onCancel={handleCancel}
            >
              <p>jpg or png image less than 1mb</p>
              <div>
                <InputImage
                  imgPreview={imgPreview}
                  setImages={setImages}
                  images={images}
                />
              </div>
            </Modal>

            <Row gutter={16} className="mt-6">
              {banarData?.data?.map((banar, i) => (
                <Col className="my-2" span={12} key={banar.id}>
                  <Card
                    title={
                      <Flex justify="end">
                        <Button
                          onClick={() => openModalHandelar(banar)}
                          icon={<DeleteOutlined />}
                          type="primary"
                          danger
                        ></Button>
                      </Flex>
                    }
                  >
                    <Image src={banar?.secure_url} alt={`banar - ${i}`} />
                  </Card>
                </Col>
              ))}
            </Row>

            <ConfirmModal
              submitFn={banarDeleteHandelar}
              setOpen={setModalOpem}
              open={modalOpen}
              loading={deleteLoading}
              modalText={modalText}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default BanarManagePage;
