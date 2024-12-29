import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminTitlebar from "../components/AdminTitlebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"title" "main"`,
        lg: `"navbar title" "navbar main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "20% 1fr",
      }}
    >
      <GridItem area="title">
        <AdminTitlebar />
      </GridItem>
      <Show above="lg">
        <GridItem area="navbar">
          <Navbar />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default AdminLayout;
