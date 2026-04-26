/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Details from './screens/Details';
import AppLayout from './components/AppLayout';
import Header from './components/Header';
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

const Stack = createNativeStackNavigator();
const colors = ['#4c669f', '#3b5998', '#192f6a'];
const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppContent />
          </QueryClientProvider>
        </Provider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

// Helper to wrap any screen with layout
const withLayout = Screen => props =>
  (
    <AppLayout>
      <Screen {...props} />
    </AppLayout>
  );

function AppContent() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={withLayout(Home)}
            options={{
              header: props => (
                <Header title={'Store'} gradientColor={colors} {...props} />
              ),
              title: '',
            }}
          />
          <Stack.Screen
            name="Details"
            component={withLayout(Details)}
            options={({ route }) => ({
              title: route.params?.item?.title || 'Details',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
