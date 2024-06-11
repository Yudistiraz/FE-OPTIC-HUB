"use client";

import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    display1: React.CSSProperties;
    display2: React.CSSProperties;
    display3: React.CSSProperties;
    display4: React.CSSProperties;
    display5: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    subtitle1Reg: React.CSSProperties;
    subtitle2Reg: React.CSSProperties;
    menuActive: React.CSSProperties;
    menuNormal: React.CSSProperties;
    textButton: React.CSSProperties;
    textButtonDanger: React.CSSProperties;
    textButtonLarge: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    labelBig: React.CSSProperties;
    labelSmall: React.CSSProperties;
    helperText: React.CSSProperties;
    customBadgeText: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    display1?: React.CSSProperties;
    display2?: React.CSSProperties;
    display3?: React.CSSProperties;
    display4?: React.CSSProperties;
    display5?: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    subtitle1Reg?: React.CSSProperties;
    subtitle2Reg?: React.CSSProperties;
    menuActive: React.CSSProperties;
    menuNormal: React.CSSProperties;
    textButton?: React.CSSProperties;
    textButtonDanger?: React.CSSProperties;
    textButtonLarge?: React.CSSProperties;
    caption1?: React.CSSProperties;
    caption2?: React.CSSProperties;
    labelBig?: React.CSSProperties;
    labelSmall?: React.CSSProperties;
    helperText?: React.CSSProperties;
    customBadgeText?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display1: true;
    display2: true;
    display3: true;
    display4: true;
    display5: true;
    title1: true;
    title2: true;
    subtitle1Reg: true;
    subtitle2Reg: true;
    menuActive: true;
    menuNormal: true;
    textButton: true;
    textButtonDanger: true;
    textButtonLarge: true;
    caption1: true;
    caption2: true;
    labelBig: true;
    labelSmall: true;
    helperText: true;
    customBadgeText: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    redButton: true;
  }
}

declare module "@mui/material/Skeleton" {
  interface SkeletonPropsVariantOverrides {
    textField: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    secondary: true;
    primary: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    blue: true;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640, // default was 600
      md: 768, // default was 900
      lg: 1024, // default was 1200
      xl: 1440, // default was 1536
    },
  },
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: "blue" },
          style: {
            backgroundColor: "#457DFF",
          },
        },
      ],
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#252525",
          color: "#fff",
          fontSize: "26px",
        },
      },
    },
    MuiButton: {
      //Button's Global Style
      //-------------------------------
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "20px",
          letterSpacing: "2%",
          textTransform: "uppercase",
          borderRadius: "12px",
          fontFamily: "var(--font-nunito)",
        },
      },
      //Create New Variants for Buttons
      //-------------------------------
      variants: [
        {
          props: { variant: "primary" },
          style: {
            backgroundColor: "#457EFF !important",
            color: "#fff",
            width: "100%",
            height: "48px",
            boxShadow: "none",
            opacity: 1,
            transition: "0.3s",
            ":hover": {
              backgroundColor: "#6190FF !important",
              color: "#fff",
            },
            ":disabled": {
              backgroundColor: "#77A0FF !important",
              color: "#fff",
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            backgroundColor: "#fff",
            color: "#000000",
            width: "100%",
            height: "48px",
            boxShadow: "none",
            border: "2px solid #252525",
            transition: "0.3s",
            ":hover": {
              backgroundColor: "#CBCDCF",
              borderColor: "#AFB0B0 !important",
            },
            ":disabled": {
              backgroundColor: "#CBCDCF",
              borderColor: "#AFB0B0 !important",
              // borderColor: "#8A9097 !important",
              // backgroundColor: "#ABB1B7",
            },
          },
        },
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: "#F7F7F7",
            color: "black",
            width: "100%",
            height: "48px",
            boxShadow: "none",
            border: "1px solid #F7F7F7",
            transition: "0.3s",
            ":hover": {
              backgroundColor: "rgba(0, 59, 209, 0.1)",
              boxShadow: "none",
              border: "1px solid #F7F7F7",
            },
            ":disabled": {
              borderColor: "#A0A5AB",
              color: "black",
            },
          },
        },
        {
          props: { variant: "redButton" },
          style: {
            backgroundColor: "#FF4242 !important",
            color: "#fff",
            width: "100%",
            height: "48px",
            boxShadow: "none",
            opacity: 1,
            transition: "0.3s",
            ":hover": {
              backgroundColor: "#E43030 !important",
              color: "#fff",
            },
            ":disabled": {
              backgroundColor: "#E43030 !important",
              color: "#fff",
            },
          },
        },
      ],
    },
    MuiSkeleton: {
      variants: [
        {
          props: {
            variant: "textField",
          },
          style: {
            height: "53.125px",
            width: "100%",
            borderRadius: "0.5rem",
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: "36px",
          width: "fit-content",
        },
      },
      variants: [
        {
          props: {
            variant: "secondary",
          },
          style: {
            background: "#fff",
            border: "1px solid #252525",
            color: "#000",
          },
        },
        {
          props: {
            variant: "primary",
          },
          style: {
            background: "#252525",
            color: "#fff",
          },
        },
        {
          props: {
            variant: "filled",
          },
          style: {
            background: "rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Customize the root style of outlined TextField
          borderRadius: "0.5rem",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          zIndex: "1500 !important",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: {
          backgroundColor: "#a0a5ab",
        },
        track: {
          backgroundColor: "#dfcb14",
          border: "#dfcb14",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#FE0E0E",
        },
        root: {
          paddingTop: "1.25rem !important",
          "& .Mui-selected": {
            color: "#FE0E0E !important",
            fontWeight: "700 !important",
          },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          "& .MuiBreadcrumbs-ol": {
            gap: "0.5rem",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .Mui-disabled": {
            WebkitTextFillColor: "#000000 !important",
            backgroundColor: "#F3F6F9 !important",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Customize the root style of outlined TextField
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          borderRadius: "0.5rem",
          "& .Mui-disabled": {
            WebkitTextFillColor: "#000000 !important",
            backgroundColor: "#F3F6F9 !important",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#457EFF", // Primary color
      light: "#1A5FFF",
      dark: "#1A5FFF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FE0E0E", // Secondary color
      light: "#FF3636",
      dark: "#FF4444",
      contrastText: "#fff",
    },
    error: {
      main: "#cf1c0c",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    // Add more custom colors as needed
  },

  //Added New Variants and Edited Current Variants for Texts Variants
  //----------------------------------------------------------------------
  typography: {
    fontFamily: "var(--font-nunito)",
    display1: {
      fontSize: "40px",
      fontWeight: 700,
      lineHeight: "60px",
      color: "black",
    },
    display2: {
      fontSize: "36px",
      fontWeight: 700,
      lineHeight: "54px",
      color: "black",
    },
    display3: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: "48px",
      color: "black",
    },
    display4: {
      fontSize: "28px",
      fontWeight: 700,
      lineHeight: "42px",
      color: "black",
    },
    display5: {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "36px",
      color: "black",
    },
    h1: {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "36px",
      color: "black",
    },
    h2: {
      fontSize: "21px",
      fontWeight: 700,
      lineHeight: "32px",
      color: "black",
    },
    h3: {
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: "28px",
      color: "black",
    },
    title1: {
      fontSize: "21px",
      fontWeight: 800,
      lineHeight: "32px",
      color: "#252525",
      // fontStyle: 'italic',
    },
    title2: {
      fontSize: "18px",
      fontWeight: 800,
      lineHeight: "32px",
      color: "#3D3D3D",
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "24px",
      color: "black",
    },
    subtitle1Reg: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      color: "black",
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "20px",
      color: "black",
    },
    subtitle2Reg: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
      color: "black",
    },
    menuActive: {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "24px",
      color: "#FE0E0E",
    },
    menuNormal: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      color: "#A0A5AB",
    },
    textButton: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: 700,
      textDecoration: "underline",
      cursor: "pointer",
      color: "#252525",
    },
    textButtonDanger: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: 700,
      textDecoration: "underline",
      cursor: "pointer",
      color: "#cf1c0c",
    },
    textButtonLarge: {
      fontSize: "16px",
      lineHeight: "18px",
      fontWeight: 700,
      textDecoration: "underline",
      cursor: "pointer",
      color: "#252525",
    },
    body1: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400,
      color: "black",
    },
    body2: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: 400,
      color: "black",
    },
    caption1: {
      fontSize: "11px",
      lineHeight: "20px",
      fontWeight: 400,
      color: "black",
    },
    caption2: {
      fontSize: "10px",
      lineHeight: "18px",
      fontWeight: 400,
      color: "black",
    },
    labelBig: {
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "18px",
      letterSpacing: "6%",
      color: "black",
    },
    labelSmall: {
      fontSize: "11px",
      fontWeight: 700,
      lineHeight: "18px",
      letterSpacing: "6%",
      color: "black",
    },
    helperText: {
      margin: "3px 0px",
      fontStyle: "italic",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "18px",
      letterSpacing: "6%",
      color: "#cf1c0c",
    },
    customBadgeText: {
      color: "#252525",
      fontSize: "13px",
      fontWeight: 500,
    },
  },
});
