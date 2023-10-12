import { Checkbox } from "antd";
import React from "react";

const CheckBoxFilds = ({ tittle, onChange }) => {
  const checkHandelar = (info) => {
    onChange(info);
  };
  return (
    <div className="mb-4 capitalize">
      <p className="font-bold ">{tittle}</p>
      {[...Array(10)].map((item, i) => (
        <div key={i}>
          <Checkbox
            onChange={(e) =>
              checkHandelar(
                JSON.stringify({
                  tittle,
                  check: e.target.checked,
                  id: i,
                })
              )
            }
          >
            {tittle} - {i + 1}
          </Checkbox>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxFilds;
