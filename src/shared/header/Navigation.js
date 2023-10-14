"use client";

import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Flex,
  Space,
  Drawer,
  Menu,
} from "antd";
import Link from "next/link";
import {
  UserOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  CloseOutlined,
  BarsOutlined,
  PayCircleOutlined,
  SlackOutlined,
  MessageOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Logo from "../../assets/tplogo.png";
import CartDrawer from "@/components/ui/CartDrawer";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage } from "@/utils/local-storage";
import { removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const [cartOpen, setCartOprn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  let tokenInfo = {};

  const token = getFromLocalStorage("accessToken");

  if (token) {
    tokenInfo = decodedToken(token);
  }
  const { email } = tokenInfo || {};

  const logOutHandelar = () => {
    removeUserInfo("accessToken");
    router.push("/login");
  };

  const menu = [
    {
      label: "Home",
      route: "/",
    },
    {
      label: "Attractions",
      route: "/attractions",
    },
    {
      label: "About us",
      route: "/about-us",
    },
    {
      label: "Contact us",
      route: "/contact-us",
    },
  ];

  const items = email
    ? [
        {
          key: "1",
          label: (
            <Link href={"/manage-account"}>
              <Button
                icon={<UserOutlined />}
                type="link"
                style={{ width: "100%", margin: "0px 0", textAlign: "left" }}
              >
                Manage Account
              </Button>
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link href={"/manage-account"}>
              <Button
                icon={<SlackOutlined />}
                type="link"
                style={{ width: "100%", margin: "0px 0", textAlign: "left" }}
              >
                Trips
              </Button>
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link href={"/manage-account"}>
              <Button
                icon={<PayCircleOutlined />}
                type="link"
                style={{ width: "100%", margin: "0px 0", textAlign: "left" }}
              >
                Rewards & Wallet
              </Button>
            </Link>
          ),
        },
        {
          key: "4",
          label: (
            <Link href={"/manage-account"}>
              <Button
                icon={<MessageOutlined />}
                type="link"
                style={{ width: "100%", margin: "0px 0", textAlign: "left" }}
              >
                Reviews
              </Button>
            </Link>
          ),
        },

        {
          key: "5",
          label: (
            <Button
              onClick={logOutHandelar}
              type="link"
              danger
              icon={<LogoutOutlined />}
              style={{ width: "100%", margin: "0px 0", textAlign: "left" }}
            >
              Log Out
            </Button>
          ),
        },
      ]
    : [
        {
          key: "5",
          label: (
            <Link href="/login">
              <Button
                icon={<LoginOutlined />}
                type="link"
                style={{ width: "100%", margin: "0px 0" }}
              >
                Log In
              </Button>
            </Link>
          ),
        },
      ];

  const smMenuItems = menu?.map((item) => {
    return {
      key: item.label,
      label: (
        <Link style={{ width: "100%", textAlign: "center" }} href={item.route}>
          <Button type="link">{item.label}</Button>
        </Link>
      ),
    };
  });

  return (
    <div>
      <div className="hidden lg:block">
        <Flex gap="middle" align="center">
          {menu.map((item) => (
            <Link key={item.label} href={item.route}>
              <Button className=" text-white font-bold" type="link">
                {item.label}
              </Button>
            </Link>
          ))}

          <div style={{ marginLeft: "20px" }}>
            <Space wrap size={16}>
              {email && (
                <div>
                  <Badge count={99}>
                    <Avatar
                      className="cursor-pointer"
                      onClick={() => setCartOprn(!cartOpen)}
                      size="large"
                      icon={<ShoppingCartOutlined />}
                    />
                  </Badge>
                  <Badge count={99}>
                    <Avatar size="large" icon={<BellOutlined />} />
                  </Badge>
                </div>
              )}

              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="bottomRight"
                arrow
              >
                <Avatar
                  style={{ cursor: "pointer" }}
                  onClick={(e) => e.preventDefault()}
                  size="large"
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </Space>
          </div>
        </Flex>
      </div>

      <div className="block lg:hidden ">
        {menuOpen ? (
          <Button
            onClick={() => setMenuOpen(!menuOpen)}
            type="primary"
            danger
            size="large"
          >
            <CloseOutlined />
          </Button>
        ) : (
          <Button
            onClick={() => setMenuOpen(!menuOpen)}
            type="primary"
            size="large"
          >
            <BarsOutlined />
          </Button>
        )}
      </div>

      <Drawer
        title={
          <Flex justify="space-between" align="center">
            <Link href={"/"}>
              <Image src={Logo} alt="Logo." height={50} width={150} />
            </Link>

            <Button
              onClick={() => setMenuOpen(!menuOpen)}
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
        width={"100vw"}
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        getContainer={false}
      >
        <Menu
          mode="inline"
          style={{ textAlign: "center" }}
          items={smMenuItems}
        />
      </Drawer>

      <CartDrawer open={cartOpen} setOpen={setCartOprn} />
    </div>
  );
};

export default Navigation;
