import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "antd";

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  label,
  required,
}) => {
  const methods = useFormContext();

  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      {label ? label : null}
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
