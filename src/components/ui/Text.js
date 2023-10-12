import React from "react";

const Text = ({ text }) => {
  return (
    <div>
      <p className="text-normal lg:text-xl font-bold text-gray-600">{text}</p>
    </div>
  );
};

export default Text;
