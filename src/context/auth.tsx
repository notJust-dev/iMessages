import { router, useNavigation, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { login } from '../services/userService';

export type User = {
  id: number;
  username: string;
  name: string;
};

type AuthContextType = {
  user?: User;
  signIn: (username: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const rootNavigation = useNavigation();
  const [isNavigationReady, setNavigationReady] = useState(false);

  // Temporary fix for: https://github.com/expo/router/issues/740
  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', () =>
      setNavigationReady(true)
    );
    return () => unsubscribe && unsubscribe();
  }, [rootNavigation]);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/sign-in');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [user, segments, isNavigationReady]);
}

export function AuthProvider(props) {
  const [user, setUser] = useState<User>(null);

  useProtectedRoute(user);

  const signIn = async (username: string) => {
    const newUser = await login(username);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => setUser(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
