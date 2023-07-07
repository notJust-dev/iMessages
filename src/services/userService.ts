import { User } from '../context/auth';
import { API_URL } from '../config';
import { Alert } from 'react-native';

export const login = async (username: string): Promise<User | null> => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  if (res.status !== 200) {
    const body = await res.json();
    Alert.alert('Error while signing in', body.error);
    return null;
  } else {
    return await res.json();
  }
};
