import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native'
import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import MoviesCard from "./Components/MoviesCard";

const Tab = createMaterialTopTabNavigator();

const movieURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=1fb9aab42d89bcab6ae7677c8f20004d&language=en-US&page=1"

const Movies = () => {
    // const [playing, setNowPlaying] = useState('')
    // const [popular, setGetPopular] = useState('')
    const [isLoading, setLoading] = useState(true);
    const [rated, setTopRated] = useState([]);
    
    // const [upcoming, setUpcoming] = useState('')

    useEffect(() => {
      fetch(movieURL)
      .then((response) => response.json())
      .then((json) => setTopRated(json.results))
      .catch((error) => alert(error))
      .finally(setLoading(false));
    });

  
  //  useEffect(() => {
  //    const getTasks = async () => {
  //      const tasksfromurl = await fetchTasks()
  //      setTasks(tasksfromurl)
  //    }
     
  //     getTasks()     
  //   }, [])


  //  const fetchTasks = async () => {
  //     const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=1fb9aab42d89bcab6ae7677c8f20004d&language=en-US&page=1')
  //     const data = await res.json()
  //     return data
  //    }


  return (
    
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      // </View>
          <SafeAreaView>
            {isLoading ? (
            <ActivityIndicator /> 
            ): (
          <FlatList 
          data={rated}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => 
          {
           <Text> {item.results} </Text>
          
          }}
          /> 
          
          )
          }
      </SafeAreaView>
      // <Text>Movies</Text>
  
  );
}
function Search({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>search</Text>
      <Button title="more" onPress={() => navigation.navigate('more')}/>
    </View>
  );
}
function Tv() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>tv</Text>
    </View>
  );
}
function TabScreen({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Search Results" component={Search} />
      <Tab.Screen name="Tv Shows" component={Tv} />
    </Tab.Navigator>
  );
}

function DetailScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();


function App() {



  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Movies App" component={TabScreen}  options={{
       
          headerStyle: {
            backgroundColor: '#1a386b'
                       
           },
           headerTintColor: 'white'
           }} />
        <Stack.Screen name="more" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  }
})


export default App