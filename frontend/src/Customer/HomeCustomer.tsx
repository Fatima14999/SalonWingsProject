import React, { useState } from "react";
import { View,Text,FlatList, TouchableOpacity,StyleSheet,Image } from "react-native";

const HomeCustomer =(props: { navigation: { navigate: (arg0: string) => void; }; })=>{
    const [salons,setSalons]= useState([
        {
      id: 1,
      name: "Brookes Beauty",
      location: "Reham colony",
      rating: 4.8,
      logourl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=100&q=80"
    }
    ])
    return(
        <FlatList 
        data={salons}
        renderItem={({item})=>
            <TouchableOpacity onPress={() => props.navigation.navigate('SalonInterface' )}>
                  <View style={styles.card}>
                    <Image source={{ uri: item.logourl }} style={styles.image} />
                    <View style={styles.info}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.rating}>⭐ {item.rating}</Text>
                      <Text style={styles.location}>Location: {item.location}</Text>
                    </View>
                    <TouchableOpacity >
                      <Text style={styles.delete}>🗑</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity> 
        }
        keyExtractor={item =>item.id.toString()}
        />
        
    )
}
export default HomeCustomer;

const styles = StyleSheet.create({
  heading: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  card: {
    flexDirection: 'row', padding: 12, backgroundColor: 'white',
    borderRadius: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, alignItems: 'center',
  },
  image: { width: 70, height: 70, borderRadius: 12 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: 'bold' },
  rating: { fontSize: 14 },
  location: { fontSize: 14 },
  delete: { fontSize: 20, color: 'red' },
  floatingBtn: {
    position: 'absolute', bottom: 90, right: 20, backgroundColor: '#fffff0',
    padding: 12, borderRadius: 16,
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
  },
});
