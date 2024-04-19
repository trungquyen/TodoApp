import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';
//import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../redux/slices/dailySlice';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function DailyItems({daily}) {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [isCheck, setCheck] = useState(false)
  const dailyInfo = useSelector((state) => state.daily.getDaily)

  const handleClick = async () => {
    const dailyRef = doc(db, 'dailys', daily.id);
    const dailySnap = await getDoc(dailyRef);
    if (dailySnap.exists()) {
      let data = dailySnap.data();
      dispatch(getData(data))
    }
    navigation.navigate('Daily')
  }

  const handleCheck = async () => {
      try {
        await updateDoc(doc(db, 'dailys', daily.id), {
          isCheck: isCheck
        })
        setCheck(!isCheck)
      } catch (err) {
        console.log("got error: ", err.message)
      }
  }
  
  return (
    <View style={{
      flexDirection: 'row',
      marginTop: 12,
      width: 300,
    }}>
      
        <TouchableOpacity onPress={handleCheck}>
          <View style={style.check}>
            {daily.isCheck && <View style={style.checkClick} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={dailyInfo ? ()=>null : handleClick}>
          <Text style={{
          fontSize: 15,
          fontWeight: 300,
          paddingHorizontal: 10
          }}>
          {daily.note} by {daily.hour}:{daily.minute} {daily.session}
          </Text>
        </TouchableOpacity>
      </View>
  )
}
const style = StyleSheet.create({
  check: {
    width: 24, 
    height: 24, 
    borderRadius: 4, 
    borderWidth: 1, 
    marginRight: 8, 
    borderColor: 'black', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  checkClick: {
    width: 12, 
    height: 12, 
    backgroundColor: 'blue', 
    borderRadius: 2 
  }
})