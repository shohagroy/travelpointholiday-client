"use client";

import React from "react";
import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/tplogo.png";

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return (
    <AntdFooter className="bg-[#013A95] text-white ">
      <div className="bg-red-0 max-w-7xl mx-auto">
        <Row justify="space-between" align="top">
          <Col xs={24} lg={8}>
            <Link href={"/"}>
              <Image
                className="border border-white"
                src={Logo}
                alt="Logo."
                height={50}
                width={200}
              />
            </Link>
          </Col>
          <Col xs={24} lg={16}>
            <Row justify="center" gutter={[16, 0]}>
              <Col xs={12} sm={6}>
                <h3 className="text-gray-50 uppercase">Product</h3>
                <ul className="space-y-1">
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Features
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Integrations
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      FAQ
                    </a>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6}>
                <h3 className="text-gray-50 uppercase">Company</h3>
                <ul className="space-y-1">
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6}>
                <h3 className="uppercase">Developers</h3>
                <ul className="space-y-1 text-white">
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Public API
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Guides
                    </a>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6}>
                <div className="uppercase text-gray-50">Social media</div>
                <div className="flex space-x-3">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    title="Facebook"
                    className="flex items-center p-1"
                  >
                    <FacebookOutlined style={{ fontSize: "20px" }} />
                  </a>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    title="Twitter"
                    className="flex items-center p-1"
                  >
                    <TwitterOutlined style={{ fontSize: "20px" }} />
                  </a>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    title="Instagram"
                    className="flex items-center p-1"
                  >
                    <InstagramOutlined style={{ fontSize: "20px" }} />
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="py-6 text-sm text-center ">
        <p className="text-gray-200 border">
          © 1968 Company Co. All rights reserved.
        </p>
      </div>
    </AntdFooter>
  );
};

export default Footer;
