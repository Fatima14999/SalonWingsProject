import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from "react-native-vector-icons/Ionicons";

type Salon = {
  _id?: string;
  id?: number;
  name?: string;
  location?: string;
  rating?: number;
  logourl?: string;
};

const HomeCustomer = (props: { navigation: { navigate: (arg0: string) => void } }) => {
  const [salons, setSalons] = useState<Salon[]>([]);

  const [CustomerLocation] = useState({
    location: "Sun City, Sheikhupura"
  });

  useEffect(() => {
    fetch('http://10.0.2.2:3000/Salon')
      .then(res => res.json())
      
      .then(data => {
        setSalons(data);
      })
      .catch(err => console.log("Error fetching salons:", err));
      
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.LocationIcon}>
          <Ionicons name='location' style={{ fontSize: 19, color: '#fff' }} />
          <Text style={styles.locationText}>{CustomerLocation.location}</Text>
        </View>

        <View style={styles.search}>
          <FontAwesome5 name="search" style={styles.searchIcon} />
          <TextInput
            style={styles.searchText}
            placeholder="Search Salons"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.listSection}>
        <FlatList
          data={salons}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => props.navigation.navigate('ShowSalonDetail')}>
              <View style={styles.card}>
                <Image source={{ uri: item.logourl || 'https://via.placeholder.com/70' }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                  <Text style={styles.location}>Location: {item.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => (item._id || item.id || index).toString()}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D726D',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  LocationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  search: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchText: {
    fontSize: 15,
    marginLeft: 8,
    flex: 1,
    color: '#000',
  },
  searchIcon: {
    fontSize: 16,
    color: '#666',
  },
  listSection: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    marginBottom: -25,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  image: { width: 70, height: 70, borderRadius: 12 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: 'bold' },
  rating: { fontSize: 14 },
  location: { fontSize: 14 },
});
