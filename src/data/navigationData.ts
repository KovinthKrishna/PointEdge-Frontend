import { IconType } from "react-icons";
import { FaTruckFast } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi2";
import { IoIosPeople } from "react-icons/io";
import { IoGiftSharp } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";

export interface NavigationData {
  label: string;
  url: string;
  icon: IconType;
}

const navigationData: NavigationData[] = [
  {
    label: "Dashboard",
    url: "",
    icon: HiOutlineHome,
  },
  {
    label: "Analysis",
    url: "analysis",
    icon: TbReportAnalytics,
  },
  {
    label: "Inventory",
    url: "inventory",
    icon: FaTruckFast,
  },
  {
    label: "Discounts",
    url: "discounts",
    icon: IoGiftSharp,
  },
  {
    label: "Employees",
    url: "employees",
    icon: IoIosPeople,
  },
];

export default navigationData;
