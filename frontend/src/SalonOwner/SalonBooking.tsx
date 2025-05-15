import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Booking = {
  id: string;
  name: string;
  services: string[];  
  date: string;
  time: string;
  contactNo: string;
  avatar?: string;
};

const SalonBooking = () => {
  const [acceptedBookings, setAcceptedBookings] = useState<Booking[]>([
    { 
      id: '1', 
      name: 'Hareem Khan', 
      services: ['Bridal Makeup', 'Hair Styling'], 
      contactNo: '0300 0648617', 
      date: '26 April 2025',
      time: '10:00 AM',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    { 
      id: '2', 
      name: 'Ayesha Ahmed', 
      services: ['Party Makeup'], 
      contactNo: '0321 9876543', 
      date: '27 April 2025',
      time: '2:30 PM',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
  ]);

  const cancelBooking = (id: string) => {
    setAcceptedBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const renderBooking = ({ item }: { item: Booking }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Icon name="person" size={24} color="#6e3b6e" />
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.confirmedBadge}>
            <Icon name="checkmark-circle" size={18} color="#4CAF50" />
            <Text style={styles.confirmedText}>Confirmed</Text>
          </View>
        </View>
      </View>

      <View style={styles.details}>
        {item.services.map((service, index) => (
          <DetailRow key={index} icon="cut-outline" label={service} />
        ))}
        <DetailRow icon="calendar-outline" label={item.date} />
        <DetailRow icon="time-outline" label={item.time} />
        <DetailRow icon="call-outline" label={item.contactNo} />
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={() => cancelBooking(item.id)}>
        <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
      </TouchableOpacity>
    </View>
  );

  const DetailRow = ({ icon, label }: { icon: string, label: string }) => (
    <View style={styles.detailRow}>
      <Icon name={icon} size={18} color="#6e3b6e" />
      <Text style={styles.detailText}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Confirmed Bookings</Text>
      </View>

      <FlatList
        data={acceptedBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        contentContainerStyle={acceptedBookings.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="calendar-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No Confirmed Bookings</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    backgroundColor: '#1F6357',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },

  listContent: { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 55, height: 55, borderRadius: 28, marginRight: 12 },
  avatarPlaceholder: {
    width: 55, height: 55, borderRadius: 28,
    backgroundColor: '#eee',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  confirmedBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  confirmedText: { marginLeft: 6, color: '#4CAF50', fontSize: 13, fontWeight: '500' },

  details: { marginTop: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  detailText: { marginLeft: 10, fontSize: 15, color: '#555' },

  cancelButton: { marginTop: 18, alignItems: 'center' },
  cancelButtonText: { color: '#F44336', fontWeight: '600', fontSize: 15 },

  emptyContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  emptyState: { alignItems: 'center' },
  emptyText: { marginTop: 12, fontSize: 18, color: '#aaa' },
});

export default SalonBooking;
