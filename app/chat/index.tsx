import { useRouter } from 'expo-router';
import { ChannelList } from 'stream-chat-expo';
import { useAuth } from '../../src/context/auth';

const ChatScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  const isPrivate = {
    type: 'messaging',
    members: { $in: [user.id.toString()] },
  };
  const isPublic = { type: 'livestream' };

  return (
    <ChannelList
      filters={{ $or: [isPrivate, isPublic] }}
      onSelect={(channel) => router.push(`/chat/channel/${channel.id}`)}
    />
  );
};

export default ChatScreen;
