"use client";

import { Button, Input, Row, Space } from "antd";
import React from "react";

const Subscribe = () => {
  return (
    <div className="bg-[#013A95] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="">
          <Space direction="vertical" size="large" className=" px-5 w-full ">
            <div className="pt-14 text-center">
              <h2 className="text-3xl font-bold ">Never Miss An Offer</h2>
              <p>Subscribe and be the first to receive our exclusive offers</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Space.Compact
                style={{
                  width: "100%",
                  paddingBottom: "3.5rem",
                }}
              >
                <Input
                  className="bg-white p-3 "
                  prefix={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                      />
                    </svg>
                  }
                  placeholder="Enter your email..."
                />

                <Button
                  type="primary"
                  className=" p-3 h-[50px] font-bold"
                  size="large"
                  danger
                >
                  Subscribe
                </Button>
              </Space.Compact>
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
