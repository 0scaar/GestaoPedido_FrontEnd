import React, { createContext, useEffect, useMemo, useState } from "react";
import { getToken, removeToken, saveToken } from "./tokenStorage";

type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isSignedIn: false,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setIsSignedIn(!!token);
      setIsLoading(false);
    })();
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      isSignedIn,
      signIn: async (token: string) => {
        await saveToken(token);
        setIsSignedIn(true);
      },
      signOut: async () => {
        await removeToken();
        setIsSignedIn(false);
      },
    }),
    [isLoading, isSignedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}