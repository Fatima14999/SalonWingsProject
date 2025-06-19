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
import ViewRegistrationRequest from './ViewRegistrationRequest';
type AdminHomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminHome'>;
};

type Salon = {
  _id: string;
  name: string;
  status: string;
};

type SalonOwner = {
  _id: string;
  Username: string;
  Image: string;
  salonId: Salon[];
};



const AdminRegistrationRequest = ({ navigation }: AdminHomeProps) => {
  const [salonOwner, setSalonOwner] = useState<SalonOwner[]>([]);
 useEffect(() => {
  const fetchSalonOwners = async () => {
    try {
      const res = await fetch('http://10.0.2.2:3000/SalonOwner');
      const data: SalonOwner[] = await res.json();
      const filteredOwners = data.filter(owner =>
        Array.isArray(owner.salonId) &&
        owner.salonId.length > 0 &&
        owner.salonId.some(salon => salon.status === 'Pending')
      );

      setSalonOwner(filteredOwners);
    } catch (err) {
      console.log("Error fetching salons:", err);
    }
  };

  fetchSalonOwners();
}, []);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f5f5f5' }}>
      <Text style={styles.heading}>Registration Request</Text>
      <FlatList
        data={salonOwner}
        keyExtractor={(item, index) => (item._id || index).toString()}
       renderItem={({ item }) => (
  <View>
    {item.salonId
      .filter(salon => salon.status === 'Pending') 
      .map(salon => (
        <TouchableOpacity
          key={salon._id}
          onPress={() =>
            navigation.navigate('ViewRegistrationRequest', {
              salonId: salon._id,
            })
          }
        >
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: item.Image }} style={styles.image} />
              <Text style={styles.name}>{item.Username}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.rating}>Salon: {salon.name}</Text>
              <Text style={styles.location}>Status: {salon.status}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
  </View>
)}      ListEmptyComponent={<Text>No salons yet.</Text>}
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
    // flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    // alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 29,
    marginRight: 0,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  info: {
    flex: 1,
    marginLeft: 70,
    //     borderTopWidth:1,
    //    borderTopColor: '#eee',
    //     paddingTop: 12,
    //     marginTop: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 20,
    marginTop: -3,

  },
  rating: {
    fontSize: 16,
    color: '#222'
  },
  location: {
    fontSize: 16,
    color: '#222'
  }
});

export default AdminRegistrationRequest;
