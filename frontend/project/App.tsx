// In App.js in a new project

/*
import {View, Text, TextInput, Switch} from 'react-native';
import {
    createStaticNavigation,
    useNavigation,
    useRoute} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';


 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HomeScreen from './screens/HomeScreen';
import EinkaufenScreen from './screens/EinkaufenScreen.tsx';
import EinkaufsZettelScreen from './screens/EinkaufsZettelScreen.tsx';
import LoginScreen from './screens/LoginScreen';


const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: 'Home'}}/>
                <Stack.Screen
                    name="Einkaufen"
                    component={EinkaufenScreen} />
                <Stack.Screen
                    name="EinkaufsZettel"
                    component={EinkaufsZettelScreen} />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{title: 'Login'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;





/*
const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',

    screenOptions: {
        headerStyle: { backgroundColor: 'tomato' },
    },

    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                title: 'Overview',
            }
        },
        Details: EinkaufenScreen,
        Login: LoginScreen,
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return <Navigation />;
}

 */