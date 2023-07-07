import { Slot, Stack } from 'expo-router';
import { AuthProvider } from '../src/context/auth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
