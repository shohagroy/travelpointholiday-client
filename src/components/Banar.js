import React from "react";
import { Carousel } from "antd";

import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import img7 from "../assets/7.jpg";
import img8 from "../assets/8.jpg";
import Image from "next/image";

const Banar = () => {
  const banarData = [
    {
      title: "Title 1",
      content: "Content 1",
      img: img1,
    },

    {
      title: "Title 2",
      content: "Content 2",
      img: img2,
    },
    {
      title: "Title 3",
      content: "Content 3",
      img: img3,
    },
    {
      title: "Title 4",
      content: "Content 4",
      img: img4,
    },
    {
      title: "Title 5",
      content: "Content 5",
      img: img5,
    },
    {
      title: "Title 6",
      content: "Content 6",
      img: img6,
    },
    {
      title: "Title 7",
      content: "Content 7",
      img: img7,
    },
    {
      title: "Title 8",
      content: "Content 8",
      img: img8,
    },
  ];
  return (
    <Carousel autoplay>
      {banarData?.map((item, i) => (
        <div key={i} className="h-full md:h-[500px] lg:h-[700px] object-cover">
          <Image
            src={item.img}
            alt={item.title}
            width={1000}
            height={500}
            layout="responsive"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
            <h1>{item.title}</h1>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banar;
