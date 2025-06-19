import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../type';

type ViewSalonBookingsRouteProp = RouteProp<RootStackParamList, 'ViewSalonBookings'>;
type Salon = {
  name: string;
  location: string;
  contactno: string;
  rating: number;
  salonImage: string[];
  salonOwnerId: {
    Username: string;
    Image: string;
    cnic_no: string;
    cnicImage: string[];
  };
};
const ViewRegistrationRequest = () => {
  const route = useRoute<ViewSalonBookingsRouteProp>();
  const { salonId } = route.params as { salonId: string };
  // const [acceptedBookings, setAcceptedBookings] = useState<Salon[]>([]);
  // const salonData = {
  //   ownerName: 'Ali Raza',
  //   salonName: 'Luxury Cuts & Beauty',
  //   contactNo: '0301-2345678',
  //   cnicNo: '35202-1234567-1',
  //   location: 'Gulberg, Lahore',
  //   cnicImage: 'https://via.placeholder.com/300x180.png?text=CNIC+Image',
  //   salonImage: 'https://via.placeholder.com/300x180.png?text=Salon+Image',
  //   personImage: 'https://via.placeholder.com/150.png?text=Owner',
  // };
  const [salonData,setSalonData] = useState<Salon>();
  useEffect(() => {
  fetch(`http://10.0.2.2:3000/Salon/${salonId}`)
    .then(res => res.json())
    .then(data => {
      if (!data || data.error) {
        console.warn("Invalid salon data:", data);
        // setSalonData(null);
      } else {
        setSalonData(data);
      }
    })
    .catch(err => console.log("Error fetching salons:", err));
}, [salonId]);

    return (
  <ScrollView contentContainerStyle={styles.container}>
    {/* {!salonData ? (
      <Text>Loading...</Text>
    ) : ( */}
      <View style={styles.card}>
        <Image
          source={{ uri: salonData?.salonOwnerId?.Image }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{salonData?.salonOwnerId?.Username}</Text>
        <Text style={styles.subHeading}>Salon Owner</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Salon Name:</Text>
          <Text style={styles.value}>{salonData?.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Contact No:</Text>
          <Text style={styles.value}>{salonData?.contactno}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>CNIC No:</Text>
          <Text style={styles.value}>{salonData?.salonOwnerId?.cnic_no}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{salonData?.location}</Text>
        </View>

        <Text style={styles.sectionTitle}>Salon Image</Text>
        {salonData?.salonImage?.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.fullImage} />
        ))}

        <Text style={styles.sectionTitle}>CNIC Image</Text>
        {salonData?.salonOwnerId?.cnicImage.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.fullImage} />
        ))}
      </View>
    {/* // ) */}
    {/* } */}
  </ScrollView>
);

};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f6f7fb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 24,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  subHeading: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  infoRow: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '600',
    color: '#555',
  },
  value: {
    color: '#222',
    fontWeight: '500',
    flexShrink: 1,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
    color: '#444',
  },
  fullImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#ccc',
  },
});

export default ViewRegistrationRequest;
