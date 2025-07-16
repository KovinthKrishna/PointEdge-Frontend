import { useState } from "react";
import { Box, Tabs, TabList, Tab, Button, Flex } from "@chakra-ui/react";
import EmployeeDashboardPage from "../../components/Admin/EmployeesPage/EmployeeDashboardPage";
import EmployeeAttendancePage from "../../components/Admin/EmployeesPage/EmployeeAttendancePage";
import TopPerformersPage from "../../components/Admin/EmployeesPage/TopPerformersPage";
import ShiftReport1Page from "../../components/Admin/EmployeesPage/ShiftReport1Page";

const EmployeesPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <EmployeeDashboardPage />;
      case 1:
        return <EmployeeAttendancePage />;
      case 2:
        return <TopPerformersPage />;
      case 3:
        return <ShiftReport1Page />;
      default:
        return null;
    }
  };

  return (
    <Box bg="white" w="100%">
      <Tabs
        variant="unstyled"
        index={activeTab}
        onChange={setActiveTab}
        flex="1"
        display="flex"
        flexDirection="column"
      >
        <Flex alignItems="center" width="100%" position="relative">
          <TabList
            bg="white"
            borderBottom="12px solid #003049"
            borderRight="12px solid #003049"
            display="flex"
            width="100%"
            paddingTop="16px"
            height="5.8rem"
            sx={{
              "& > button": {
                fontWeight: "500",
                fontSize: "16px",
                py: 4,
                px: 8,
                borderBottom: "none",
                flex: 1,
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                textAlign: "center",
                maxWidth: "180px",
                backgroundColor: "white",
                color: "black",
                position: "relative",
                zIndex: 1,
              },
              "& > button[aria-selected=true]": {
                bg: "#003049",
                color: "white",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                zIndex: 2,
              },
              "& > button[aria-selected=false]": {
                bg: "white",
                color: "black",
              },
            }}
          >
            <Tab>Dashboard</Tab>
            <Tab>Employee Attendance</Tab>
            <Tab>Top Performers</Tab>
            <Tab>Shift Reports</Tab>
          </TabList>
          <Button
            bg="#003049"
            color="white"
            position="absolute"
            right={8}
            top={"50%"}
            transform="translateY(-50%)"
            zIndex={100}
            minW="100px"
            boxShadow="md"
            _hover={{ bg: "#00253a" }}
          >
            Register
          </Button>
        </Flex>
        <Box p={4}>{renderTabContent()}</Box>
      </Tabs>
    </Box>
  );
};

export default EmployeesPage;