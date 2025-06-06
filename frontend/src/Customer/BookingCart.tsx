import React from "react";
import { useState } from "react";
import { FlatList } from "react-native";
import { View, Text,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const BookingCart =() =>{
    const [bookServices,setbooking]= useState([{
        id:"1",
        name:"MakeUp",
        type:"Signature",
        price:"1200",
        Date:"12-04-2025",
        Time:"12:00 am"
    }]);
    const [salon,setSalon] = useState({
        id:'1',
        name:"Beauty Hub",
        logourl:"https://randomuser.me/api/portraits/women/44.jpg",
        contactno:"03123456789"
    })
    return(
        <SafeAreaView>
            <View>
                <FlatList
                    data={bookServices}
                    renderItem={({item})=> (<Text>item</Text>)}
                />
            </View>
        </SafeAreaView>
    )
}
export default BookingCart;