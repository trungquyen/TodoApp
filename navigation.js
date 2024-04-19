import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { doc, getDoc, setDoc, addDoc, updateDoc } from 'firebase/firestore';
import StartScreen from './screens/StartScreen';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import DailyScreen from './screens/DailyScreen';
import useAuth from './hooks/useAuth';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const {user} = useAuth();
  const userInfo = useSelector(state => state.user.user)

  if(user && userInfo){
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Daily' component={DailyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} initialRouteName='Start'>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name='SignUp' component={SignUpScreen} />
          <Stack.Screen name='SignIn' component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
