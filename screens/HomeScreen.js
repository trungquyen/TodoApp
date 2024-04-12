import { View, Text, Image, TouchableOpacity, ScrollView, Button, SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'; 
import styles from '../assets/styles'
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase';
import { addUser } from '../redux/slices/userSlice';
import useAuth from '../hooks/useAuth';


export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useAuth()
  const handleLogout = async () => {
    await signOut(auth);
    console.log('Log out successfully')
  }
  const dailyInfo = useSelector((state) => state.daily )
  //const userInfo = useSelector((state) => state.user)
  console.log(user);
  
  return (
    <View style={styles.container} >
      <Image source={require('../assets/images/group1.png')} 
        style={{
          width: '70%',
          height: '70%',
          position: 'absolute',
          top: -200,
          left: 0,
          resizeMode: 'contain',
          zIndex: 1
        }} 
      />

      <Image source={require('../assets/images/photo4.png')} 
        style={{
          width: '50%',
          height: '50%',
          position: 'absolute',
          top: 50,
          left: -30,
          resizeMode: 'contain',
          zIndex: 1
        }} 
      />

      <TouchableOpacity 
        onPress={handleLogout}
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
        height: '45%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgb(196, 231, 230)',
        borderRadius: 40,
        paddingBottom: 20
      }}>
        <View style={{
          width: 120,
          height: 120,
          backgroundColor: 'white',
          borderRadius: 100,
          marginBottom: 30,
        }}
        >
          <Image source={require('../assets/images/avatar.jpeg')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain'
            }}
          />
        </View>
        <Text 
          style={{
            fontSize: 20,
            fontWeight: 700,
            height: 36,
            textAlign: 'center',
          }}
        >
          welcome {user?.userName}
        </Text>
      </View>

      <View style={{
        width: '100%',
        height: '55%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <Text style={{
          width: '100%',
          textAlign: 'right',
          fontSize: 15,
          fontWeight: 600,
          padding: 5
        }}>
          Good Morning
        </Text>

        <View 
          style={{
            width: 150,
            height: 150,
            backgroundColor: 'white',
            borderRadius: 100,
            marginBottom: 5,
            position: 'relative'
          }}
        >
          <Text style={[clock.text, {left: 67}]}>12</Text>
          <Text style={[clock.text, {top: 65, left: 2}]}>9</Text>
          <Text style={[clock.text, {left: 138, top: 65}]}>3</Text>
          <Text style={[clock.text, {left: 70, bottom: 0}]}>6</Text>
          <View style={{
            padding: 1,
            width: '100%',
            backgroundColor: 'green',
            position: 'absolute',
            top: 74
          }} />
          <View style={{
            width: 1,
            height: '100%',
            padding: 1,
            backgroundColor: 'green',
            position: 'absolute',
            left: 74
          }} />
        </View>
        
        <View
          style={{
            width: 350,
            height: 320,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: '700',
              padding: 10
            }}
          >
            Tasks List
          </Text>
          <View
            style={{
              width: '100%',
              height: '80%',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: 30,
              paddingVertical: 10,
              paddingHorizontal: 20
            }}
          >
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 5
            }}>
              <Text>
                Daily Tasks
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Daily')}>
                <View style={{
                  width: 20,
                  height: 20,
                  backgroundColor: 'rgba(106, 171, 171, 1.0)',
                  justifyContent:'center',
                  alignItems: 'center',
                  borderRadius: 100
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: '800',
                    height: 27
                  }}>
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{
              width: '100%',
              backgroundColor: 'rgba(231, 244, 245, 1.0)',
              paddingBottom: 1,
              marginBottom: 0
            }} />

            <ScrollView>
              <View style={{
                flexDirection: 'row',
                marginTop: 12,
                width: 300,
              }}>
                <Checkbox/>
                <Text style={{
                  fontSize: 15,
                  fontWeight: 300,
                  paddingHorizontal: 10
                }}>
                  {dailyInfo.content} by {dailyInfo.hour}:{dailyInfo.minute} {dailyInfo.session}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
        
      </View>
    </View>
  )
};

const clock = StyleSheet.create({
  text: {
    position: 'absolute',
    fontSize: 15,
    fontWeight: 600,
  }
});