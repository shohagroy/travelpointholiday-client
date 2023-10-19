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
  CloseOutlined,
  BarsOutlined,
  PayCircleOutlined,
  SlackOutlined,
  MessageOutlined,
  LogoutOutlined,
  LoginOutlined,
  DashboardFilled,
} from "@ant-design/icons";
import Image from "next/image";
import Logo from "../../assets/tplogo.png";
import CartDrawer from "@/components/ui/CartDrawer";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage } from "@/utils/local-storage";
import { removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { userRole } from "@/constans/userRole";
import { useGetUserCartsQuery } from "@/redux/features/cart/cartApi";

const Navigation = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const token = getFromLocalStorage("accessToken");
  const tokenInfo = token ? decodedToken(token) : {};

  const { email, role, avatar } = tokenInfo;

  const logOutHandler = () => {
    removeUserInfo("accessToken");
    router.push("/login");
  };

  const { data: cartData } = useGetUserCartsQuery();

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
            <Link href="/manage-account">
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
            <Link href="/trip-management">
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
            <Link href="/manage-account">
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
            <Link href="/reviews">
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
              onClick={logOutHandler}
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

  if (email && (role === userRole.ADMIN || role === userRole.SUPER_ADMIN)) {
    items.unshift({
      key: "6",
      label: (
        <Link href="/admin">
          <Button
            icon={<DashboardFilled />}
            type="link"
            style={{ textAlign: "left", width: "100%", margin: "0px 0" }}
          >
            Dashboard
          </Button>
        </Link>
      ),
    });
  }

  const smMenuItems = menu?.map((item) => {
    return {
      key: item.label,
      label: (
        <Link style={{ width: "100%", textAlign: "center" }} href={item.route}>
          <Button
            onClick={() => setMenuOpen(false)}
            className="text-gray-400  "
            type="link"
          >
            {item.label}
          </Button>
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
              <Button className="text-white font-bold" type="link">
                {item.label}
              </Button>
            </Link>
          ))}

          {/* <HeaderIcon /> */}

          <div style={{ marginLeft: "20px" }}>
            <Space wrap size={16}>
              {email ? (
                <div>
                  <Badge count={cartData?.data?.length}>
                    <Avatar
                      className="cursor-pointer mx-1"
                      onClick={() => setCartOpen(!cartOpen)}
                      size="large"
                      icon={<ShoppingCartOutlined />}
                    />
                  </Badge>
                </div>
              ) : (
                ""
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
                  src={avatar}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </Space>
          </div>
        </Flex>
      </div>

      <div className="block lg:hidden">
        <div className="flex justify-center items-center">
          <div style={{ marginLeft: "20px" }}>
            <Space wrap size={16}>
              {email ? (
                <div>
                  <Badge count={cartData?.data?.length}>
                    <Avatar
                      className="cursor-pointer "
                      onClick={() => setCartOpen(!cartOpen)}
                      size={"small"}
                      icon={<ShoppingCartOutlined />}
                    />
                  </Badge>
                </div>
              ) : (
                ""
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
                  size="small"
                  src={avatar}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </Space>
          </div>

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
              type="link"
              size="large"
              className="text-white"
            >
              <BarsOutlined />
            </Button>
          )}
        </div>
      </div>

      <Drawer
        className="bg-[#013A95]"
        title={
          <Flex justify="space-between" align="center">
            <Link href="/">
              <Image
                className="w-[100px] h-full"
                src={Logo}
                alt="Logo"
                height={50}
                width={150}
                // layout="responsive"
              />
            </Link>

            <Button
              onClick={() => setMenuOpen(!menuOpen)}
              type="link"
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
          className="bg-[#013A95] text-white"
          mode="inline"
          style={{ textAlign: "center", borderTop: "1px solid white" }}
          items={smMenuItems}
        />
      </Drawer>

      {email ? (
        <CartDrawer
          data={cartData?.data}
          open={cartOpen}
          setOpen={setCartOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Navigation;
