"use client";

import { Button, Flex, Space } from "antd";
import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

const LeaveFeedback = () => {
  const [commentBox, setCommentBox] = React.useState(false);
  return (
    <div className="my-6">
      {!commentBox ? (
        <Flex align="center">
          <p>Want to suggest something?</p>
          <Button
            onClick={() => setCommentBox(!commentBox)}
            className="ml-4"
            type="primary"
          >
            Leave Feedback
          </Button>
        </Flex>
      ) : (
        <div>
          <p className="font-bold py-2">Leave Feedback</p>
          <TextArea
            rows={4}
            className="mb-3"
            placeholder="Let us know how we can improve this page. We can't reply to suggestions or questions."
          />

          <Space>
            <Button type="primary">Submit</Button>
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
