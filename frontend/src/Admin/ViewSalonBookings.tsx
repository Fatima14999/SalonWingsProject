import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../type';

type ViewSalonBookingsRouteProp = RouteProp<RootStackParamList, 'ViewSalonBookings'>;


type Booking = {
  _id: string;
  date: string;
  time: string;
  customerId: {
    _id: string;
    name: string;
    Image: string;
    contact_no: string;
  };
  serviceId: {
    _id: string;
    name: string;
    price: number;
  }[];
};

const ViewSalonBoonkings = () => {
  const route = useRoute<ViewSalonBookingsRouteProp>();
  const { salonId } = route.params as { salonId: string };
  const [acceptedBookings, setAcceptedBookings] = useState<Booking[]>([]);
  useEffect(() => {
    fetch(`http://10.0.2.2:3000/Booking?salonId=${salonId}`)
      .then(res => res.json())
      .then(data => {
        setAcceptedBookings(data);
      })
      .catch(err => console.log("Error fetching salons:", err));

  }, [salonId]);

  const cancelBooking = (id: string) => {
    setAcceptedBookings(prev => prev.filter(booking => booking._id !== id));
  };
  const renderBooking = ({ item }: { item: Booking }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        {item.customerId?.Image ? (
          <Image source={{ uri: item.customerId.Image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Icon name="person" size={24} color="#6e3b6e" />
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.name}>{item.customerId?.name}</Text>
          <View style={styles.confirmedBadge}>
            <Icon name="checkmark-circle" size={18} color="#4CAF50" />
            <Text style={styles.confirmedText}>Confirmed</Text>
          </View>
        </View>
      </View>
      <View style={styles.details}>
        {item.serviceId.map((service, index) =>

          <View key={index} style={styles.serviceItem}>
            <Icon name="cut-outline" size={16} color="#000" />
            <Text style={styles.serviceText}>{service.name} - Rs. {service.price}</Text>
          </View>

        )}
        <View style={styles.totalCostRow}>
          <Icon name="cash-outline" size={16} color="#000" />
          <Text style={styles.totalCostText}>
            Total: Rs. {item.serviceId.reduce((sum, service) => sum + service.price, 0)}
          </Text>
        </View>
        <Icon name='calendar-outline' size={16} color="#000" style={{ marginTop: 2 }}>
          <Text style={styles.serviceText}>   {item.date}</Text></Icon>
        <Icon name='calendar-outline' size={16} color="#000" style={{ marginTop: 5 }}>
          <Text style={[styles.serviceText]}>   {item.time}</Text>
        </Icon>
        <Icon name='calendar-outline' size={16} color="#000" style={{ marginTop: 5 }}>
          <Text style={[styles.serviceText]}>   {item.customerId.contact_no}</Text>
        </Icon>
      </View>
      <TouchableOpacity style={styles.cancelButton} onPress={() => cancelBooking(item._id)}>
        <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={acceptedBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item._id}
        contentContainerStyle={
          acceptedBookings.length === 0 ? styles.emptyContainer : styles.listContent
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="calendar-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No Bookings</Text>
          </View>
        }
      />
<<<<<<< HEAD

=======
>>>>>>> 4f69426 (commit Navigation)
      <TouchableOpacity
        style={[
          styles.deleteButton,
          acceptedBookings.length > 0 && styles.disabledButton
        ]}
        disabled={acceptedBookings.length > 0}
        onPress={() => {
          console.log("Salon deleted");
        }}
      >
        <Icon
          name="trash-outline"
          size={20}
          color={acceptedBookings.length > 0 ? '#aaa' : 'white'}
        />
        <Text
          style={[
            styles.deleteButtonText,
            acceptedBookings.length > 0 && { color: '#aaa' }
          ]}
        >
          Delete Salon
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  avatarPlaceholder: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  confirmedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  confirmedText: {
    marginLeft: 6,
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: '500',
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  serviceText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#444',
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#FFCDD2',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#D32F2F',
    fontWeight: '600',
    fontSize: 15,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 18,
    color: '#aaa',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E53935',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 4,
    gap: 8,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  totalCostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth:1,
     borderTopColor: '#eee',
    paddingTop: 12,
  },
  totalCostText: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
});


export default ViewSalonBoonkings;
