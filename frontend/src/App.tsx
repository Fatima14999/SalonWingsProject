import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Home from './SalonOwner/Home';
import Profile from './SalonOwner/Profile';
import Form1 from './SalonOwner/Form';
import Form2 from './SalonOwner/Form2';
import EditProfile from './SalonOwner/EditProfile';
// import Home from './SalonOwner/Home';
import SaloInterfaceHome from './SalonOwner/SalonInterfaceHome';
import SalonInterface from './SalonOwner/SalonInterface';
import ServiceForm from './SalonOwner/ServicesForm';
// import EditSalonDetails from './EditSalonDetails';
import changePassword from './SalonOwner/ChangePassword';
// import CurrentPasswordScreen from './CurrentPasswordScreen';
import SetNewPassword from './SalonOwner/SetNewPassword';
import ChangePassword from './SalonOwner/ChangePassword';
import TabBarNavigation from './Admin/TabBarNavigation';
import ViewSalonBoonkings from './Admin/ViewSalonBookings';
import AddService from './SalonOwner/AddService';
import ServiceDetails from './SalonOwner/ServiceDetails';
import HomeCustomer from './Customer/HomeCustomer';
import TabNavigationCustomer from './Customer/TabNavigationCustomer'
// import Notifications from './Notifications';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
    id={undefined}
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
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
  </Tab.Navigator>
  );
};
const StackNavigator = () => {
  return (
    <Stack.Navigator
    id={undefined}
      screenOptions={{
        // headerStyle: { backgroundColor: '#1F6357' },
        // headerTintColor: 'white',
        // headerTitleStyle: { fontSize: 20 },
        // title: 'EditProfile',
        headerStyle: {
          backgroundColor: '#fff',
          // shadowColor: '#000', 
          // elevation: 1, 
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerTintColor: '#000',
      }}
    >
      <Stack.Screen name="My Salons" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='HomeInside' component={Home}/>
      <Stack.Screen name='SalonInterface' component={SalonInterface} options={{ headerShown: false }}/>
      <Stack.Screen name='SaloInterfaceHome' component={SaloInterfaceHome} />
      {/* <Stack.Screen name='EditSalonDetails' component={EditSalonDetails} /> */}
      <Stack.Screen name='SetNewPassword' component={SetNewPassword} options={{ title: 'ChangePassword', headerStyle:{backgroundColor:'#fff' }}}/>
      <Stack.Screen name='ServiceForm' component={ServiceForm}/>
      <Stack.Screen name='ChangePassword' component={ChangePassword} />
      <Stack.Screen name="Salon Details" component={Form1} />
      <Stack.Screen name="Identification Details" component={Form2} />
      {/* <Stack.Screen name='Notifications' component={Notifications}/> */}
      <Stack.Screen name='TabBarNavigation' component={TabBarNavigation}options={{headerShown:false}}/>
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name='Bookings' component={ViewSalonBoonkings} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='AddService' component={AddService}/>
      <Stack.Screen name='ServiceDetails' component={ServiceDetails} options={{headerShown:false}}/>
      <Stack.Screen name='HomeCustomer' component={HomeCustomer}/>
      <Stack.Screen name='TabNavigationCustomer' component={TabNavigationCustomer} options={{headerShown:false}} />
    </Stack.Navigator>

  );
};

const App = () => {
  return (
    // <SafeAreaView>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#000",
    width: 60,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 90,
    right: 20,
  },
  buttonText: {
    fontSize: 30,
    color: "white",
    alignItems: 'center',
    marginEnd: 1,
    marginBlockEnd: 7,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});

export default App;
