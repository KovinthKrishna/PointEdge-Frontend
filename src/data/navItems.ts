import { IconType } from "react-icons";
import { FaTruckFast } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi2";
import { IoIosPeople } from "react-icons/io";
import { IoGiftSharp } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";

interface NavItem {
  label: string;
  url: string;
  icon: IconType;
  isSearchable: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    url: "",
    icon: HiOutlineHome,
    isSearchable: true,
  },
  {
    label: "Analysis",
    url: "analysis",
    icon: TbReportAnalytics,
    isSearchable: false,
  },
  {
    label: "Inventory",
    url: "inventory",
    icon: FaTruckFast,
    isSearchable: true,
  },
  {
    label: "Discounts",
    url: "discounts",
    icon: IoGiftSharp,
    isSearchable: false,
  },
  {
    label: "Employees",
    url: "employees",
    icon: IoIosPeople,
    isSearchable: false,
  },
  {
    label: "Refund Request",
    url: "refundRequest",
    icon: RiRefund2Line,
    isSearchable: false,
  },
];

export default navItems;