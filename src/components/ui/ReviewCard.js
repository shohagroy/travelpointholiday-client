import { Avatar, Button, Card, Flex, Rate } from "antd";
import React from "react";

const ReviewCard = () => {
  return (
    <Card className="shadow-md">
      <Flex>
        <div className="w-[150px]">
          <Avatar size={"large"}>U</Avatar>
        </div>

        <div className="ml-3">
          <h3>STEPHEN</h3>
          <p>United Kingdom</p>

          <Flex className="mt-2">
            <Rate allowHalf value={4} />
            <p>5 / 5</p>
          </Flex>

          <p className="my-4">
            We booked our tickets in advance. Proceeded to the ticket desk to
            get our tickets to gain entrance, and then endured a very long
            queue. Best thing tha tickets to gain entrance, and then endured a
            very long queue. Best thing tha tickets to gain entrance, and then
            endured a very long queue. Best thing tha...
            <Button type="link">more</Button>
          </p>

          <p className="mt-4">Posted May 23, 2023 on Booking.com</p>
        </div>
      </Flex>
    </Card>
  );
};

export default ReviewCard;
