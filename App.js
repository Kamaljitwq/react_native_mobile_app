import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native'
import Movies from './screens/Movies';
import Search from './screens/Search';
import TV from './screens/TV';
const Tab = createMaterialTopTabNavigator();

import { Container, NativeBaseProvider, Text } from "native-base"




function TabScreen({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="TV" component={TV} />
    </Tab.Navigator>
  );
}

function DetailScreen({route}) {
const id = route.params.id
let sar = route.params.sar

let [data, setData] = React.useState([]);
  
    
React.useEffect(() => {
      const getData = async () => {
        const dataFromUrl = await fetchData()
        setData(dataFromUrl.results)
      }

      getData()
        }, [])

      // Fetching Movies

 const fetchData = async () => {
   
        const mov = await fetch (`https://api.themoviedb.org/3/${sar}/${id}?api_key=1fb9aab42d89bcab6ae7677c8f20004d&language=en-US`)
        const data = await mov.json()
      
        return data
      }

return (
<Container >
<Text mb={5}>{data.popularity}</Text>
<Text >Popularity: {data.popularity} | Release Date: {data.release_date}
</Text>
</Container>

  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (

    <NativeBaseProvider>


    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tab" component={TabScreen} />
        <Stack.Screen name="more" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>

  );
}

export default App;