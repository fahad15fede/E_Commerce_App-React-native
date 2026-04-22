import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import ForgotPassword from "../screens/ForgotPasswordScreen";

const Stack = createStackNavigator();

const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
);

export default AppStack;
