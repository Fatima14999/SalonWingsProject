import React, { useState } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity,
  StyleSheet, Alert
} from 'react-native';

type Salon = {
    id: number;
    name: string;
    location: string;
    rating: number;
    logoUrl: string;
  };

const Home = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [salons, setSalons] = useState([
    {
      id: 1,
      name: "Brookes Beauty",
      location: "Reham colony",
      rating: 4.8,
      logoUrl: "https://via.placeholder.com/150"
    }
  ]);

  const handleDelete = (id: number) => {
    Alert.alert("Delete Salon", "Are you sure you want to delete this salon?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: () => {
          // const updated = salons.filter(s => s.id !== id);
          // setSalons(updated);
        }
      }
    ]);
  };

  const renderSalon = ({ item }: { item: Salon }) => (
    <TouchableOpacity onPress={() => props.navigation.navigate('SalonInterface' )}>
      <View style={styles.card}>
        <Image source={{ uri: item.logoUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.location}>Location: {item.location}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.delete}>🗑</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.heading}>My Salons</Text>
      <FlatList
        data={salons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSalon}
        ListEmptyComponent={<Text>No salons yet.</Text>}
      />

      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => props.navigation.navigate("Salon Details")}
      >
        <Text style={{ fontSize: 30 }}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default Home;
