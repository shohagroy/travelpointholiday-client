"use client";

import React from "react";
import { Button, Dropdown, Flex } from "antd";

import Avatar from "antd/es/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";

const AdminHeader = () => {
  const items = [
    {
      key: "1",
      label: (
        <Button
          type="primary"
          danger
          style={{ width: "100%", margin: "0px 0" }}
        >
          Log Out
        </Button>
      ),
    },
  ];
  return (
    <div className="bg-[#001529] border-b-2 text-white">
      <div className="max-w-7xl mx-auto ">
        <Flex
          style={{ width: "100%", padding: "10px 5px" }}
          gap="middle"
          justify="end"
          align="center"
        >
          <Flex justify="center" align="center">
            <div className="text-right mr-4">
              <h3 className="text-md">Shohag Roy</h3>
              <p>
                <small>Super Admin</small>
              </p>
            </div>

            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <Avatar
                style={{ cursor: "pointer" }}
                onClick={(e) => e.preventDefault()}
                size="large"
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default AdminHeader;
