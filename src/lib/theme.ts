import { createTheme } from "@mui/material/styles";

/**
 * A small, deliberate palette: deep "night sky" navy for trust/brand,
 * and warm amber as the single accent (used sparingly for price/CTA
 * emphasis - think runway lights). Kept intentionally simple per the
 * brief rather than a large design system.
 */
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0B3D62",
      dark: "#072742",
      light: "#3D6B8C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E8A33D",
      dark: "#C7831F",
      contrastText: "#0B1F2E",
    },
    background: {
      default: "#F6F8FA",
      paper: "#FFFFFF",
    },
    success: {
      main: "#2E7D32",
    },
    error: {
      main: "#C62828",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: "none" },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0B3D62",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(11, 31, 46, 0.12)",
        },
      },
    },
  },
});

export default theme;
