"use client";

import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import FormTimePicker from "@/components/forms/FormTimePicker";
import Form from "@/components/forms/From";
import AttractionsEdit from "@/components/ui/AttractionsEdit";
import AttractionsImageEdit from "@/components/ui/AttractionsImageEdit";
import EditTools from "@/components/ui/EditTools";
import InputImage from "@/components/ui/InputImage";
import {
  useCreateAttractionMutation,
  useGetAttractionQuery,
} from "@/redux/features/attraction/attractionApi";
import { useGetAllCategoryDataQuery } from "@/redux/features/category/categoryApi";
import { useGetAllCitiesDataQuery } from "@/redux/features/city/cityAPi";
import { useGetAllCountryDataQuery } from "@/redux/features/country/countryApi";
import { attractionSchema } from "@/schemas/attraction";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Flex, Row, message } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreateAttractionPage = ({ params }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [images, setImages] = useState([]);
  const [imgPreview, setImgPreview] = useState(false);
  const [description, setDescription] = useState("");

  const { id } = params;
  const { data: attractionInfo, isLoading: initialLoading } =
    useGetAttractionQuery(id);

  console.log(attractionInfo);

  const router = useRouter();

  const breadCrumbItems = [
    {
      label: <Link href={"/admin"}>Admin</Link>,
      link: "/admin",
    },
    {
      label: "Manage Attractions",
      link: "/admin/manage-attractions",
    },
    {
      label: `Edit Attractions - ${attractionInfo?.data?.tittle}`,
      // link: "/admin/manage-attractions/edit",
    },
  ];

  const [createAttraction, { isLoading }] = useCreateAttractionMutation();

  useEffect(() => {
    if (images.length > 0) {
      setImgPreview(true);
    } else {
      setImgPreview(false);
    }
  }, [images]);

  const onSubmit = async (data) => {
    const attractionData = { ...data, description, images };
    const result = await createAttraction(attractionData).unwrap();

    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Attraction Create Successfully!",
      });
      setImgPreview(false);
      setDescription("");
      setImages([]);
      router.push("/admin/manage-attractions");
    }
  };

  return (
    <>
      <Head>
        <title>Travel Point | Attractions | Create Attractions</title>
      </Head>

      <main>
        <section>
          {contextHolder}
          <AdminBreadCrumb items={breadCrumbItems} />

          <div className="max-w-7xl mx-auto my-6">
            <div className="my-4">
              <AttractionsImageEdit images={attractionInfo?.data?.images} />
              <AttractionsEdit defaultInfo={attractionInfo?.data} />

              {/* <Form
                submitHandler={onSubmit}
                resolver={yupResolver(attractionSchema)}
              >
                <Card
                  className="my-4"
                  title={
                    <div>
                      <h2>Attractions Images</h2>
                    </div>
                  }
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <div className="">
                        <InputImage
                          imgPreview={imgPreview}
                          images={images}
                          setImages={setImages}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card>

                <Card
                  className="my-4"
                  title={
                    <div>
                      <h2>Attractions Details</h2>
                    </div>
                  }
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <div className="my-4">
                        <EditTools
                          setValue={setDescription}
                          value={description}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card>

                <Flex justify="center" align="center">
                  <Button
                    loading={isLoading}
                    htmlType="submit"
                    className="text-center my-6 mx-2"
                    size="large"
                    type="primary"
                  >
                    {isLoading ? "Creating..." : "Create Attractions"}
                  </Button>
                </Flex>
              </Form> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateAttractionPage;
