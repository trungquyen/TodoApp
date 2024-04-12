import { View, Text, Button, Image, TouchableOpacity, SafeAreaView} from 'react-native'
import React from 'react'
import styles from '../assets/styles'
import { useNavigation } from '@react-navigation/native';

export default function StartScreen() {
  const navigation = useNavigation()
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
      <View style={{
        width: '100%',
        height: '52%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 50
      }}>
        <Image source={require('../assets/images/photo1.png')} 
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
            textAlign: 'center',
          }}
        >
          Gets things done with TODo
        </Text>
        <Text 
          style={{
            width: '70%',
            fontSize: 15,
            alignItems:'center',
            textAlign: 'center',
            marginVertical: 50
          }}
        >
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        </Text >
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>
            Get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}