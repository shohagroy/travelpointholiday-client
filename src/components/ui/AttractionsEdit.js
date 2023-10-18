import { Button, Card, Col, Flex, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import FormDatePicker from "../forms/FormDatePicker";
import FormTimePicker from "../forms/FormTimePicker";
import FormInput from "../forms/FormInput";
import FormSelectField from "../forms/FormSelectField";
import Form from "@/components/forms/From";
import { useGetAllCategoryDataQuery } from "@/redux/features/category/categoryApi";
import { useGetAllCountryDataQuery } from "@/redux/features/country/countryApi";
import { useGetAllCitiesDataQuery } from "@/redux/features/city/cityAPi";
import { yupResolver } from "@hookform/resolvers/yup";
import { attractionSchema } from "@/schemas/attraction";
import { useUpdateAttractionInfoMutation } from "@/redux/features/attraction/attractionApi";
import EditTools from "./EditTools";
import { useRouter } from "next/navigation";

const AttractionsEdit = ({ defaultInfo }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [description, setDescription] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (defaultInfo) {
      setDescription(defaultInfo?.description);
    }
  }, [defaultInfo]);

  const [updateAttractionInfo, { isLoading }] =
    useUpdateAttractionInfoMutation();

  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryDataQuery();

  const { data: countryData, isLoading: countryLoading } =
    useGetAllCountryDataQuery();

  const { data: citiesData, isLoading: citiesLoading } =
    useGetAllCitiesDataQuery();

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

  const onSubmit = async (data) => {
    const result = await updateAttractionInfo({
      ...data,
      description,
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
        content: "Attraction update Successfully!",
      });
      router.push("/admin/manage-attractions");
    }
  };

  return (
    <div>
      {contextHolder}
      <Form
        submitHandler={onSubmit}
        defaultValues={defaultInfo}
        resolver={yupResolver(attractionSchema)}
      >
        <Card
          title={
            <div>
              <h2>Attractions Information Edit</h2>
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
              <h2>Attractions Details</h2>
            </div>
          }
        >
          <Row gutter={16}>
            <Col span={24}>
              <div className="my-4">
                <EditTools setValue={setDescription} value={description} />
              </div>
            </Col>
          </Row>
        </Card>

        <Flex justify="center" align="center">
          <Button
            loading={isLoading}
            htmlType="submit"
            type="primary"
            className="mx-1"
          >
            {isLoading ? "Saving..." : "Update Info"}
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default AttractionsEdit;
