import React from "react";
import { Card, List } from "antd";
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const Top10List = ({ data }) => {
  return (
    <List
      //   size={670}
      header={
        <div>
          <h3>Top 5 Booking Attraction</h3>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          {item.name} - ({item?.booking})
        </List.Item>
      )}
    />
  );
};

export default Top10List;
