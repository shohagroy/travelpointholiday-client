import React from "react";
import { Pagination } from "antd";

const PaginationOprions = () => {
  return (
    <Pagination
      className="w-full flex justify-center items-center p-2 rounded-md shadow-md border bg-gray-100"
      total={85}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
  );
};

export default PaginationOprions;
