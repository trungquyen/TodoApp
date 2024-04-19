import { View, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, StatusBar} from 'react-native'
import React from 'react'
import styles from '../assets/styles'

export default function KeybroadView({children}) {
  return (
    <View style={styles.container} >
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle = {[views.contentContainer]}
        >
            {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
const views = StyleSheet.create({
    contentContainer: {
        padding: 0,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 50: 150
    }
})