import { Avatar, Button, Card, Flex, Rate } from "antd";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";

const ReviewCard = ({ data }) => {
  const { user, review, star, createdAt } = data || {};

  return (
    <Card className="shadow-md h-[350px]">
      <Flex>
        <div className="w-[150px]">
          <Avatar size={"large"} src={user?.profileImg}>
            U
          </Avatar>
        </div>

        <div className="ml-3">
          <h3>{user?.name}</h3>
          <p>{user?.address}</p>

          <Flex className="mt-2">
            <Rate allowHalf value={star} />
            <p>{star} / 5</p>
          </Flex>

          <p className="my-4">
            {review?.slice(0, 250)}
            <Button type="link">more</Button>
          </p>

          <p className="mt-4">
            Posted {dayjs(createdAt).format("MMM D, YYYY hh:mm A")} on{" "}
            <Link href={"/"}>Travel Point</Link>
          </p>
        </div>
      </Flex>
    </Card>
  );
};

export default ReviewCard;
