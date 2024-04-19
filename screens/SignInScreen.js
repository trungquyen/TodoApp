import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase';
import ArrowButton from '../component/ArrowButton';
import KeybroadView from '../component/KeybroadView';
import SignInInput from '../component/SignInInput';

export default function SignInScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if(email && password){
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log("got error: ", err.message)
      }
    }
  }

  return (
    <KeybroadView >
        <Image source={require('../assets/images/group1.png')} 
          style={{
            width: '70%',
            height: '70%',
            position: 'absolute',
            top: -105,
            left: 0,
            resizeMode: 'contain'
          }} 
        />

        <ArrowButton handleClick={() => navigation.goBack()}/>

        <View style={{
          width: '100%',
          height: '57%',
          justifyContent: 'flex-end',
          marginBottom: 10,
          paddingLeft: 20
        }}>
          <Text 
            style={{
              fontSize: 25,
              fontWeight: 700,
              height: 36,
              textAlign: 'left',
              paddingStart: 85,
              marginBottom: 20
            }}
          >
            welcome Back!
          </Text>
          <Image source={require('../assets/images/photo3.png')} 
            width={50}
            height={50}
            resizeMode='contain'
          />
        </View>

        <SignInInput />

    </KeybroadView>
  )
}