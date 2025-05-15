import React from "react";
import { Text, View } from "react-native";
import { TabNavigationState } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SalonInterfaceHome from "./SalonInterfaceHome";
import SalonBookingRequest from "./SalonBookingRequest";
import Icon from 'react-native-vector-icons/Ionicons';
import SalonBooking from "./SalonBooking";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from "./Home";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: '#ffffff',
          // borderTopLeftRadius: 20,  
          // borderTopRightRadius: 20,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          // shadowRadius: 6,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#1F6357',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={SalonInterfaceHome}
        options={{ tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={SalonBookingRequest}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={24} color={color} />
          ),
        }}

      />
      <Tab.Screen
        name="Bookings"
        component={SalonBooking}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'book-check-outline' : 'book-check-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;