import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Lấy giờ, phút và giây từ state time
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Tính toán góc quay của các kim
  const hourDegree = (hours % 12) * 30 + minutes / 2;
  const minuteDegree = minutes * 6 + seconds / 10;
  const secondDegree = seconds * 6;

  return (
    <>
      <Text style={{
          width: '100%',
          textAlign: 'right',
          fontSize: 15,
          fontWeight: 600,
          padding: 5
        }}>
          {hours>=0 && hours<6 ? 'Good Night' : ''}
          {hours>=6 && hours<12 ? 'Good Morning' : ''}
          {hours>=12 && hours<18 ? 'Good Aftenoons' : ''}
          {hours>=18 && hours<=23 ? 'Good Evening' : ''}
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
          <Text style={[clock.textNumber, {left: 67}]}>12</Text>
          <Text style={[clock.textNumber, {top: 65, left: 2}]}>9</Text>
          <Text style={[clock.textNumber, {left: 138, top: 65}]}>3</Text>
          <Text style={[clock.textNumber, {left: 70, bottom: 0}]}>6</Text>

          <View style={[clock.hand, clock.hourHand, { transform: [{ rotate: `${hourDegree}deg` }] }]} />
          <View style={[clock.hand, clock.minuteHand, { transform: [{ rotate: `${minuteDegree}deg` }] }]} />
          <View style={[clock.hand, clock.secondHand, { transform: [{ rotate: `${secondDegree}deg` }] }]} />

          {/* <View style={{
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
          }} /> */}
      </View>
    </>
  )
};
const clock = StyleSheet.create({
  textNumber: {
    position: 'absolute',
    fontSize: 15,
    fontWeight: 600,
  },
  hand: {
    position: 'absolute',
    backgroundColor: 'black',
  },
  hourHand: {
    top: 25,
    left: 75,
    width: 4,
    height: 50,
    borderRadius: 2,
    transformOrigin: '50% 100%',
    zIndex: 1
  },
  minuteHand: {
    top: 4,
    left: 75,
    width: 3,
    height: 70,
    borderRadius: 1.5,
    transformOrigin: '50% 100%',
    zIndex: 1
  },
  secondHand: {
    top: 4,
    left: 75,
    width: 2,
    height: 70,
    backgroundColor: 'red',
    borderRadius: 1,
    transformOrigin: '50% 100%',
    zIndex: 1
  },
});