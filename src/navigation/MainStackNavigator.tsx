import React from 'react';
import {Users, UserInfo} from '../screens';
import {SCREEN} from '../utils/Constants';
import {createStackNavigator} from '@react-navigation/stack';

export type MainStackParamList = {
  [SCREEN.USERS]: undefined;
  [SCREEN.USER_INFO]: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN.USERS}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN.USERS} component={Users} />
      <Stack.Screen name={SCREEN.USER_INFO} component={UserInfo} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
