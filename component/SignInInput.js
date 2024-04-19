import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import styles from '../assets/styles';
import * as Yup from 'yup';

export default function SignInInput() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if(email && password){
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login success')
      } catch (err) {
        console.log("got error: ", err.message)
      }
    } else {
      setError('Bạn chưa nhập email hoặc password')
    }
  }

  const validateEmail = async () => {
    try {
      await Yup.string().email('Đây không phải là email').required('Vui lòng nhập email').validate(email)
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const validatePassword = async () => {
    try {
      await Yup.string().required('Vui lòng nhập mật khẩu').validate(password);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={{
      width: '100%',
      height: '40%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 5
    }}>

      {error ? <Text style={{ 
        color: 'red',
        width: '70%',
        fontSize: 20,
        fontWeight: 600,
        alignItems:'center',
        textAlign: 'center',
        marginBottom: 5
      }}>{error}</Text> : null}

      <TextInput placeholder='Enter your email' 
        style={styles.input} 
        inputMode='email' 
        keyboardType='email-address' 
        value={email}
        onBlur={validateEmail}
        onChangeText={value => setEmail(value)}
      />

      <TextInput placeholder='Confirm password' 
        style={styles.input} 
        secureTextEntry
        inputMode='text' 
        maxLength={12} 
        value={password}
        onBlur={validatePassword}
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
    </View>
  )
}