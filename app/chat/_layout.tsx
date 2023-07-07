import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat } from 'stream-chat-expo';
import { useAuth } from '../../src/context/auth';

const API_KEY = '99zj94gstfp9';
const client = StreamChat.getInstance(API_KEY);

export default function ChatLayout() {
  const { user } = useAuth();

  useEffect(() => {
    // connect the user
    const connectUser = async () => {
      await client.connectUser(
        {
          id: user.id.toString(),
          name: user.name,
          image: 'https://i.imgur.com/fR9Jz14.png',
        },
        user.streamToken
      );

      const channel = client.channel('livestream', 'public', {
        name: 'Public',
        // image: 'https://i.imgur.com/fR9Jz14.png',
      });
      await channel.create();
    };

    connectUser();

    return () => {
      client.disconnectUser();
    };
  }, []);

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Messages' }} />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
}
