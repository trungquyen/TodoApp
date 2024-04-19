import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'; 
import styles from '../assets/styles'
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase';
import DailyList from '../component/DailyList';
import { removeUser } from '../redux/slices/userSlice';
import Clock from '../component/Clock';
import useAuth from '../hooks/useAuth';
import ArrowButton from '../component/ArrowButton';
import { resetDaily } from '../redux/slices/dailySlice';

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handleLogout = async () => {
    await signOut(auth)
    dispatch(resetDaily())
    dispatch(removeUser())
    console.log('Log out successfully')
  }
  
  const userInfo = useSelector((state) => state.user.user)
  const {dailyData} = useAuth()

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

      <ArrowButton handleClick={handleLogout} />
      
      <View style={{
        width: '100%',
        height: '45%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgb(196, 231, 230)',
        borderRadius: 40,
        paddingBottom: 20,
      }}>
        <View style={{
          width: 120,
          height: 120,
          backgroundColor: 'white',
          borderRadius: 100,
          marginBottom: 30,
          overflow: 'hidden'
        }}
        >
          <Image source={require('../assets/images/avatar.jpeg')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              zIndex: 10,
              overflow: 'hidden'
            }}
          />
        </View>
        <Text 
          style={{
            fontSize: 20,
            fontWeight: 700,
            height: 36,
            textAlign: 'center',
            zIndex: 100
          }}
        >
          welcome {userInfo?.userName}
        </Text>
      </View>

      <View style={{
        width: '100%',
        height: '55%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>

        <Clock />
        
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

            <DailyList dailyData={dailyData} />

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