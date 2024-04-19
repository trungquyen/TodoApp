import { View, Text, Image, TouchableOpacity, ScrollView, Button, TextInput, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../assets/styles';
import { useNavigation } from '@react-navigation/native';
import { dailyRef, db } from '../config/firebase';
import { doc, getDoc, setDoc, addDoc, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import DailyList from '../component/DailyList';
import DailyInput from '../component/DailyInput';
import useAuth from '../hooks/useAuth';
import { resetDaily } from '../redux/slices/dailySlice';
import ArrowButton from '../component/ArrowButton';


export default function DailyScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user)
  const {dailyData} = useAuth();
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

      <ArrowButton handleClick={() => {navigation.goBack(), dispatch(resetDaily())}} />

      <View
        style={{
          position: 'absolute',
          height: 350,
          left: 42,
          top: 165,
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
          <DailyList dailyData={dailyData} />
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

      <DailyInput userInfo={userInfo} />
    </View>
  )
}