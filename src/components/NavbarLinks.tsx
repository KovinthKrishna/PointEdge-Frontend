import { VStack } from "@chakra-ui/react";
import { FaTruckFast } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi2";
import { IoIosPeople } from "react-icons/io";
import { IoGiftSharp } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import NavbarButton from "./NavbarButton";

const NavbarLinks = () => {
  return (
    <VStack width="100%" padding={2.5} spacing={10}>
      <NavbarButton icon={HiOutlineHome} label="Home" active={true} />
      <NavbarButton icon={TbReportAnalytics} label="Analysis" active={false} />
      <NavbarButton icon={FaTruckFast} label="Inventory" active={false} />
      <NavbarButton icon={IoGiftSharp} label="Discounts" active={false} />
      <NavbarButton icon={IoIosPeople} label="Employees" active={false} />
      <NavbarButton
        icon={LuSettings}
        label="Account & Settings"
        active={false}
      />
    </VStack>
  );
};

export default NavbarLinks;
