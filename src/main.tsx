import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import EmployeeAttendancePage from "./pages/EmployeeAttendancePage.tsx";
import SalesTrackingPage from "./pages/SalesTrackingPage.tsx";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router"; // Assuming you have a router setup

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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>
);

    </ChakraProvider>
  </StrictMode>
);