import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {MainStackParamList} from '../../navigation/MainStackNavigator'; // Adjust the import path as needed
import {StackNavigationProp} from '@react-navigation/stack';
import { COLORS } from '../../utils/GlobalStyles';

type HeaderProps = {
  title: string;
  navigation: StackNavigationProp<MainStackParamList, any>;
};
const backButton = require('../../assets/back.png');
const Header: React.FC<HeaderProps> = ({title, navigation}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={backButton} style={styles.backButtonImage} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    fontSize: 24,
    marginRight: 10,
  },
  backButtonImage: {
    width: 25,
    height:25
  },
});

export default Header;
