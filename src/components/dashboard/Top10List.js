import React from "react";
import { List } from "antd";

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
