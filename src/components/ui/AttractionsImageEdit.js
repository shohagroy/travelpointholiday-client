import { Button, Card, Flex, Image, message } from "antd";
import React, { useState } from "react";
import {
  useRemoveAttractionImageMutation,
  useUploadAttractionsImageMutation,
} from "@/redux/features/attraction/attractionApi";

import { CloseOutlined } from "@ant-design/icons";
import ConfirmModal from "./ConfirmModal";
import InputImage from "./InputImage";

const AttractionsImageEdit = ({ images }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeImageInfo, setRemoveImageInfo] = useState({});
  const [uploadNew, setUploadNew] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState(false);

  const [removeAttractionImage, { isLoading }] =
    useRemoveAttractionImageMutation();

  const [uploadAttractionsImage, { isLoading: postLoading }] =
    useUploadAttractionsImageMutation();

  const removeImage = async () => {
    const result = await removeAttractionImage(removeImageInfo).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Attraction Image remove Successfully!",
      });
    }
    setIsModalOpen(false);
  };

  const newImageUploadHandelar = async () => {
    const result = await uploadAttractionsImage({
      id: images[0].attractionId,
      data: newImages,
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
        content: "Attraction Image Added Successfully!",
      });
    }
    setUploadNew(false);
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
        {!uploadNew ? (
          <>
            <div className="grid grid-cols-5 gap-4">
              {images?.map((image) => (
                <div key={image?.id} className="relative">
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
              ))}
            </div>
          </>
        ) : (
          <InputImage
            imgPreview={previews}
            setImages={setNewImages}
            setPreviews={setPreviews}
          />
        )}

        <Flex className="justify-center mt-4">
          <Button
            className="mx-2"
            onClick={() => setUploadNew(!uploadNew)}
            type="primary"
            danger={uploadNew}
          >
            {uploadNew ? "Cancel" : " Upload New"}
          </Button>

          {uploadNew && (
            <Button
              loading={postLoading}
              className="mx-2"
              onClick={newImageUploadHandelar}
              type="primary"
            >
              {postLoading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </Flex>
      </Card>

      <ConfirmModal
        loading={isLoading}
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
