"use client";

import BreadCrumb from "@/components/ui/Breadcrumb";
import FilterOptions from "@/components/ui/FilterOptions";
import PaginationOprions from "@/components/ui/PaginationOprions";
import SortByFilds from "@/components/ui/SortByFilds";
import { Button, Card, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const AttractionLayout = ({ children }) => {
  const [sortBy, setSortBy] = useState("top-pick");
  const breadItems = [
    {
      title: "Attractions",
    },
  ];
  return (
    <div>
      <BreadCrumb breadItems={breadItems} />
      <section className="max-w-7xl mx-auto">
        <div>
          <Row gutter={20} className="relative">
            <Col className="my-3 sticky top-0" span={8}>
              {/* <FilterOptions /> */}
              <Card className="shadow-md">
                <div>
                  <Input
                    size="large"
                    placeholder="large size"
                    prefix={<SearchOutlined />}
                  />
                  <Button size="large" type="primary" className="w-full mt-2">
                    Search
                  </Button>
                </div>
              </Card>
              <div className="sticky top-4" style={{ zIndex: 1 }}>
                <FilterOptions />
              </div>
            </Col>

            <Col className="my-3" span={16}>
              <SortByFilds value={sortBy} setFn={setSortBy} />
              {children}
              <PaginationOprions />
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default AttractionLayout;
