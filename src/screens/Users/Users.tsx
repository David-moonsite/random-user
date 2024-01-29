import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchUsers,
  getUsersStatus,
  selectUsersStore,
} from '../../slices/UsersStore/UsersStoreSlice';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import {Avatar} from '../../components';
import {MARGIN, NUMS_COLUMNS, SCREEN, width} from '../../utils/Constants';
import { COLORS } from '../../utils/GlobalStyles';

type ProfileProp = {};

const Users: React.FC<ProfileProp> = () => {
  const dispatch = useDispatch();
  const usersStatus = useSelector(getUsersStatus);
  const {allUsers} = useSelector(selectUsersStore);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchUsers(12));
  }, []);

  const goToUserInfo = (user: User) => {
    navigation.navigate(SCREEN.USER_INFO, {user, navigation});
  };

  const renderUserItem = ({item}: {item: User}) => (
    <TouchableOpacity
      onPress={() => goToUserInfo(item)}
      style={styles.userContainer}>
      <Avatar
        userFullName={item.name.first + ' ' + item.name.last}
        userImage={item.picture.medium}
        width={80}
        height={80}
        nameSize={14}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {usersStatus === 'loading' ? (
        <Text>Loading...</Text>
      ) : usersStatus === 'failed' ? (
        <Text>Error fetching data</Text>
      ) : (
        <FlatList
          data={allUsers?.results}
          keyExtractor={item => item?.id?.value?.toString()}
          renderItem={renderUserItem}
          numColumns={NUMS_COLUMNS}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  userContainer: {
    margin: MARGIN,
    width: (width - MARGIN * 2 * NUMS_COLUMNS) / NUMS_COLUMNS,
    height: 150,
    justifyContent: 'center',
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Users;
