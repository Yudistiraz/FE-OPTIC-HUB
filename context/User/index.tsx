/**
 * This context handles:
 * boolean of user's auth UI when necessary (eg: signin, signout, register)
 * save the selected package on booking detail page
 */

"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Create the context
const UserContext = createContext<
  | {
      userRole: string;
      setUserRole: (role: string) => void;
      hasMounted: boolean;
      setHasMounted: (mounted: boolean) => void;
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
  const [userRole, setUserRole] = useState<string>("owner");
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userRole,
        setUserRole,
        hasMounted,
        setHasMounted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};