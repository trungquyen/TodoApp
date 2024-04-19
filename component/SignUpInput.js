import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup';
import styles from '../assets/styles'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function SignUpInput() {
  const navigation = useNavigation();
  const userURL = '';
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('')
  //const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (email && password && userName){
      if (confirm && confirm === password){
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password)
  
          await setDoc(doc(db, "users", res?.user?.uid),{
            email,
            userName,
            userURL,
            userId: res?.user?.uid
          });
  
          console.log('Resgister success')
        } catch (err) {
          Alert.alert('Có lỗi xảy ra', err.message)
        }
      } else {
        Alert.alert('Có lỗi xảy ra', 'Bạn phải xác nhận lại mật khẩu')
      }
    } else {
      // setError('Bạn phải xác nhận lại mật khẩu')
      Alert.alert('Có lỗi xảy ra', 'Bạn chưa nhập thông tin')
    }
  }

  const validateUser = async () => {
    try {
      await Yup.string().required('Vui lòng nhập tên của bạn').validate(userName)
      //setError('');
    } catch (error) {
      //setError(error.message);
      Alert.alert('Có lỗi xảy ra', error.message)
    }
  };

  const validateEmail = async () => {
    try {
      await Yup.string().email('Đây không phải là email').required('Vui lòng nhập email').validate(email)
      //setError('');
    } catch (error) {
      //setError(error.message);
      Alert.alert('Có lỗi xảy ra', error.message)
    }
  };

  const validatePassword = async () => {
    try {
      await Yup.string()
        .required('Vui lòng tạo mật khẩu')
        .min(6, 'Mật khẩu ít nhất phải 6 ký tự')
        .max(12, 'Mật khẩu có tối đa 12 ký tự')
        .matches(/[a-z]/, 'Mật khẩu phải có ít nhất một chữ thường')
        .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất một chữ in hoa')
        .matches(/[0-9]/, 'Mật khẩu phải có ít nhất một chữ số')
        .matches(/[!@#$%^&*]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt')
        .validate(password);

      //setError('');
    } catch (error) {
      //setError(error.message);
      Alert.alert('Có lỗi xảy ra', error.message)
    }
  };

  return (
    <View style={{
      width: '100%',
      height: '40%',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}>
      <Text 
        style={{
          fontSize: 25,
          fontWeight: 700,
          height: 36,
          alignItems: 'center',
          textAlign: 'center'
          
        }}
      >
        welcome Onboard!
      </Text>

      <Text 
        style={{
          width: '70%',
          fontSize: 20,
          fontWeight: 400,
          alignItems:'center',
          textAlign: 'center',
          marginVertical: 20
        }}
        >
        let's help you meet up your tasks
      </Text >
      
      <TextInput 
        placeholder='Enter your full name' 
        style={styles.input} 
        inputMode='text'
        value={userName}
        onBlur={validateUser}
        onChangeText={value => setUserName(value)}
      />

      <TextInput 
        placeholder='Enter your email' 
        style={styles.input} 
        inputMode='email'
        value={email}
        onBlur={validateEmail}
        onChangeText={value => setEmail(value)}
      />

      <TextInput 
        placeholder='Enter password' 
        style={styles.input} 
        secureTextEntry 
        inputMode='text' 
        maxLength={12}
        value={password}
        onBlur={validatePassword}
        onChangeText={value => setPassword(value)}
      />

      <TextInput 
        placeholder='Confirm password' 
        style={styles.input} 
        secureTextEntry 
        inputMode='text' 
        maxLength={12}
        value={confirm}
        onChangeText={value => setConfirm(value)}
      />

      <TouchableOpacity style={styles.button} 
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          Register
        </Text>
      </TouchableOpacity>

      <View style={{
        width: '100%',
        padding: 20,
        position: 'relative'
      }}>
        <Text>
          Already have an account ? 
        </Text>
        <TouchableOpacity style={{
          position: 'absolute',
          bottom: 20,
          left: 195
        }} onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={{
            color: 'rgb(106, 171, 171)',
            fontWeight: '600'
          }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}