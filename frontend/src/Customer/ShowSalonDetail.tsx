import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image,Text,TouchableOpacity,View,StyleSheet,FlatList } from "react-native";

const ShowSalonDetail = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
    const [salonData, setSalonData] = useState({
        name: "Beauty",
        location: "Habib Colony, skp",
        timingOpen: "7am",
        timingClose: "9pm",
        contactno:"03123456789",
        logourl: "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Fsb258ZW58MHx8MHx8fDA%3D",
        rating: 2.8
    })
    const [Services, setServices] = useState([
        {
            id: "1",
            name: "MakeUp",
            logourl: "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Fsb258ZW58MHx8MHx8fDA%3D"
        },
        {
            id: "2",
            name: "Facial",
            logourl: "https://i.pinimg.com/originals/2a/a8/a1/2aa8a17c2c3075daf373f10a7eeea3a4.jpg"
        },
         {
            id: "3",
            name: "Facial",
            logourl: "https://i.pinimg.com/originals/2a/a8/a1/2aa8a17c2c3075daf373f10a7eeea3a4.jpg"
        },
         {
            id: "4",
            name: "Facial",
            logourl: "https://i.pinimg.com/originals/2a/a8/a1/2aa8a17c2c3075daf373f10a7eeea3a4.jpg"
        },
         {
            id: "5",
            name: "Facial",
            logourl: "https://i.pinimg.com/originals/2a/a8/a1/2aa8a17c2c3075daf373f10a7eeea3a4.jpg"
        },
         {
            id: "6",
            name: "Facial",
            logourl: "https://i.pinimg.com/originals/2a/a8/a1/2aa8a17c2c3075daf373f10a7eeea3a4.jpg"
        },
         {
            id: "7",
            name: "Facial",
            logourl: "https://i.pinimg.com/originals/2a/a8/a1/2aa8a17c2c3075daf373f10a7eeea3a4.jpg"
        },
        {
            id: "7",
            name: "Facial",
            logourl: "https://i.pinimg.com/originals/2a/a8/a1/2aa8a17c2c3075daf373f10a7eeea3a4.jpg"
        }

    ])
    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: salonData.logourl }} style={{width:'100%',height:200,borderRadius:16,marginBottom:1}} />
            <View style={styles.header
                
            }>
                <Text style={{fontSize:28,fontWeight:'bold',margin:10}}>{salonData.name} </Text>
            <Text style={styles.text}>Location: {salonData.location}</Text>
            <Text style={styles.text}>Contact no: {salonData.contactno}</Text>
            <View style={{flexDirection:'row',alignContent:'space-between',
            }}>
                <Text style={styles.text}>Timing: {salonData.timingOpen}</Text>
                <Text style={styles.text}>to {salonData.timingClose}</Text>
            </View>
            <Text style={[styles.text,{marginBottom:10}]}> {salonData.rating}</Text>
             
            <FlatList 
                data={Services}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}

                renderItem={({item})=> <TouchableOpacity style={styles.box} onPress={()=>props.navigation.navigate('ServiceDetailShow')}>
                    <Image source={{uri: item.logourl}} style={{width:180,height:120,borderTopRightRadius:16,borderTopLeftRadius:16}}/>
                    <Text style={[styles.text,{marginBottom:2}]}>{item.name}</Text>
                </TouchableOpacity> }
                keyExtractor={(item)=>item.id}
                contentContainerStyle={styles.servicesList}
            />
           </View>
        </SafeAreaView>

    )
}
export default ShowSalonDetail;
const styles = StyleSheet.create({    
    container:{
        flex:1,
        // paddingTop:5,
        // paddingHorizontal: 16,
        backgroundColor:'#fff'
    },
    header:{
        // flex:1,
        paddingTop:5,
        paddingHorizontal: 16,
    },
    list:{
        height:100,
        width:100,
        margin:10,
    },
    text:{
        fontSize:18,
        marginLeft:10,
        fontWeight:'black'
    },
     servicesList: {
    paddingBottom: 30,
    // flex:1,
    // backgroundColor:'blue'
  },
  box:{
    backgroundColor: '#fff',
    borderRadius: 12,
    width:180,
    height:150,
    marginTop:10,
    margin:4,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  }

})