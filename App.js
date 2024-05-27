import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import Navigator from './navigation/RootNavigator';

import { Provider, connect } from 'react-redux';
import { store } from './store/store';
import AnimatedLoadingOverlay from './components/AnimatedLoadingOverlay';

const Root = ({ loading }) => {
  return( 
  <>
    {loading && <AnimatedLoadingOverlay />}
    <Navigator />
  </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.movies.loading,
});

const ConnectedRoot = connect(mapStateToProps)(Root);

const AppContainer = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#012326',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <StatusBar style="light" />
          <ConnectedRoot />
        </Provider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#012326',
  },
});

export default AppContainer;