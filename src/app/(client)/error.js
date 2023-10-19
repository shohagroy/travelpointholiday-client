"use client";

import { Button, Row } from "antd";
import Link from "next/link";
import { Result } from "postcss";

const ErrorPage = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link href={"/"}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default ErrorPage;
