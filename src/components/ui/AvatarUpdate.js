import { Avatar, Button, Modal, message } from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import InputImage from "./InputImage";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";

const AvatarUpdate = ({ avatar }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imgPreview, setImgPreview] = useState(true);

  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handelUpload = async () => {
    const result = await updateAvatar({
      blob: images[0],
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
        content: "User Avatar update Successfully!",
      });
      setImages([]);
      setOpen(false);
      setImgPreview(true);
    }
  };

  return (
    <div>
      {contextHolder}
      <div className="flex flex-col justify-start items-center">
        <Avatar
          className="cursor-pointer"
          size={64}
          src={avatar?.secure_url}
          icon={<UserOutlined />}
        />
        <Button onClick={showModal} type="link">
          Change
        </Button>
      </div>
      <Modal
        title="Upload Avatar"
        open={open}
        onOk={handelUpload}
        confirmLoading={isLoading}
        onCancel={handleCancel}
      >
        <div>
          <InputImage
            imgPreview={imgPreview}
            setImages={setImages}
            images={images}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AvatarUpdate;
