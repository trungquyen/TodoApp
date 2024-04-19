import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { dailyRef, db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { resetDaily } from '../redux/slices/dailySlice';

export default function DailyInput({userInfo}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dailyInfo = useSelector((state) => state.daily.getDaily);
    const [note, setNote] = useState(dailyInfo ? dailyInfo.note : '' );
    const [hour, setHour] = useState(dailyInfo ? dailyInfo.hour : '');
    const [minute, setMinute] = useState(dailyInfo ? dailyInfo.minute : '');
    const [session, setSession] = useState(dailyInfo ? dailyInfo.session : '')
    const [isCheck, setCheck] = useState(false);

    const handleAdd = async (e) => {
        e.preventDefault();
        if(note && hour && minute && session) {
          try {
            const dailyDoc = await addDoc(dailyRef,{
              id: '',
              userId: userInfo?.userId,
              note,
              hour,
              minute,
              session,
              isCheck
            })
            await updateDoc(doc(db, 'dailys', dailyDoc.id), {
              id: dailyDoc.id
            })
            console.log('Add daily success')
            navigation.navigate('Home')
          } catch (err) {
            console.log("got error: ", err.message)
          }
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          await updateDoc(doc(db, 'dailys', dailyInfo.id), {
            note: note, 
            hour: hour, 
            minute: minute, 
            session: session
          })
          dispatch(resetDaily())
          console.log('Update daily success')
          navigation.navigate('Home')
        } catch (err) {
          console.log("got error: ", err.message)
        }
    }

  return (
    <View style={{
        width: '100%',
        height: '55%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>

        <View style={{
          width: '90%',
          marginTop: 100,
          paddingBottom: 9,
          borderBottomWidth: 2,
          borderBottomColor: 'black',
          flexDirection: 'row',
          alignItems:'flex-end'
        }}>
          <View style={{
            width: 345,
            height: 30,
            marginRight: 5,
            flexDirection: 'row'
          }}>
            <TextInput 
              placeholder={'Enter new daily'}
              inputMode='text' 
              value={note}
              onChangeText={value => setNote(value)}
              style={{
                fontSize: 20,
                width: '83%',
                marginRight: 5
              }}
            />
            
            <TextInput 
              placeholder={'12'}
              inputMode='numeric'
              keyboardType='numeric'
              maxLength={2}
              value={hour}
              onChangeText={value => {
                if (value>12){
                  Alert.alert('Bạn đã nhập sai giờ','Vui lòng nhập lại giờ từ 1 đến 12')
                } else {
                  setHour(value)
                }
              }}
              style={{
                fontSize: 20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginHorizontal: 2
              }}
            />
            <Text style={{
              fontSize: 20,
            }}>:</Text>
            <TextInput 
              placeholder={'00'}
              inputMode='numeric'
              keyboardType='numeric'
              maxLength={2}
              value={minute}
              onChangeText={value => {
                if (value>59){
                  Alert.alert('Bạn đã nhập sai phút','Vui lòng nhập lại phút từ 00 đến 59')
                } else {
                  setMinute(value)
                }
              }}
              style={{
                fontSize: 20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginHorizontal: 2
              }}
            />
          </View>

          <View style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginLeft: 5,
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
                  borderColor: 'black',
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
          {dailyInfo ? (
            <TouchableOpacity style={{
                width: 90,
                height: 25,
                backgroundColor: 'rgba(112, 188, 189, 1.0)',
                borderRadius: 100,
                margin: 15,
            }}
            onPress={handleUpdate}
            >
              <Text style={{
              fontSize: 15,
              textAlign: 'center',
              paddingTop: 3,
              color: 'white'
              }}>Update</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{
              width: 90,
              height: 25,
              backgroundColor: 'rgba(112, 188, 189, 1.0)',
              borderRadius: 100,
              margin: 15,
            }}
            onPress={handleAdd}
            >
              <Text style={{
              fontSize: 15,
              textAlign: 'center',
              paddingTop: 3,
              color: 'white'
              }}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
  )
}
const text = StyleSheet.create({
  click: {
    color: 'white',
    fontSize: '20',
    fontWeight: '600'
  }
})