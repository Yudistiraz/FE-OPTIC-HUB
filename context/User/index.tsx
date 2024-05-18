/**
 * This context handles:
 * boolean of user's auth UI when necessary (eg: signin, signout, register)
 * save the selected package on booking detail page
 */

"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Create the context
const UserContext = createContext<
  | {
      openDialog: boolean;
      dialogType: "confirmation" | "success" | "alert";
      dialogTitle: string;
      dialogMessage: string;
      selectedId: string;
      sideBarOpen: boolean;
      setOpenDialog: (openDialog: boolean) => void;
      setDialogType: (dialogType: "confirmation" | "success" | "alert") => void;
      setDialogTitle: (dialogTitle: string) => void;
      setDialogMessage: (dialogMessage: string) => void;
      setSelectedId: (dialogTitle: string) => void;
      setSideBarOpen: (sideBarOpen: boolean) => void;
      resetDialogText: () => void;
    }
  | undefined
>(undefined);

export const useUserState = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  //DIALOG
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<
    "confirmation" | "success" | "alert"
  >("alert");
  const [dialogTitle, setDialogTitle] = useState<string>("Error");
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const resetDialogText = () => {
    setDialogTitle("Error");
    setDialogType("alert");
    setDialogMessage("");
  };

  return (
    <UserContext.Provider
      value={{
        openDialog,
        setOpenDialog,
        dialogType,
        setDialogType,
        dialogTitle,
        sideBarOpen,
        setDialogTitle,
        resetDialogText,
        dialogMessage,
        setDialogMessage,
        selectedId,
        setSelectedId,
        setSideBarOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
