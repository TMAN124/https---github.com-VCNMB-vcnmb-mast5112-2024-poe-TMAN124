
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface Dish {
  name: string;
  ingredients: string;
  price: number;
}

type RootStackParamList = {
  Home: undefined;
  AddDish: undefined;
};

type AddDishScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddDish'>;

interface AddDishScreenProps {
  navigation: AddDishScreenNavigationProp;
}

const AddDishScreen: React.FC<AddDishScreenProps> = ({ navigation }) => {
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [price, setPrice] = useState('');

  const addDish = async () => {
    if (!dishName || !ingredients || !price || isNaN(parseFloat(price))) {
      Alert.alert('Invalid input', 'Please fill in all fields correctly.');
      return;
    }

    const newDish: Dish = { name: dishName, ingredients, price: parseFloat(price) };
    const savedDishes = await AsyncStorage.getItem('dishList');
    const dishList: Dish[] = savedDishes ? JSON.parse(savedDishes) : [];
    const updatedDishList = [...dishList, newDish];

    await AsyncStorage.setItem('dishList', JSON.stringify(updatedDishList));
    setDishName('');
    setIngredients('');
    setPrice('');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add new menu</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (USD)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Button title="Save Dish" onPress={addDish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddDishScreen;
