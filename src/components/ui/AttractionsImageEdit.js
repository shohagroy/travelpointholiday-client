import { Button, Card, Col, Flex, Image, Row, message } from "antd";
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

import { CloseOutlined } from "@ant-design/icons";
import ConfirmModal from "./ConfirmModal";

const AttractionsImageEdit = ({ images }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeImageInfo, setRemoveImageInfo] = useState({});

  console.log(images);

  const onSubmit = async (data) => {
    // const result = await updateAttractionInfo({
    //   ...data,
    //   description,
    // }).unwrap();
    // if (result?.errorMessages) {
    //   messageApi.open({
    //     type: "error",
    //     content: result.errorMessages || "Something went wrong!",
    //   });
    // }
    // if (result?.data?.id) {
    //   messageApi.open({
    //     type: "success",
    //     content: "Attraction update Successfully!",
    //   });
    //   router.push("/admin/manage-attractions");
    // }
  };

  const removeImage = () => {
    console.log(removeImageInfo);
  };

  return (
    <div>
      {contextHolder}
      <Card
        className="mb-4"
        title={
          <div>
            <h2>Attractions Images Add and Update</h2>
          </div>
        }
      >
        <Row gutter={16}>
          <div className="flex gap-1">
            {images?.map((image) => (
              <Col key={image?._id} span={6}>
                <div className="relative">
                  <Button
                    onClick={() => {
                      setRemoveImageInfo(image);
                      setIsModalOpen(true);
                    }}
                    className="z-50 absolute -top-3 -right-3"
                    icon={<CloseOutlined />}
                    danger
                    type="primary"
                  ></Button>
                  <Image
                    className=""
                    src={image?.secure_url}
                    alt="product image"
                    preview={false}
                  />
                </div>
              </Col>
            ))}
          </div>
        </Row>

        <Flex className="justify-center mt-4">
          <Button type="primary">Upload New</Button>
        </Flex>
      </Card>

      <ConfirmModal
        loading={false}
        setOpen={setIsModalOpen}
        open={isModalOpen}
        submitFn={removeImage}
        modalText={{
          tittle: "Remove Image",
          details: "Are you sure you want to remove this image?",
        }}
      />
    </div>
  );
};

export default AttractionsImageEdit;
