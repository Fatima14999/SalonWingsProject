import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminHome from "./AdminHome";
import AdminRegistrationRequest from "./AdminRegistrationRequest";
import AdminProfile from "./AdminProfile";
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();
const TabBarNavigation=() =>{
    return(
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
            <Tab.Screen name="Home" component={AdminHome} 
              options={{ tabBarIcon: ({ color, focused }) => (
                         <Icon name={focused ? 'home' : 'home-outline'} size={24} color={color} />
                       ),
                     }}/>
            <Tab.Screen name="Requests" component={AdminRegistrationRequest}
            options={{
                     tabBarIcon: ({ color, focused }) => (
                       <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={24} color={color} />
                     ),
                   }}/>
            <Tab.Screen name="Profile" component={AdminProfile}
             options={{
                      tabBarIcon: ({ color, focused }) => (
                        <Icon name={focused ? 'person' : 'person-outline'} size={24} color={color} />
                      ),
                    }}/>
        </Tab.Navigator>)
}
export default TabBarNavigation;