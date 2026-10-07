import { clearApiToken } from "@/api/api";
import { logout } from "@/api/auth";
import { useStorageState } from "@/hooks/useStorageState";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, type PropsWithChildren, useContext } from "react";

// Token usado pelo bypass de login em desenvolvimento (sign-in.tsx)
export const DEV_FAKE_TOKEN = "dev-fake-token";

const SessionContext = createContext<{
  setSession: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  setSession: (token) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(SessionContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const queryClient = useQueryClient();

  return (
    <SessionContext.Provider
      value={{
        setSession: (token) => {
          setSession(token);
        },
        signOut: () => {
          // Com o token falso não há sessão na API para encerrar
          const request = session === DEV_FAKE_TOKEN ? Promise.resolve() : logout();

          request
          .catch((error) => {
            // O logout local acontece mesmo assim (finally abaixo)
            console.warn("Falha ao encerrar a sessão na API:", error);
          })
          .finally(() => {
            Promise.resolve().then(() => queryClient.clear()); // React Query cache clear
            setSession(null);
            clearApiToken(); // clears api Bearer token
            // AsyncStorage.clear(); // clears light and dark mode
          });
        },
        session,
        isLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
