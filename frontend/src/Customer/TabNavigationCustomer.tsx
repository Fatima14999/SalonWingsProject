import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeCustomer from "./HomeCustomer";
import LocationCustomer from "./LocationCuatomer";
import ProfileCustomer from "./ProfileCustomer";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

const Tab = createBottomTabNavigator();
const TabNavigationCustomer=() =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home"  component={HomeCustomer} options={{headerShown:false,tabBarIcon: ({ color, focused }) => (
                        <Icon name={focused ? 'home' : 'home-outline'} size={24} color={color} />
                      ), }}/>
            <Tab.Screen name="Location" component={LocationCustomer} options={{headerShown:false,tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'location' : 'location'} size={24} color={color} />
                      )}}/>
            <Tab.Screen name="Profile" component={ProfileCustomer} options={{headerShown:false,tabBarIcon: ({ color, focused }) => (
                        <Icon name={focused ? 'person' : 'person-outline'} size={24} color={color} />
                      ),}}/>
        </Tab.Navigator>

    )
}
export default TabNavigationCustomer;