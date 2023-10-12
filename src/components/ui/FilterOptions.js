"use client";

import { Button, Card, Flex } from "antd";
import React from "react";
import CheckBoxFilds from "./CheckBoxFilds";

const FilterOptions = () => {
  const filterHandelar = (search) => {
    console.log(JSON.parse(search));
  };
  return (
    <Card
      title={
        <Flex justify="space-between" align="center">
          <p className="font-bold">Filter</p>
          <Button type="link">Clear</Button>
        </Flex>
      }
      className="shadow-md mt-4"
    >
      <CheckBoxFilds onChange={filterHandelar} tittle={"category"} />
      <CheckBoxFilds onChange={filterHandelar} tittle={"price"} />
      <CheckBoxFilds onChange={filterHandelar} tittle={"city"} />
    </Card>
  );
};

export default FilterOptions;
