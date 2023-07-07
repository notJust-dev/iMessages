import { StyleSheet, Text, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

export default function Page() {
  return <Redirect href={'/chat'} />;
  // return (
  //   <View style={styles.container}>
  //     <View style={styles.main}>
  //       <Text style={styles.title}>Hello World</Text>
  //       <Link href={"/chat"} style={styles.subtitle}>Open Chat</Link>
  //     </View>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
});
