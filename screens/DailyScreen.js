import { View, Text, Image, TouchableOpacity, ScrollView, Button, TextInput, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../assets/styles';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import firebase from '../config/firebase';
import { addDaily } from '../redux/slices/dailySlice';


export default function DailyScreen() {
  const navigation = useNavigation();
  const dailyInfo = useSelector((state) => state.daily );
  const dispatch = useDispatch();
  const [note, setNote] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [session, setSession] = useState('')
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const addDailyInfo = {
      content: note,
      hour: hour,
      minute: minute,
      session: session,
    };
    dispatch(addDaily(addDailyInfo));
    navigation.navigate('Home')
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
          resizeMode: 'contain',
          zIndex: 1
        }} 
      />

      <Image source={require('../assets/images/photo5.png')} 
        style={{
          width: '60%',
          height: '60%',
          position: 'absolute',
          top: -60,
          left: 100,
          resizeMode: 'contain',
          zIndex: 1
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

      <View
        style={{
          position: 'absolute',
          height: 350,
          left: 50,
          bottom: 415,
          zIndex:10
        }}
      >
        <Text style={{
          fontSize: 17,
          fontWeight: '700',
          padding: 10
        }}>
          Tasks List
        </Text>
        <View
          style={{
            width: 350,
            height: 280,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: 10,
            marginBottom: 30,
            paddingVertical: 10,
            paddingHorizontal: 20
          }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10
          }}>
            <Text>
              Daily Tasks
            </Text>
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
              width: 300
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

      <View style={{
        width: '100%',
        height: '45%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgb(196, 231, 230)',
        borderRadius: 40,
        paddingBottom: 20,
        position: 'relative'
      }} />

      <View style={{
        width: '100%',
        height: '55%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <View style={{
          width: '90%',
          marginTop: 120,
          paddingBottom: 9,
          borderBottomWidth: 2,
          borderBottomColor: 'black',
          flexDirection: 'row',
          alignItems:'flex-end'
        }}>
          <View style={{
            width: '90%',
            height: 30,
            flexDirection: 'row'
          }}>
            <TextInput 
              placeholder='Enter new daily'
              inputMode='text' 
              value={note}
              onChangeText={value => setNote(value)}
              style={{
                fontSize: 20,
                width: 300
              }}
            />
            <TextInput 
              placeholder='12'
              inputMode='numeric'
              keyboardType='numeric'
              maxLength={2}
              value={hour}
              onChangeText={value => setHour(value)}
              style={{
                fontSize: 20,
                borderBottomColor: 'black',
                borderBottomWidth: 1
              }}
            />
            <Text style={{
              fontSize: 20,
            }}>:</Text>
            <TextInput 
              placeholder='00'
              inputMode='numeric'
              keyboardType='numeric'
              maxLength={2}
              value={minute}
              onChangeText={value => setMinute(value)}
              style={{
                fontSize: 20,
                borderBottomColor: 'black',
                borderBottomWidth: 1
              }}
            />
          </View>

          <View style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginLeft: 10,
            paddingBottom: 5
          }}>
            <View style={{
              backgroundColor: 'rgba(112, 188, 189, 1.0)',
              borderRadius: 100,
              padding: 5
            }}>
              <TouchableOpacity 
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'black'
                }}
                onPress={() => setSession('am')}
              >
                <Text>AM</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{
                  borderTopWidth: 1,
                  borderColor: 'black'
                }}
                onPress={() => setSession('pm')}
              >
                <Text>PM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{
          width: '100%',
          alignItems: 'flex-end',
          marginRight: 10
        }}>
          <TouchableOpacity style={{
            width: 90,
            height: 25,
            backgroundColor: 'rgba(112, 188, 189, 1.0)',
            borderRadius: 100,
            margin: 15,
          }}
          onPress={handleSubmit}
          >
            <Text style={{
              fontSize: 15,
              textAlign: 'center',
              paddingTop: 3,
              color: 'white'
            }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}