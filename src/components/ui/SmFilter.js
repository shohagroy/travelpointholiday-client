import { Button, Flex, Modal } from "antd";
import React, { useState } from "react";
import FilterOptions from "./FilterOptions";

const SmFilter = ({ setCategoryId, setCountryId, setCityId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <Flex className="w-full justify-between bg-gray-100 rounded-3xl p-3">
        <Button onClick={setIsModalOpen} type="text">
          Filter Options
        </Button>
        <Button type="link">Clear</Button>
      </Flex>

      <Modal
        style={{ padding: 0 }}
        footer={<></>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div onClick={handleOk}>
          <FilterOptions
            setCategoryId={setCategoryId}
            setCountryId={setCountryId}
            setCityId={setCityId}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SmFilter;
