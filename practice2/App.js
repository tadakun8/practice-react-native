import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './components/Main'
import Archive from './components/Archive'
import { TouchableOpacity, Image } from 'react-native';


const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={Main} 
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity 
                style={{
                  paddingRight: 8
                }}
                onPress={() => navigation.navigate('Archive')}
              >
                <Image
                  source={require('./assets/cat.png')}
                  style={{
                    height: 25,
                    width: 25
                  }}             
                />
              </TouchableOpacity>
            ),            
          })}/>
        <Stack.Screen name="Archive" component={Archive} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
