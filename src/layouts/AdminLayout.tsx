import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminTitlebar from "../components/Admin/AdminTitlebar";
import Sidebar from "../components/Admin/Sidebar";

const AdminLayout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"title" "main"`,
        lg: `"navbar title" "navbar main"`,
        // fhgfkjnkjkn
      }}
      templateColumns={{
        base: "1fr",
        lg: "20% 1fr",
      }}
      templateRows="auto 1fr"
    >
      <GridItem
        area="title"
        position="sticky"
        top={0}
        bgColor="background"
        zIndex={1050}
      >
        <AdminTitlebar />
      </GridItem>
      <Show above="lg">
        <GridItem area="navbar">
          <Sidebar />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default AdminLayout;
