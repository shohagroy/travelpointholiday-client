import { Avatar, Card, Flex } from "antd";
import React from "react";

const DashboardCard = ({ icon, label, value, color }) => {
  return (
    <Card
      style={{
        backgroundColor: color,
        color: "white",
      }}
      loading={false}
      hoverable
      color="red"
      title={
        <div className="flex items-center py-4">
          <Avatar icon={icon} size={"large"} />
          <h3 className="ml-4 text-white">{label}</h3>
        </div>
      }
    >
      <Flex justify="space-between" align="center">
        <p className="text-2xl font-bold">Total {label}:</p>
        <p className="text-2xl font-bold">{value}</p>
      </Flex>
    </Card>
  );
};

export default DashboardCard;
