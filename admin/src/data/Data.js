import {
  BiSolidDashboard,
  BiBox,
  BiShoppingBag,
  BiArchive,
  BiLockAlt,
  BiSolidCategory,
} from "react-icons/bi";
import CategoryTable from "../Pages/Categories/CategoryTable";
import Dashboard from "../Pages/Dashboard";
import { FaTags } from "react-icons/fa6";

export const sidebarData = [
  // {
  //   id: 0,
  //   title: "Dashboard",
  //   icon: BiSolidDashboard,
  //   path: "/",
  // },
  {
    id: 1,
    title: "Categories",
    icon: BiSolidCategory,
    path: "/categories/list",
  },
  {
    id: 2,
    title: "Attributes",
    icon: BiArchive,
    path: "/attributes/list",
  },
  // {
  //   id: 3,
  //   title: "Tags",
  //   icon: FaTags,
  //   path: "/tags",
  // },
  {
    id: 4,
    title: "Products",
    icon: BiShoppingBag,
    path: "/products/list",
  },
  // { id: 1, title: "Dashboard", icon: BiSolidDashboard, path: "/", component: Dashboard,isProtected: true,},
  // { id: 3, title: "Forgot Password", icon: BiLockAlt, path: "/forgot-password", component: ForgotPassword, isProtected: false,},
];
