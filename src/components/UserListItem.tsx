import { View, Text } from 'react-native';
import { User } from '../context/auth';

const UserListItem = ({ user }: { user: User }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        margin: 5,
        marginVertical: 3,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Text>{user.name}</Text>
    </View>
  );
};

export default UserListItem;
