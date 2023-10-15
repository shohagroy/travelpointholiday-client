/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

const InputImage = ({ images = [], imgPreview, setImages }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    setPreviews([...previews, ...images]);
  }, []);

  useEffect(() => {
    if (!imgPreview) {
      setPreviews([]);
    }
  }, [imgPreview]);

  const handleChange = (e) => {
    const selectedFiles = e.target.files;

    for (let i = 0; i < selectedFiles.length; i++) {
      const newImage = selectedFiles[i];

      if (newImage) {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prevImages) => [...prevImages, reader.result]);
          setPreviews((prevPreviews) => [...prevPreviews, reader.result]);
        };
        reader.readAsDataURL(newImage);
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages([...newImages]);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews([...newPreviews]);
  };

  return (
    <div className="w-full">
      <div className="flex justify-start p-4 items-center">
        <input
          type="file"
          multiple
          onChange={handleChange}
          name="files"
          id="files"
          className="px-8 py-12 border-2 border-dashed w-full rounded-md border-gray-500 text-gray-400 "
        />
      </div>

      <div className="flex gap-1">
        {previews?.map((preview, i) => (
          <div
            className="border mx-4  h-[100px] my-2 p-2 rounded-md w-[100px] flex items-center justify-center relative"
            key={i}
          >
            <Button
              onClick={() => removeImage(i)}
              className="z-50 absolute -top-3 -right-3"
              icon={<CloseOutlined />}
              danger
              type="primary"
            ></Button>
            <Image
              className="w-[100px] h-[100px]"
              src={preview}
              alt="product image"
              preview={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputImage;
