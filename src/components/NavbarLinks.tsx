import { VStack } from "@chakra-ui/react";
import { FaTruckFast } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi2";
import { IoIosPeople } from "react-icons/io";
import { IoGiftSharp } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import NavbarButton from "./NavbarButton";

const NavbarLinks = () => {
  return (
    <VStack width="full" spacing={{ base: 2, lg: 5 }}>
      <NavbarButton icon={HiOutlineHome} label="Home" url="" />
      <NavbarButton icon={TbReportAnalytics} label="Analysis" url="analysis" />
      <NavbarButton icon={FaTruckFast} label="Inventory" url="inventory" />
      <NavbarButton icon={IoGiftSharp} label="Discounts" url="discounts" />
      <NavbarButton icon={IoIosPeople} label="Employees" url="employees" />
    </VStack>
  );
};

export default NavbarLinks;
