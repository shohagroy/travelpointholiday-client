"use client";

import React from "react";
import Logo from "../../assets/tplogo.png";
import { Flex } from "antd";
import Image from "next/image";
import Link from "next/link";

import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="bg-[#013A95] border-b-2 text-white">
      <div className="max-w-7xl mx-auto ">
        <Flex
          style={{ width: "100%", padding: "10px 5px" }}
          gap="middle"
          justify="space-between"
          align="center"
        >
          <Link href={"/"}>
            <Image
              className="w-[100px] lg:w-[200px] h-full"
              src={Logo}
              alt="Logo."
              height={100}
              width={200}
              // layout="responsive"
            />
          </Link>

          <div>
            <Navigation />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Header;
