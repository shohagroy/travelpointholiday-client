"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  ProfileOutlined, //<<PieChartFilled /> />
  DashboardFilled,
  UserSwitchOutlined,
  UsergroupDeleteOutlined,
  SettingFilled,
  ToolFilled,
  PieChartFilled,
  SlackOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Logo from "../../assets/tplogo.png";
import Image from "next/image";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    {
      label: "Dashboard",
      key: "Dashboard",
      icon: <DashboardFilled />,
    },
    {
      label: "Attractions",
      key: "Attractions",
      icon: <SlackOutlined />,
      children: [
        {
          label: (
            <Link href={`/admin/manage-attractions`}>Manage Attractions</Link>
          ),
          key: `/admin/manage-attractions`,
        },

        {
          label: (
            <Link href={`/admin/manage-attractions/booking-list`}>
              Booking List
            </Link>
          ),
          key: `/admin/booking-list`,
        },
        {
          label: (
            <Link href={`/admin/manage-attractions/cancel-list`}>
              Cancel List
            </Link>
          ),
          key: `/admin/cancel-list`,
        },
        {
          label: (
            <Link href={`/admin/manage-attractions/refund-list`}>
              Refund List
            </Link>
          ),
          key: `/admin/refund-list`,
        },
      ],
    },

    {
      label: "Manage Admins",
      key: "Manage Admins",
      icon: <UserSwitchOutlined />,
    },
    {
      label: <Link href={`/admin/manage-users`}>Manage Users</Link>,
      key: "Manage Users",
      icon: <UsergroupDeleteOutlined />,
    },
    {
      label: "Software Setting",
      key: "Software Setting",
      icon: <SettingFilled />,
      children: [
        {
          label: <Link href={`/admin/manage-category`}>Manage Category</Link>,
          key: `/admin/manage-category`,
        },
        {
          label: <Link href={`/admin/manage-country`}>Manage Country</Link>,
          key: `/admin/manage-country`,
        },
        {
          label: <Link href={`/admin/manage-city`}>Manage City</Link>,
          key: `/admin/manage-city`,
        },
      ],
    },
    {
      label: "Website Setting",
      key: "Website Setting",
      icon: <ToolFilled />,
    },
    {
      label: "Reports",
      key: "Reports",
      icon: <PieChartFilled />,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/admin`}>Account Profile</Link>,
          key: `/profile`,
        },
        {
          label: <Link href={`/admin`}>Change Password</Link>,
          key: `/change-password`,
        },
      ],
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={300}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        // backgroundColor: "#003B95",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: ".5rem",
          padding: "10px 0px",
        }}
      >
        <Image
          height={100}
          width={100}
          layout="responsive"
          src={Logo}
          alt="Logo"
          className="px-8"
        />
      </div>
      <Menu
        theme="dark"
        // style={{
        //   backgroundColor: "#003B95",
        //   color: "white",
        // }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
