import React from 'react';
import { Outlet } from "react-router-dom";
import { Box, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const EmployeesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine which tab should be active based on the current path
  const getActiveTabIndex = () => {
    const path = location.pathname;
    if (path.includes("/attendance")) return 1;
    if (path.includes("/top-performers")) return 2;
    if (path.includes("/shift-reports")) return 3;
    return 0;
  };
  
  // Handle tab changes by navigating to the appropriate route
  const handleTabChange = (index: number) => {
    const routes = [
      "/admin/employees",
      "/admin/employees/attendance",
      "/admin/employees/top-performers",
      "/admin/employees/shift-reports",
    ];
    navigate(routes[index]);
  };
  
  return (
    <Box bg="white" w="100%">
      {/* Tabs Navigation */}
      <Tabs 
        variant="unstyled" 
        onChange={handleTabChange} 
        defaultIndex={getActiveTabIndex()}
        flex="1"
        display="flex"
        flexDirection="column"
      >
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
        
        {/* Content area for child routes */}
        <Box p={4}>
          <Outlet />
        </Box>
      </Tabs>
    </Box>
  );
};

export default EmployeesPage;