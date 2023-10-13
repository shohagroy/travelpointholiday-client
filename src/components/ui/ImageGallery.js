import React from "react";
import { Row, Col } from "antd";

const ImageGallery = () => {
  return (
    <Row gutter={10}>
      <Col span={16}>
        <div className="w-full h-[500px] bg-lime-500 flex justify-center items-center">
          <p>Image</p>
        </div>
      </Col>

      <Col span={8}>
        {/* <div className="w-full h-[500px] bg-lime-500 flex justify-center items-center">
          <p>Image</p>
        </div> */}

        <Row gutter={10}>
          <Col span={12}>
            <div className="w-full h-[245px] bg-orange-400">
              <p>Image</p>
            </div>

            <div className="w-full h-[245px] mt-[10px] bg-orange-400">
              <p>Image</p>
            </div>
          </Col>

          <Col span={12}>
            <div className="w-full h-[160px] bg-orange-400">
              <p>Image</p>
            </div>
            <div className="w-full h-[160px] mt-[10px] bg-orange-400">
              <p>Image</p>
            </div>
            <div className="w-full h-[160px] mt-[10px] bg-orange-400">
              <p>Image</p>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ImageGallery;
