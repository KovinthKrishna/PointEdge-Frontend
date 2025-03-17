import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import EmployeeAttendancePage from "./pages/EmployeeAttendancePage.tsx";
import SalesTrackingPage from "./pages/SalesTrackingPage.tsx";

// Create a custom theme
const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f6ff',
      100: '#b3e0ff',
      500: '#0077B6',
      600: '#003049',
      700: '#002233',
    },
  },
});

// Render your routes with both pages
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<EmployeeAttendancePage />} />
          <Route path="/employee-attendance" element={<EmployeeAttendancePage />} />
          <Route path="/sales-tracking" element={<SalesTrackingPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </StrictMode>
);