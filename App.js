import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Register from './src/component/Register/Register';
import Screen1 from './src/component/Register/Screen1';
import Screen2 from './src/component/Register/Screen2';
import Dashboard from './src/component/Dashboard/Dashboard';
import Screen0 from './src/component/Register/Screen0';
import Login from './src/component/Login/Login';

const Stack= createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name='Screen1' component={Screen1} />
        <Stack.Screen name='Screen2' component={Screen2} />
        <Stack.Screen name='Screen0' component={Screen0} />
        
        <Stack.Screen name='Dashboard' component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App