"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  loading,
  handleChange,
}) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            loading={loading}
            onChange={handleChange ? handleChange : onChange}
            size={size}
            options={options}
            value={value}
            style={{ width: "100%" }}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
