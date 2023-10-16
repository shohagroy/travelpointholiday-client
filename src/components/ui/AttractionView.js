"use client";
import React from "react";
import AttractionCard from "./AttractionCard";
import { useSelector } from "react-redux";

const AttractionView = () => {
  const { data } = useSelector((state) => state.attraction);

  return (
    <div>
      {data?.map((item, i) => (
        <AttractionCard data={item} key={i} />
      ))}
    </div>
  );
};

export default AttractionView;
