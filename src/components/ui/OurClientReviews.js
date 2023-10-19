"use client";

import { Col, Row } from "antd";
import React from "react";
import ReviewCard from "./ReviewCard";
import AttractionReview from "./AttractionReview";

const OurClientReviews = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* <div className="max-w-2xl">
        <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
          Our Client Reviews
        </h3>
      </div>

      <Row gutter={16}>
        {[...Array(2)].map((item, i) => (
          <Col span={12} key={i}>
            <ReviewCard />
          </Col>
        ))}
      </Row> */}

      <AttractionReview />
    </div>
  );
};

export default OurClientReviews;
