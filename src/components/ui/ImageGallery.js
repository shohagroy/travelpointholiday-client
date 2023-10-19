import React, { useState } from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import ImageGroupView from "./ImageGroupView";
import Banar from "../Banar";

const ImageGallery = ({ images = [] }) => {
  const [previewImages, setPreviewImages] = useState(false);

  return (
    <div>
      <Row className="hidden lg:block" gutter={10}>
        <Col span={16}>
          <div
            style={{ position: "relative" }}
            className="relative w-full h-[500px] bg-gray-200 flex justify-center items-center  overflow-hidden"
          >
            <Image
              preview={false}
              src={images[0]?.secure_url}
              alt="image"
              onClick={() => setPreviewImages(true)}
              className="w-full h-full cursor-pointer hover:scale-105 duration-300"
              height={100}
              width={100}
              layout="responsive"
            />
          </div>
        </Col>

        <Col span={8}>
          <Row gutter={10}>
            <Col span={12}>
              <div className="w-full relative h-[245px] bg-gray-200 overflow-hidden">
                <Image
                  onClick={() => setPreviewImages(true)}
                  className="w-full h-full cursor-pointer hover:scale-105 duration-300"
                  src={images[1]?.secure_url}
                  alt="image"
                  height={100}
                  width={100}
                  layout="responsive"
                />
              </div>

              <div className="w-full h-[245px] mt-[10px] bg-gray-200 overflow-hidden">
                <Image
                  onClick={() => setPreviewImages(true)}
                  className="w-full h-full cursor-pointer hover:scale-105 duration-300"
                  src={images[2]?.secure_url}
                  alt="image"
                  height={100}
                  width={100}
                  layout="responsive"
                />
              </div>
            </Col>

            <Col span={12}>
              <div className="w-full h-[160px] bg-gray-200 overflow-hidden">
                <Image
                  preview={false}
                  onClick={() => setPreviewImages(true)}
                  className="w-full h-full cursor-pointer hover:scale-105 duration-300"
                  src={images[3]?.secure_url}
                  alt="image"
                  height={100}
                  width={100}
                  layout="responsive"
                />
              </div>
              <div className="w-full h-[160px] mt-[10px] bg-graay-200 overflow-hidden">
                <Image
                  onClick={() => setPreviewImages(true)}
                  className="w-full h-full cursor-pointer hover:scale-105 duration-300"
                  src={images[4]?.secure_url}
                  alt="image"
                  height={100}
                  width={100}
                  layout="responsive"
                />
              </div>
              <div className="w-full h-[160px] mt-[10px] bg-gray-200 overflow-hidden">
                <Image
                  onClick={() => setPreviewImages(true)}
                  className="w-full h-full cursor-pointer hover:scale-105 duration-300"
                  src={images[5]?.secure_url}
                  alt="image"
                  height={100}
                  width={100}
                  layout="responsive"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="w-full lg:hidden">
        <Banar data={images} />
      </div>

      {previewImages && (
        <ImageGroupView images={images} setFn={setPreviewImages} />
      )}
    </div>
  );
};

export default ImageGallery;
