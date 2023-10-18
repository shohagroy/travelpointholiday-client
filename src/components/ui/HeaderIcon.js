// import React, { useState } from "react";
// import CartDrawer from "./CartDrawer";
// import { Avatar, Badge, Dropdown, Space } from "antd";

// const HeaderIcon = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div>
//        <div style={{ marginLeft: "20px" }}>
//             <Space wrap size={16}>
//               {email ? (
//                 <div>
//                   <Badge count={99}>
//                     <Avatar
//                       className="cursor-pointer"
//                       onClick={() => setCartOpen(!cartOpen)}
//                       size="large"
//                       icon={<ShoppingCartOutlined />}
//                     />
//                   </Badge>
//                   <Badge count={99}>
//                     <Avatar size="large" icon={<BellOutlined />} />
//                   </Badge>
//                 </div>
//               ) : (
//                 <div>
//                   <Badge count={99}>
//                     <Avatar
//                       className="cursor-pointer"
//                       onClick={() => setCartOpen(!cartOpen)}
//                       size="large"
//                       icon={<ShoppingCartOutlined />}
//                     />
//                   </Badge>
//                   <Badge count={99}>
//                     <Avatar size="large" icon={<BellOutlined />} />
//                   </Badge>
//                 </div>
//               )}

//               <Dropdown
//                 menu={{
//                   items,
//                 }}
//                 trigger={["click"]}
//                 placement="bottomRight"
//                 arrow
//               >
//                 <Avatar
//                   style={{ cursor: "pointer" }}
//                   onClick={(e) => e.preventDefault()}
//                   size="large"
//                   src={avatar}
//                   icon={<UserOutlined />}
//                 />
//               </Dropdown>
//             </Space>
//           </div>
//       <CartDrawer open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default HeaderIcon;
