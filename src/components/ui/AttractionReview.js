import { Button, Col, Flex, Row } from "antd";
import React from "react";
import Text from "./Text";
import ReviewCard from "./ReviewCard";

const AttractionReview = () => {
  return (
    <div className="my-6">
      <Flex justify="space-between" align="center">
        <Text text={"Helpful reviews"} />
        <Button type="text">See all Reviews</Button>
      </Flex>

      <Row className="mt-2" gutter={16}>
        {[...Array(2)].map((items, i) => (
          <Col key={i} span={12}>
            <ReviewCard />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AttractionReview;
