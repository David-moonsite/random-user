import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS} from '../../utils/GlobalStyles';

interface ProfileProp {
  userFullName: string;
  userImage: string;
  width: number;
  height: number;
  nameSize: number;
}

const Avatar: React.FC<ProfileProp> = ({
  userFullName,
  userImage,
  width,
  height,
  nameSize,
}) => {
  return (
    <View style={styles.userContainer}>
      <View
        style={[
          styles.imageWrapper,
          {
            width: width + 5,
            height: height + 5,
            borderRadius: (width + 15) / 2,
          },
        ]}>
        <Image
          source={{uri: userImage}}
          style={{width, height, borderRadius: (width + 15) / 2}}
        />
      </View>

      <Text style={[styles.nameStyle, {fontSize: nameSize}]}>
        {userFullName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameStyle: {
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 10,
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Avatar;
