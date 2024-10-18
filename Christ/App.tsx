import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home_screen';
import AddDishScreen from './add_dish_screen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Christoff’s Dishes' }} />
        <Stack.Screen name="AddDish" component={AddDishScreen} options={{ title: 'Add New Dish' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

