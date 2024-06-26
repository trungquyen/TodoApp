import { View, Image} from 'react-native'
import React, { useState } from 'react'

import styles from '../assets/styles'
import { useNavigation } from '@react-navigation/native';
import ArrowButton from '../component/ArrowButton';
import KeybroadView from '../component/KeybroadView';
import SignUpInput from '../component/SignUpInput';

export default function SignUpScreen() {
  const navigation = useNavigation();

  return (
    <KeybroadView>
      {/* <View style={styles.container} > */}
        <Image source={require('../assets/images/group1.png')} 
          style={{
            width: '70%',
            height: '70%',
            position: 'absolute',
            top: -135,
            left: 0,
            resizeMode: 'contain'
          }} 
        />

        <ArrowButton handleClick={() => navigation.goBack()}/>

        <View style={{
          width: '100%',
          height: '20%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: 30,
          paddingRight: 40
        }}>
          <Image source={require('../assets/images/photo2.png')} 
            width={50}
            height={50}
            resizeMode='contain'
          />
        </View>

        <SignUpInput />
      {/* </View> */}
    </KeybroadView>
  );
};