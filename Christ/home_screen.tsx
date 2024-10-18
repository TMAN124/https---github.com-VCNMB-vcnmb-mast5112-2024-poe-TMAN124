import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
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

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [dishList, setDishList] = useState<Dish[]>([]);

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const savedDishes = await AsyncStorage.getItem('dishList');
        if (savedDishes) {
          setDishList(JSON.parse(savedDishes));
        }
      } catch (error) {
        console.error('Failed to load dishes from storage:', error);
      }
    };

    loadDishes();
  }, [dishList]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Christoff's Menu</Text>
      <FlatList
        data={dishList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishContainer}>
            <Text style={styles.dishText}>
              {item.name}: {item.ingredients} - ${item.price.toFixed(2)}
            </Text>
          </View>
        )}
      />
      <Button title="Add New Dish" onPress={() => navigation.navigate('AddDish')} />
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
  dishContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dishText: {
    fontSize: 16,
  },
});

export default HomeScreen;
