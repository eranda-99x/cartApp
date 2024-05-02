import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ProductListScreen from '../screens/productListScreen'
import ProductDetailsScreen from '../screens/productDetailsScreen'
import CartScreen from '../screens/cartScreen'

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='ProductListScreen'
                screenOptions={{
                    gestureEnabled: true,
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name='ProductListScreen'
                    component={ProductListScreen}
                />
                <Stack.Screen
                    name='ProductDetailsScreen'
                    component={ProductDetailsScreen}
                />
                <Stack.Screen
                    name='CartScreen'
                    component={CartScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
