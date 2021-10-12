import { FlatList, HStack, Box, Image, Heading, VStack, Button } from 'native-base';
import * as React from 'react';
import { SafeAreaView, Text, View } from 'react-native'


function Movies({navigation}) {

    
    let [movies, setMovies] = React.useState([]);
  
    
    React.useEffect(() => {
      const getMovies = async () => {
        const moviesFromUrl = await fetchMovies()
        setMovies(moviesFromUrl.results)
      }

      getMovies()
        }, [])

      // Fetching Movies

      const fetchMovies = async () => {
        const mov = await fetch ('https://api.themoviedb.org/3/movie/top_rated?api_key=1fb9aab42d89bcab6ae7677c8f20004d')
        const data = await mov.json()
      
        return data
      }


    
return (
     
    <SafeAreaView >
            <FlatList
          data={movies}
          renderItem={({ item }) => (
    
     <HStack width="82%" mx="auto" space={2} >
         <Box mt={5}>
        <Image
        source={{
                uri: "https://image.tmdb.org/t/p/w500" + item.poster_path
              }}
        alt="Img"
        width="90"
        height="90"
        resizeMode="cover"
        />
    </Box>

    <Box mt={3} width="65%">
                <VStack>
                  <Heading width="66%" size="sm">{item.original_title}</Heading>
                  <Text fontSize="sm">Popularity: {item.popularity}</Text>
                  <Text fontSize="sm">Release Date: {item.release_date}</Text>

                  <Button size="md" width="70%" onPress={() => {
                    navigation.navigate('more', {id:item.id, sar:"movie"})                  }}>
                    More Details
                  </Button>

                  
                </VStack>
    </Box>


     </HStack>


          )
        }
          keyExtractor={movie => movie.id}
        />

      </SafeAreaView>
  
    );
  }
  export default Movies;