

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch } from "react-redux";
import StackNavigator from "./navigations/StackNavigator";
import TabNavigator from "./navigations/TabNavigator";
import { theme } from './styles/Theme';
import store from "./store";
import { fetchProducts } from './store/productSlice';
import './localization/i18n';

const myTheme = createTheme({
  ...theme,
  mode: 'light',
  components: {
    Text: {
      h1Style: {
        fontWeight: '700',
        fontSize: 34
      },
      h2Style: {
        fontWeight: '300',
      },
      h3Style: {
        fontWeight: '300',
        fontSize: 14
      },
      h4Style: {
        fontWeight: '300',
        fontSize: 11
      },
    },
    Button: {
      buttonStyle: {
        backgroundColor: '#2563EB',
        borderRadius: 25,
        paddingVertical: 15,
      },
      containerStyle: {
        height: 48,
      },
      titleStyle: {
        fontSize: 14
      }
    }
  }

});

const App = () => {
  const isAuthenticated = true;
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ThemeProvider theme={myTheme}>
            <AppContent isAuthenticated={isAuthenticated} />
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

// Inner component so it can use hooks inside the Provider
const AppContent = ({ isAuthenticated }) => {
  const dispatch = useDispatch();

  // Fetch products once on app start
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, []);

  return isAuthenticated ? <TabNavigator /> : <StackNavigator />;
};

export default App;
