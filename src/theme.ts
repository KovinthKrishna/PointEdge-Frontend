import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Roboto, sans-serif",
  },
  colors: {
    black: "#180E19",
    grey: "#B8B8B8",
    lightGrey: "#F4F4F4",
    white: "#FFFFFF",
    darkBlue: "#003049",
    blue: "#00669B",
    lightBlue: "#008ED8",
    green: "#36CD1D",
    red: "#FF0000",
    skyBlue: "#F4FBFF",
    background: "#FAFAFA",
  },
  styles: {
    global: {
      body: {
        bgColor: "background",
        color: "black",
      },
    },
  },
});

export default theme;
