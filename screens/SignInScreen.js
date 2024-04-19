import { View, Text, Image, TouchableOpacity, TextInput,} from 'react-native'
import React, { useState } from 'react'
import styles from '../assets/styles'
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
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
      {/* <View style={styles.container} > */}
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

        {/* <View style={{
          width: '100%',
          height: '40%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 10
        }}>

          <TextInput placeholder='Enter your email' 
            style={styles.input} 
            inputMode='email' 
            keyboardType='email-address' 
            value={email}
            onChangeText={value => setEmail(value)}
          />

          <TextInput placeholder='Confirm password' 
            style={styles.input} 
            secureTextEntry
            inputMode='text' 
            maxLength={12} 
            value={password}
            onChangeText={value => setPassword(value)}
          />

          <TouchableOpacity 
            style={{
              width: '100%',
              paddingStart: 35,
              marginVertical: 5
            }}
          >
            <Text style={{
              color: 'rgb(106, 171, 171)',
              fontWeight: '600'
            }}>
              Foget Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>
              Log in
            </Text>
          </TouchableOpacity>

          <View style={{
            width: '100%',
            padding: 20,
            position: 'relative'
          }}>
            <Text>
              Don't have an account ? 
            </Text>
            <TouchableOpacity style={{
              position: 'absolute',
              bottom: 20,
              left: 180
            }} onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={{
                color: 'rgb(106, 171, 171)',
                fontWeight: '600'
              }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      {/* </View> */}
    </KeybroadView>
  )
}