import { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  Button,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import EmployeeDashboardPage from "../../components/Admin/EmployeesPage/EmployeeDashboardPage";
import EmployeeAttendancePage from "../../components/Admin/EmployeesPage/EmployeeAttendancePage";
import TopPerformersPage from "../../components/Admin/EmployeesPage/TopPerformersPage";
import ShiftReport1Page from "../../components/Admin/EmployeesPage/ShiftReport1Page";
import RegistrationForm from "../../components/RegistrationForm";

const EmployeesPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Responsive values using Chakra UI
  const tabFontSize = useBreakpointValue({
    base: "12px",
    sm: "14px",
    md: "16px",
  });
  const tabPadding = useBreakpointValue({ base: 1, sm: 2, md: 3 });
  const tabPaddingX = useBreakpointValue({ base: 2, sm: 3, md: 5 });
  const buttonRight = useBreakpointValue({ base: 2, sm: 4, md: 8 });
  const buttonMinW = useBreakpointValue({
    base: "70px",
    sm: "85px",
    md: "100px",
  });
  const buttonText = useBreakpointValue({
    base: "Reg",
    sm: "Register",
    md: "Register",
  });
  const contentPadding = useBreakpointValue({ base: 2, sm: 3, md: 4 });
  const maxTabWidth = useBreakpointValue({
    base: "80px",
    sm: "110px",
    md: "140px",
  });
  const minTabWidth = useBreakpointValue({
    base: "65px",
    sm: "85px",
    md: "100px",
  });
  const borderWidth = useBreakpointValue({
    base: "8px",
    sm: "10px",
    md: "12px",
  });
  const headerHeight = useBreakpointValue({
    base: "4.25rem",
    sm: "5rem",
    md: "5.5rem",
  });

  // Responsive tab labels
  const tabLabels = useBreakpointValue({
    base: ["Dashboard", "Attendance", "Performers", "Reports"],
    sm: ["Dashboard", "Attendance", "Top Performers", "Shift Reports"],
    md: ["Dashboard", "Attendance", "Top Performers", "Shift Reports"],
  }) || ["Dashboard", "Attendance", "Top Performers", "Shift Reports"];

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

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  const handleRegisterClick = () => {
    openRegistrationModal();
  };

  return (
    <Box
      bg="white"
      w="100%"
      minH="100vh"
      className="employees-page-container"
      style={{ opacity: 1, visibility: "visible" }}
    >
      <Tabs
        variant="unstyled"
        index={activeTab}
        onChange={setActiveTab}
        flex="1"
        display="flex"
        flexDirection="column"
        className="employees-tabs"
      >
        <Flex
          alignItems="center"
          width="100%"
          position="relative"
          className="tab-header"
        >
          <TabList
            bg="white"
            borderBottom={`${borderWidth} solid #003049`}
            borderRight={`${borderWidth} solid #003049`}
            display="flex"
            width="100%"
            paddingTop="16px"
            height={headerHeight}
            className="tab-list-container"
            overflowX={{ base: "auto", md: "visible" }}
            overflowY="hidden"
            sx={{
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "& > button": {
                fontWeight: "500",
                fontSize: tabFontSize,
                py: tabPadding,
                px: tabPaddingX,
                borderBottom: "none",
                flex: { base: "0 0 auto", md: 1 },
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                textAlign: "center",
                minWidth: minTabWidth,
                maxWidth: maxTabWidth,
                backgroundColor: "white",
                color: "black",
                position: "relative",
                zIndex: 1,
                whiteSpace: "nowrap",
              },
              "& > button[aria-selected=true]": {
                bg: "#003049",
                color: "white",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                zIndex: 2,
              },
              "& > button[aria-selected=false]": {
                bg: "white",
                color: "black",
              },
            }}
          >
            <Tab className="tab-item">{tabLabels[0]}</Tab>
            <Tab className="tab-item">{tabLabels[1]}</Tab>
            <Tab className="tab-item">{tabLabels[2]}</Tab>
            <Tab className="tab-item">{tabLabels[3]}</Tab>
          </TabList>

          <Button
            bg="#003049"
            color="white"
            position="absolute"
            right={buttonRight}
            top="50%"
            transform="translateY(-50%)"
            zIndex={100}
            minW={buttonMinW}
            size={useBreakpointValue({ base: "sm", md: "md" })}
            boxShadow="md"
            borderRadius="8px"
            fontWeight="600"
            _hover={{
              bg: "#00253a",
            }}
            onClick={handleRegisterClick}
            fontSize={useBreakpointValue({
              base: "12px",
              sm: "14px",
              md: "16px",
            })}
            className="register-button"
          >
            {buttonText}
          </Button>
        </Flex>

        <Box
          p={contentPadding}
          flex="1"
          className="tab-content"
          minH={`calc(100vh - ${headerHeight})`}
          overflow="auto"
        >
          {renderTabContent()}
        </Box>
      </Tabs>
      {isRegistrationOpen && (
        <RegistrationForm
          isOpen={isRegistrationOpen}
          onClose={closeRegistrationModal}
        />
      )}
    </Box>
  );
};

export default EmployeesPage;
