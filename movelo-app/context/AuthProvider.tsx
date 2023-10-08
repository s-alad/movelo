import { useSegments, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

type User = {
  address: string;
  private: string;
}

type AuthType = {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthType>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // redirect to base
      router.replace("/draw/main/home");
    }
  }, [user, segments]);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
  return result;
}

export function AuthProvider({ children }: { children: JSX.Element }): JSX.Element {

    // try to get the user from secure storage
    let [user, setUser] = useState<User | null>(null);

    function getUserAddress() {
      const ua = getValueFor("address");
      return ua;
    }
    function getUserPrivate() {
      const up = getValueFor("private");
      return up;
    }

    useEffect(() => {
      async function getUser() {
        const u = await getUserAddress();
        const p = await getUserPrivate();

        if (u && p) setUser(
          {
            address: u,
            private: p,
          }
        );
        else setUser(null);
      }
      getUser();
    }, []);

    useProtectedRoute(user);

    const authContext: AuthType = {
      user,
      setUser,
    };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}