import { Image } from "antd";
import React from "react";

const ImageGroupView = ({ images, setFn }) => {
  return (
    <div>
      <style>{`
      .custom-preview-group .ant-image img:hover::after {
        background: transparent;
      }
    `}</style>
      <Image.PreviewGroup
        preview={{
          visible: images.length,
          onVisibleChange: () => setFn(false),
        }}
        className="custom-preview-group"
      >
        {images.map((image, index) => (
          <Image
            loading="lazy"
            key={index}
            src={image.secure_url}
            alt="images"
            className="absolute top-0 left-0 w-full h-screen object-cover"
          />
        ))}
        {/* {images.map((image, index) => (
        <Image
          loading="lazy"
          key={index}
          src={image.secure_url}
          alt="images"
        />
      )} */}
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageGroupView;
