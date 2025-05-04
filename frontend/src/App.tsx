import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Or FontAwesome, MaterialIcons, etc.
import Home from './SalonOwner/Home';
import Profile from './SalonOwner/Profile';
// Import screens
// import Profile from './Profile';
// import Form1 from './Form';
// import Form2 from './Form2';
// import EditProfile from './EditProfile';
// import Home from './Home';
// import SalonInterface from './SalonInterface';
// import SalonInterfaceHome from './SalonInterfaceHome';
// import EditSalonDetails from './EditSalonDetails';
// import changePassword from './CurrentPasswordScreen';
// import CurrentPasswordScreen from './CurrentPasswordScreen';
// import SetNewPassword from './SetNewPassword';
// import Notifications from './Notifications';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 🔹 **1. Bottom Tab Navigator (Manages Home & Profile)**
const TabNavigator = () => {
  return (
    <Tab.Navigator
    id={undefined}
    screenOptions={({ route }) => ({
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

// 🔹 **2. Stack Navigator (Includes Tabs + Salon Details)**
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
          // shadowColor: '#000', // subtle shadow on iOS
          // elevation: 1, // subtle shadow on Android
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerTintColor: '#000', // back button color
        // headerBackTitleVisible: false, // iOS only
      }}
    >
      {/* Show the Bottom Tab Navigator */}
      <Stack.Screen name="My Salons" component={TabNavigator} options={{ headerShown: false }} />
      {/* Extra screen outside of tabs */}
      {/* <Stack.Screen name='HomeInside' component={Home}/>
      <Stack.Screen name='SalonInterface' component={SalonInterface} options={{ headerShown: false }}/>
      <Stack.Screen name='SaloInterfaceHome' component={SalonInterfaceHome} />
      <Stack.Screen name='EditSalonDetails' component={EditSalonDetails} />
      <Stack.Screen name='SetNewPassword' component={SetNewPassword} options={{ title: 'ChangePassword', headerStyle:{backgroundColor:'#fff' }}}/>
      <Stack.Screen name='ChangePassword' component={CurrentPasswordScreen} />
      <Stack.Screen name="Salon Details" component={Form1} />
      <Stack.Screen name="Identification Details" component={Form2} />
      <Stack.Screen name='Notifications' component={Notifications}/>
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name='EditProfile' component={EditProfile} /> */}
    </Stack.Navigator>

  );
};

// 🔹 **3. Home Screen (Floating Button for Salon Details)**
// const HomeScreen = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
//   return (
  
//     <><View>
//       <TouchableOpacity>
//         <Text>heloo</Text>
//       </TouchableOpacity>
//     </View><View style={styles.container}>
//         <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Home")}>
//           <Text style={styles.buttonText}>+</Text>
//         </TouchableOpacity>
//       </View></>
//   );
// };

// 🔹 **4. Main App Navigation (Root)**
const App = () => {
  return (
    // <><Home navigation={{
    //   navigate: function (arg0: string): void {
    //     throw new Error('Function not implemented.');
    //   }
    // }} />
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

// 🔹 **5. Styles**
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


