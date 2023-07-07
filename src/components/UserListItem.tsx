import { View, Text, Pressable } from 'react-native';
import { User, useAuth } from '../context/auth';
import { useChatContext } from 'stream-chat-expo';
import { useRouter } from 'expo-router';

const UserListItem = ({ user }: { user: User }) => {
  const { client } = useChatContext();
  const { user: me } = useAuth();
  const router = useRouter();

  const startChannel = async () => {
    const channel = client.channel('messaging', {
      members: [user.id.toString(), me.id.toString()],
    });
    await channel.watch();

    router.push(`/chat/channel/${channel.id}`);
  };

  return (
    <Pressable
      onPress={startChannel}
      style={{
        backgroundColor: 'white',
        margin: 5,
        marginVertical: 3,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Text>{user.name}</Text>
    </Pressable>
  );
};

export default UserListItem;
