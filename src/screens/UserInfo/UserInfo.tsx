import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Header} from '../../components';
import {MainStackParamList} from '../../navigation/MainStackNavigator'; 
import {StackNavigationProp} from '@react-navigation/stack';
import { COLORS } from '../../utils/GlobalStyles';

type ProfileProp = {
  route: any;
  navigation: StackNavigationProp<MainStackParamList, any>; 
};

const UserInfo: React.FC<ProfileProp> = ({route, navigation}) => {
  const {user} = route.params;

  return (
    <>
      <Header title={'User Info'} navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.innerConteiner}>
          <View style={styles.avatarWrapper}>
            <Avatar
              userFullName={user.name.first + ' ' + user.name.last}
              userImage={user.picture.large}
              width={150}
              height={150}
              nameSize={22}
            />
          </View>
          <View style={styles.infoWrapper}>
            <View style={styles.textStyle}>
              <Text> {user.location.country}</Text>
            </View>

            <View style={styles.textStyle}>
              <Text> {user.location.state}</Text>
            </View>
          </View>
          <View style={styles.infoWrapper}>
            <View style={styles.textStyle}>
              <Text> {user.location.city}</Text>
            </View>

            <View style={styles.textStyle}>
              <Text> {user.location.postcode}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerConteiner: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  avatarWrapper: {
    paddingTop: 20,
    backgroundColor:COLORS.grey,
    paddingBottom:20
  },
  lineText: {
    paddingVertical: 12,
  },
  infoWrapper: {
    flexDirection: 'row',
    marginTop: 50,
  },
  textStyle: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserInfo;
