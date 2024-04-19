import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function ArrowButton({handleClick}) {
  return (
    <TouchableOpacity 
        onPress={handleClick}
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
  )
}