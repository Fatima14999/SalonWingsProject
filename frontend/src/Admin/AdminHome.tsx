import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { RootStackParamList } from '../type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type AdminHomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminHome'>;
};

type Salon = {
  _id: string;
  name: string;
  location: string;
  rating: number;
  logoUrl: string;
  status: string
};



const AdminHome = ({ navigation }: AdminHomeProps) => {
  const [salons, setSalons] = useState<Salon[]>([]);
  useEffect(() => {
    fetch('http://10.0.2.2:3000/Salon')
      .then(res => res.json())

      .then(data => {
        const approvedSalons = data.filter((salon: Salon) => salon.status === 'Approved');
        setSalons(approvedSalons);
      })
      .catch(err => console.log("Error fetching salons:", err));

  }, []);
  // const renderSalon = ({ item }: { item: Salon }) => (
  //   <TouchableOpacity
  //     onPress={() => navigation.navigate('ViewSalonBookings', { salonId: item._id })}
  //   >
  //     <View style={styles.card}>
  //       <Image
  //         source={{ uri: item.logoUrl }}
  //         style={styles.image}
  //         resizeMode="cover"
  //       // onError={() => handleImageError(item._id)}
  //       />
  //       <View style={styles.info}>
  //         <Text style={styles.name}>{item.name}</Text>
  //         <Text style={styles.rating}>⭐ {item.rating}</Text>
  //         <Text style={styles.location}>Location: {item.location}</Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f5f5f5' }}>
      <Text style={styles.heading}>Registered Salons</Text>
      <FlatList
        data={salons}
        keyExtractor={(item, index) => (item._id || index).toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewSalonBookings', { salonId: item._id })}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.logoUrl }}
                style={styles.image}
                resizeMode="cover"
              // onError={() => handleImageError(item._id)}
              />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
                <Text style={styles.location}>Location: {item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
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
    textAlign: 'center',
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
