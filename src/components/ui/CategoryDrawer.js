import { Button, Drawer, Flex, message } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import Form from "../forms/From";
import FormInput from "../forms/FormInput";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/category/categoryApi";

const CategoryDrawer = ({ open, setOpen, valueObj, valueFn }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();
  const onSubmit = async (data) => {
    valueFn({});
    if (!valueObj?.key) {
      const result = await createCategory(data).unwrap();
      if (result?.errorMessages) {
        messageApi.open({
          type: "error",
          content: result.errorMessages || "Something went wrong!",
        });
      }
      if (result?.data?.id) {
        messageApi.open({
          type: "success",
          content: "Category Create Successfully!",
        });
        setOpen(false);
        valueFn({});
      }
    } else {
      const updatedData = { name: data.name, id: valueObj?.key };

      const result = await updateCategory(updatedData).unwrap();

      if (result?.errorMessages) {
        messageApi.open({
          type: "error",
          content: result.errorMessages || "Something went wrong!",
        });
      }
      if (result?.data?.id) {
        messageApi.open({
          type: "success",
          content: "Category Update Successfully!",
        });
        setOpen(false);
      }
    }
  };
  return (
    <Drawer
      className=""
      title={
        <Flex justify="space-between" align="center">
          <h2>{valueObj?.key ? "Update" : "Add"} New Category</h2>

          <Button
            onClick={() => {
              setOpen(!open);
              valueFn({});
            }}
            type="primary"
            danger
            size="large"
          >
            <CloseOutlined />
          </Button>
        </Flex>
      }
      placement="right"
      closable={false}
      width={"500px"}
      onClose={() => setOpen(false)}
      open={open}
      getContainer={false}
    >
      <div>
        {contextHolder}
        <Form
          submitHandler={onSubmit}
          defaultValues={{ name: valueObj?.name } || {}}
        >
          <FormInput
            name={"name"}
            type={"text"}
            size="large"
            label={"Category Name"}
            required
          />

          <Button
            htmlType="submit"
            loading={isLoading}
            className="my-4"
            type="primary"
          >
            {!valueObj?.key
              ? isLoading
                ? "Creating..."
                : "Create +"
              : updateLoading
              ? "Updating..."
              : "Update +"}
          </Button>
        </Form>
      </div>
    </Drawer>
  );
};

export default CategoryDrawer;
