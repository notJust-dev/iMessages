import { Button, StyleSheet, View } from 'react-native';
import { useAuth } from '../../src/context/auth';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

export default function SignIn() {
  const [username, setUsername] = useState('');

  const { signIn } = useAuth();

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={styles.input}
        placeholderTextColor={'lightgray'}
      />
      <Button onPress={() => signIn(username)} title="Sign in" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'lightgray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
