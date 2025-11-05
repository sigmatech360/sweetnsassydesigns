
import { BiSolidDashboard,  BiBox, BiShoppingBag, BiArchive, BiLockAlt } from "react-icons/bi";
import ForgotPassword from "../Pages/ForgotPassword"
import Categories from "../Pages/Categories"


export const sidebarData = [
  {
    items: [
      // { id: 1, title: "Dashboard", icon: BiSolidDashboard, path: "/dashboard", component: Dashboard,isProtected: true,},
      { id: 2, title: "Categories", icon: BiArchive, path: "/categories", component: Categories, isProtected: true,},
      { id: 3, title: "Forgot Password", icon: BiLockAlt, path: "/forgot-password", component: ForgotPassword, isProtected: false,},
    ],
  },
];
