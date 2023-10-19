import { Button, Row } from "antd";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <div>
        <h1>404!!! Page Not Found!</h1>
        <Link href={"/"}>
          <Button type="link">Back to Home</Button>
        </Link>
      </div>
    </Row>
  );
};

export default NotFoundPage;
