// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // 👈 Now matches your CSS background!
    primary: {
      main: "#00C853",       // Your vibrant eco green
      light: "#64FF8A",
      dark: "#009624",
    },
    secondary: {
      main: "#00BFA5",        // Teal accent
      light: "#64FFF2",
      dark: "#008C79",
    },
    background: {
      default: "#f4f7fb",     // 👈 Exactly your CSS body background
      paper: "#ffffff",       // Clean white cards
    },
    text: {
      primary: "#1a1a1a",     // Near-black for readability
      secondary: "#555555",
      disabled: "#999999",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h6: {
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "unset", // Remove MUI's subtle noise
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)", // Soft shadow
          border: "1px solid rgba(0, 0, 0, 0.03)",     // Optional subtle border
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 20px rgba(0, 150, 36, 0.08)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 500,
        },
        containedPrimary: {
          boxShadow: "0 2px 6px rgba(0, 200, 83, 0.3)",
          "&:hover": {
            boxShadow: "0 4px 10px rgba(0, 200, 83, 0.4)",
          },
        },
      },
    },
  },
});

export default theme;