import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#FFDE03",
      main: "#FFDE03",
      dark: "#FFDE03",
      contrastText: "#000",
    },
    secondary: {
      light: "#0336FF",
      main: "#0336FF",
      contrastText: "#fff",
    },
    background: {
      default: "#121212",
    },
  },
});

export default theme;
