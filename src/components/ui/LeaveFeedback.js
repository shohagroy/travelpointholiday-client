"use client";

import { Button, Flex, Rate, Space, message } from "antd";
import React, { useState } from "react";
import { Input } from "antd";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { isLoggedIn } from "@/services/auth.service";

const { TextArea } = Input;

const LeaveFeedback = ({ id }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [commentBox, setCommentBox] = useState(false);
  const [review, setReview] = useState("");
  const [star, setStar] = useState(0);

  const userLoggedIn = isLoggedIn();

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const createReviewHandelar = async () => {
    if (!userLoggedIn) {
      return messageApi.open({
        type: "error",
        content: "Please login to leave a review",
      });
    }

    const reviewData = {
      review,
      star,
      attractionId: id,
    };
    const result = await createReview(reviewData).unwrap();
    if (result?.errorMessages) {
      messageApi.open({
        type: "error",
        content: result.errorMessages || "Something went wrong!",
      });
    }
    if (result?.data?.id) {
      messageApi.open({
        type: "success",
        content: "Reveiw Create Successfully!",
      });
      setReview("");
      setStar(0);
      setCommentBox(false);
    }
  };
  return (
    <div className="my-6">
      {contextHolder}
      {!commentBox ? (
        <Flex align="center">
          <p>Want to Review something?</p>
          <Button
            onClick={() => setCommentBox(!commentBox)}
            className="ml-4"
            type="primary"
          >
            Leave a Review
          </Button>
        </Flex>
      ) : (
        <div>
          <p className="font-bold py-2">Leave Review</p>
          <Rate
            className="p-1"
            allowHalf
            value={star}
            onChange={(e) => setStar(e)}
          />
          <TextArea
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="mb-3 bg-white"
            placeholder="Review write.."
          />

          <Space>
            <Button
              loading={isLoading}
              onClick={createReviewHandelar}
              type="primary"
            >
              Submit
            </Button>
            <Button onClick={() => setCommentBox(!commentBox)} danger>
              Cancel
            </Button>
          </Space>
        </div>
      )}
    </div>
  );
};

export default LeaveFeedback;
