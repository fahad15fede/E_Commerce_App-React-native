import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/HomeScreen";
import Shop from "../screens/ShopScreen";
import Bag from "../screens/BagScreen";
import Category from "../screens/CategoryScreen";
import ProductFilter from "../screens/ProductFilterScreen";
import Favorites from "../screens/FavoritesScreen";
import Profile from "../screens/ProfileScreen";
import VisualSearch from "../screens/VisualSearchScreen";
import SearchPhoto from "../screens/SearchPhotoScreen";
import CropPhoto from "../screens/CropPhotoScreen";
import TabBar from "../components/TabBar";

const noHeader = { headerShown: false };

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => (
    <HomeStack.Navigator screenOptions={noHeader}>
        <HomeStack.Screen name="HomeStack" component={Home} />
    </HomeStack.Navigator>
);

const ShopStack = createNativeStackNavigator();
const ShopStackScreen = () => (
    <ShopStack.Navigator screenOptions={noHeader}>
        <ShopStack.Screen name="ShopStack" component={Shop} />
        <ShopStack.Screen name="Category" component={Category} />
    </ShopStack.Navigator>
);

const BagStack = createNativeStackNavigator();
const BagStackScreen = () => (
    <BagStack.Navigator screenOptions={noHeader}>
        <BagStack.Screen name="BagStack" component={Bag} />
    </BagStack.Navigator>
);

const FavoritesStack = createNativeStackNavigator();
const FavoritesStackScreen = () => (
    <FavoritesStack.Navigator screenOptions={noHeader}>
        <FavoritesStack.Screen name="FavoritesStack" component={Favorites} />
    </FavoritesStack.Navigator>
);

const ProfileStack = createNativeStackNavigator();
const ProfileStackScreen = () => (
    <ProfileStack.Navigator screenOptions={noHeader}>
        <ProfileStack.Screen name="ProfileStack" component={Profile} />
    </ProfileStack.Navigator>
);

const Tab = createBottomTabNavigator();
const MainTabs = () => (
    <Tab.Navigator
        tabBar={(props) => <TabBar navigation={props.navigation} state={props.state} descriptors={props.descriptors} />}
        screenOptions={noHeader}
    >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Shop" component={ShopStackScreen} />
        <Tab.Screen name="Bag" component={BagStackScreen} />
        <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
);

const RootStack = createNativeStackNavigator();
const App = () => (
    <RootStack.Navigator screenOptions={noHeader}>
        <RootStack.Screen name="App" component={MainTabs} />
        <RootStack.Screen name="ProductFilter" component={ProductFilter} />
        <RootStack.Screen name="VisualSearch" component={VisualSearch} />
        <RootStack.Screen name="SearchPhoto" component={SearchPhoto} />
        <RootStack.Screen name="CropPhoto" component={CropPhoto} />
    </RootStack.Navigator>
);

export default App;
