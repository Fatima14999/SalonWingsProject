import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

type Salon = {
  id: number;
  name: string;
  location: string;
  rating: number;
  logoUrl: string;
};

const mockSalons: Salon[] = [
  {
    id: 1,
    name: 'Brookes Beauty',
    location: 'Reham Colony',
    rating: 4.8,
    logoUrl:
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 2,
    name: 'Style Studio',
    location: 'Lake View',
    rating: 4.5,
    logoUrl:
      'https://images.unsplash.com/photo-1590080876096-b7b6126e7f95?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Glow Salon',
    location: 'Downtown',
    rating: 4.6,
    logoUrl:
      'https://images-platform.99static.com//_OYnMEcNEN4d2iNFdhDkxzcAKq0=/463x104:1557x1198/fit-in/590x590/99designs-contests-attachments/102/102767/attachment_102767932'
  }
];

const AdminHome = (props: {
  navigation: { navigate: (screen: string) => void };
}) => {
  const [salons, setSalons] = useState<Salon[]>(mockSalons);

  const handleImageError = (id: number) => {
    setSalons((prev) =>
      prev.map((salon) =>
        salon.id === id
          ? {
              ...salon,
              logoUrl: 'https://via.placeholder.com/70'
            }
          : salon
      )
    );
  };

  const renderSalon = ({ item }: { item: Salon }) => (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Bookings')}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.logoUrl }}
          style={styles.image}
          resizeMode="cover"
          onError={() => handleImageError(item.id)}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.location}>Location: {item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f5f5f5' }}>
      <Text style={styles.heading}>Registered Salons</Text>
      <FlatList
        data={salons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSalon}
        ListEmptyComponent={<Text>No salons yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
    color: '#333'
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
    elevation: 4,
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#ccc'
  },
  info: {
    flex: 1,
    marginLeft: 12
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222'
  },
  rating: {
    fontSize: 14,
    color: '#666'
  },
  location: {
    fontSize: 14,
    color: '#666'
  }
});

export default AdminHome;
