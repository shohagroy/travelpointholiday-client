import React from "react";
import { Pagination } from "antd";

const PaginationOprions = ({ meta }) => {
  return (
    <Pagination
      className="w-full flex justify-center items-center p-2 rounded-md shadow-md border bg-gray-100"
      total={meta?.total}
      onChange={(page) => console.log(page)}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={meta?.page}
      defaultCurrent={meta?.page}
    />
  );
};

export default PaginationOprions;
