import { View, Text, Image, TouchableOpacity, Button, TextInput, KeyboardAvoidingView, ScrollView, SafeAreaView, Pressable, StyleSheet} from 'react-native'
import React, { useState } from 'react'

import styles from '../assets/styles'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userURL = '';

  const handleSubmit = async () => {
    if(email && password && userName){
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password)

        await setDoc(doc(db, "users", res?.user?.uid),{
          email,
          userName,
          userURL,
          userId: res?.user?.uid
        });

        console.log('ok')
      } catch (err) {
        console.log("got error: ", err.message)
      }
    }
  }

  return (
    <View style={styles.container} >
      <Image source={require('../assets/images/group1.png')} 
        style={{
          width: '70%',
          height: '70%',
          position: 'absolute',
          top: -200,
          left: 0,
          resizeMode: 'contain'
        }} 
      />

      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={{
          width: '10%',
          height: '10%',
          position: 'absolute',
          top: 50,
          left: 40,
          zIndex: 10
        }} 
      >
        <Image source={require('../assets/images/Arrow.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
          }} 
        />
      </TouchableOpacity>

      <View style={{
        width: '100%',
        height: '30%',
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
          onChangeText={value => setUserName(value)}
        />

        <TextInput 
          placeholder='Enter your email' 
          style={styles.input} 
          inputMode='email'
          value={email}
          onChangeText={value => setEmail(value)}
        />

        <TextInput 
          placeholder='Enter password' 
          style={styles.input} 
          secureTextEntry 
          inputMode='text' 
          maxLength={12}
          value={password}
          onChangeText={value => setPassword(value)}
        />

        <TextInput 
          placeholder='Confirm password' 
          style={styles.input} 
          secureTextEntry 
          inputMode='text' 
          maxLength={12}
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
    </View>
  );
};

const button = StyleSheet.create({
  button: isValid => ({
    width: '90%',
    height: 50,
    marginTop: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isValid ? 'rgba(112, 188, 189, 1.0)' : 'red',
  })
})