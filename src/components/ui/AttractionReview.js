"use client";

import { Button, Col, Flex, Row } from "antd";
import React, { useState } from "react";
import Text from "./Text";
import ReviewCard from "./ReviewCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useGetAttractionReviewsQuery } from "@/redux/features/review/reviewApi";

const AttractionReview = ({ id }) => {
  const [showReviwCard, setShowReviewCard] = useState(0);

  const { data, isLoading } = useGetAttractionReviewsQuery({ id });

  return (
    <div className="my-6">
      {data?.data?.length ? (
        <>
          <Flex justify="space-between" align="center">
            <Text text={"Helpful reviews"} />
            {/* <Button type="text">See all Reviews</Button> */}
          </Flex>

          <div className="relative">
            <Row className="mt-2" gutter={16}>
              <Col span={12}>
                <ReviewCard data={data?.data[showReviwCard]} />
              </Col>

              <Col span={12}>
                {data?.data?.length > 1 ? (
                  <ReviewCard data={data?.data[showReviwCard + 1]} />
                ) : (
                  ""
                )}
              </Col>
            </Row>

            <div className="absolute top-1/2 transform -translate-y-1/2 -left-2 z-50">
              <Button
                onClick={() =>
                  setShowReviewCard(
                    showReviwCard === 0
                      ? data?.data?.length - 1
                      : showReviwCard - 1
                  )
                }
                icon={<LeftOutlined />}
                type="link"
              ></Button>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 -right-2 z-50">
              <Button
                onClick={() =>
                  setShowReviewCard(
                    showReviwCard === data?.data?.length - 1
                      ? 0
                      : showReviwCard + 1
                  )
                }
                icon={<RightOutlined />}
                type="link"
              ></Button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AttractionReview;
