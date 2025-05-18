import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeCustomer from "./HomeCustomer";
import LocationCustomer from "./LocationCuatomer";
import ProfileCustomer from "./ProfileCustomer";
const Tab = createBottomTabNavigator();
const TabNavigationCustomer=() =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="HomeCustomer"  component={HomeCustomer}/>
            <Tab.Screen name="CustomerLocation" component={LocationCustomer}/>
            <Tab.Screen name="ProfileCustomer" component={ProfileCustomer}/>
        </Tab.Navigator>

    )
}
export default TabNavigationCustomer;