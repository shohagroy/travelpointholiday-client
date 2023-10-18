"use client";

import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import FormTimePicker from "@/components/forms/FormTimePicker";
import Form from "@/components/forms/From";
import EditTools from "@/components/ui/EditTools";
import InputImage from "@/components/ui/InputImage";
import { useCreateAttractionMutation } from "@/redux/features/attraction/attractionApi";
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

const CreateAttractionPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [images, setImages] = useState([]);
  const [imgPreview, setImgPreview] = useState(false);
  const [description, setDescription] = useState("");

  const router = useRouter();

  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryDataQuery();

  const { data: countryData, isLoading: countryLoading } =
    useGetAllCountryDataQuery();

  const { data: citiesData, isLoading: citiesLoading } =
    useGetAllCitiesDataQuery();

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
      label: "Create Attractions",
      link: "/admin/manage-attractions/create-attraction",
    },
  ];

  const categoryOptions = categoryData?.data?.map((items) => {
    return {
      label: items.name,
      value: items.id,
    };
  });

  const countryOptions = countryData?.data?.map((items) => {
    return {
      label: items?.name,
      value: items?.id,
    };
  });

  const citiesOptions = citiesData?.data?.map((items) => {
    return {
      label: items?.name,
      value: items?.id,
    };
  });

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
              <Form
                submitHandler={onSubmit}
                resolver={yupResolver(attractionSchema)}
              >
                <Card
                  title={
                    <div>
                      <h2>Attractions Information</h2>
                    </div>
                  }
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <div className="">
                        <FormInput
                          label={"Attraction Tittle"}
                          name={"tittle"}
                          required
                          type={"text"}
                          size="large"
                        />
                      </div>

                      <div className="my-4">
                        <FormInput
                          label={"Banar tittle"}
                          name={"banarTittle"}
                          required
                          type={"text"}
                          size="large"
                        />
                      </div>
                    </Col>

                    <Col span={8}>
                      <div className="my-4">
                        <FormSelectField
                          loading={categoryLoading}
                          name={"categoryId"}
                          label={"Select Category"}
                          options={categoryOptions}
                          required
                          size="large"
                        />
                      </div>
                    </Col>

                    <Col span={8}>
                      <div className="my-4">
                        <FormSelectField
                          name={"countryId"}
                          // handleChange={(e) => setCountryId(e)}
                          loading={countryLoading}
                          label={"Country Name"}
                          options={countryOptions}
                          placeholder="Select Country..."
                          size="large"
                        />
                      </div>
                    </Col>

                    <Col span={8}>
                      <div className="my-4">
                        <FormSelectField
                          loading={citiesLoading}
                          name={"cityId"}
                          label={"Select City"}
                          options={citiesOptions}
                          required
                          size="large"
                        />
                      </div>
                    </Col>

                    <Col span={6}>
                      <div className="my-4">
                        <FormInput
                          label={"Ticket Price (Adult)"}
                          name={"price"}
                          required
                          type={"text"}
                          size="large"
                        />
                      </div>
                    </Col>

                    <Col span={6}>
                      <div className="my-4">
                        <FormInput
                          label={"Trip Duration"}
                          name={"duration"}
                          required
                          type={"text"}
                          size="large"
                        />
                      </div>
                    </Col>

                    <Col span={6}>
                      <div className="my-4">
                        <FormDatePicker
                          label={"Trip Date"}
                          name={"tripDate"}
                          size="large"
                        />
                      </div>
                    </Col>

                    <Col span={6}>
                      <div className="my-4">
                        <FormTimePicker label={"Trip Time"} name={"tripTime"} />
                      </div>
                    </Col>
                  </Row>
                </Card>

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
              </Form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateAttractionPage;
