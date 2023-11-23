import React from "react";
import { Button, Card } from "antd";
import {
  StarFilled,
  CalendarOutlined,
  RightOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const AttractionCard = ({ data }) => {
  const { id, banarTittle, images, price, tittle, duration, city } = data || {};

  return (
    <div className="w-full my-3 ">
      <Card className="shadow-sm hover:shadow-md duration-200 ">
        <div className="  md:flex">
          {/* Use flex for medium and large screens */}
          <div className="w-full  md:w-1/2 md:p-2">
            {/* Full width for mobile and half width for medium and large */}
            <Image
              width={200}
              height={250}
              // layout="responsive"
              src={images[0]?.secure_url}
              alt="image"
              className="w-full rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <p className="font-bold">{city?.name}</p>
            <Link href={`/attractions/${id}`}>
              <h2 className="text-blue-600">{tittle}</h2>
            </Link>
            <p className="">{banarTittle}</p>

            <div className="mt-2">
              <p className="mr-2 text-gray-600">
                <FieldTimeOutlined /> <span>Duration: {duration}</span>
              </p>
              <div className="md:flex justify-between items-start">
                {/* Use flex for medium and large screens */}
                <div>
                  <div className="flex items-center">
                    <p className="text-yellow-500 mr-2">
                      <StarFilled />
                    </p>
                    <p>
                      <strong>4.4/5</strong> (1343 reviews)
                    </p>
                  </div>

                  <p className="mr-2 text-green-600">
                    <CalendarOutlined />{" "}
                    <span>Free cancellation available</span>
                  </p>
                </div>
                <div className="md:text-right py-1">
                  {/* Right align text for medium and large screens */}
                  <p>
                    From <strong className="text-2xl">${price}</strong>
                  </p>
                  <Link href={`/attractions/${id}`}>
                    <Button
                      size="large"
                      type="link"
                      className="px-6 font-bold border border-blue-600 mt-4"
                    >
                      See Availability <RightOutlined />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttractionCard;
