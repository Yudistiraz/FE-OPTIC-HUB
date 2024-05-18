"use client";
import { useMediaQuery } from "@mui/material";
import { ReactNode, createContext, useContext } from "react";

import { theme } from "@/lib/MuiTheme";

// Create the context
const ScreenSizeContext = createContext<
  | {
      isExtraSmallScreen: boolean;
      isSmallScreen: boolean;
      isMediumScreen: boolean;
      isLargeScreen: boolean;
      isExtraLargeScreen: boolean;
      isMobileScreen: boolean;
    }
  | undefined
>(undefined);

export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }
  return context;
};

interface ScreenSizeProviderProps {
  children: ReactNode;
}

export const ScreenSizeProvider: React.FC<ScreenSizeProviderProps> = ({
  children,
}) => {
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <640
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // <768
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg")); // 768 <= x <= 1024
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg")); // >1024
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl")); // >1440
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("lg")); // >1024
  return (
    <ScreenSizeContext.Provider
      value={{
        isExtraSmallScreen,
        isSmallScreen,
        isMediumScreen,
        isLargeScreen,
        isExtraLargeScreen,
        isMobileScreen,
      }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
};
