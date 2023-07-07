import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { User } from '../../src/context/auth';
import { getUsers } from '../../src/services/userService';
import UserListItem from '../../src/components/UserListItem';

const NewChannel = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
};

export default NewChannel;
