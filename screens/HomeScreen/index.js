import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, FlatList } from 'react-native';
import { fetchPopularMovies } from '../../apis/moviesApi';
import { searchMovies } from '../../apis/searchMovies';
import { getMovieGenres } from '../../apis/getMovieGenres';
import MovieListItem from '../../components/MovieListItem';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { fetchWeather } from '../../apis/weatherApi';
import { 
  setLoading,
  setMoviesList,
  setCurrentPage,
  setTotalPages,
  setLocation,
  setWeatherData,
  setGenres
} from '../../store/actions/MoviesListAction';
import Header from './Header';

const { width, height } = Dimensions.get('window');

export default () => {
  const dispatch = useDispatch();
  const {
    favourites,
    moviesList,
    loading,
    currentPage,
    totalPages,
    location,
    weather,
    genres,
    filters
  } = useSelector(state => state.movies);

  const searchQuery = filters?.search ? filters?.search : false;
  const moviesApi = searchQuery ? searchMovies : fetchPopularMovies;
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const currentOffset = useRef(0);
  const direction = useRef('up');
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const offsetY = value;
      if (offsetY <= 0) {
        // If scrolled to the top or beyond, always show the header
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else if (offsetY > currentOffset.current && direction.current !== 'down') {
        // Scrolling down
        direction.current = 'down';
        Animated.timing(headerTranslateY, {
          toValue: -150,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else if (offsetY < currentOffset.current && direction.current !== 'up') {
        // Scrolling up
        direction.current = 'up';
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
  
      currentOffset.current = offsetY;
    });
  
    return () => {
      scrollY.removeAllListeners();
    };
  }, []);
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      dispatch(setLocation(location));
    })();

    dispatch(setLoading({ loading: true }));
    fetchPopularMovies(currentPage)
      .then(res => {
        dispatch(setMoviesList({ movies: res?.results, reset: false }));
        dispatch(setTotalPages({ totalPages: res.total_pages }));
        setTimeout(() => {
          dispatch(setLoading({ loading: false }));
        }, 1000);
      })
      .catch(err => console.log('moviesList error', err));

    getMovieGenres()
      .then(res => {
        dispatch(setGenres(res?.genres));
      })
      .catch(err => console.log('genres error', err));
  }, []);

  const onEndReached = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage({ page: currentPage + 1 }));
    }
  };

  useEffect(() => {
    if (currentPage < totalPages) {
      dispatch(setLoading({ loading: true }));
      moviesApi(
        searchQuery ? 
        {
          currentPage: currentPage,
          searchQuery: searchQuery
        } 
        : currentPage
      )
      .then(res => {
        dispatch(setMoviesList({ movies: res?.results, reset: false }));
        setTimeout(() => {
          dispatch(setLoading({ loading: false }));
        }, 1000);
      })
      .catch(err => console.log('error', err));
    }
  }, [currentPage]);

  useEffect(() => {
    if (location) {
      fetchWeather(location.coords.latitude, location.coords.longitude)
      .then(res => {
        dispatch(setWeatherData(res));
      });
    }
  }, [location]);

  return (
    <>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <Header weather={weather} width={width} height={height} />
      </Animated.View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        data={moviesList}
        renderItem={({ item }) => (
          <MovieListItem
            key={item.id.toString()}
            data={item}
            favourites={favourites}
          />
        )}
        onEndReached={onEndReached}
        ListFooterComponent={<View style={{ width, height: height * 0.1 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Movies</Text>
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#012326',
    paddingTop: 150, // to offset the header height
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#012326',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 3,
  },
  emptyContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
  },
});
