import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Booking = {
  id: string;
  name: string;
  service: string;
  date: string;
  time: string;
  contactNo: string;
  avatar?: string;
};

const SalonBookingRequest = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    { 
      id: '1', 
      name: 'Hareem Khan', 
      service: 'Bridal Makeup', 
      contactNo: '0300 0648617', 
      date: '26 April 2025', 
      time: '10:00 AM',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    { 
      id: '2', 
      name: 'Ayesha Ahmed', 
      service: 'Hair Coloring', 
      contactNo: '0321 9876543', 
      date: '27 April 2025', 
      time: '2:30 PM',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    { 
      id: '3', 
      name: 'Fatima Malik', 
      service: 'Facial Treatment', 
      contactNo: '0333 4567890', 
      date: '28 April 2025', 
      time: '4:00 PM',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
  ]);

  const rejectBooking = (id: string) => {
    setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
  };

  const acceptBooking = (id: string) => {
    console.log('Booking accepted:', id);
    setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
  };

  const renderBooking = ({ item }: { item: Booking }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Icon name="person" size={24} color="#666" />
          </View>
        )}
        <View style={styles.userInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.contact}>{item.contactNo}</Text>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name="calendar" size={16} color="#6e3b6e" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="time" size={16} color="#6e3b6e" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="cut" size={16} color="#6e3b6e" />
          <Text style={styles.detailText}>{item.service}</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonAccept]} 
          onPress={() => acceptBooking(item.id)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.buttonReject]} 
          onPress={() => rejectBooking(item.id)}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Booking Requests</Text>
      </View>
      
      {bookings.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="checkmark-done" size={48} color="#ccc" />
          <Text style={styles.emptyText}>No pending requests</Text>
          <Text style={styles.emptySubText}>All bookings have been processed</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    // backgroundColor: '#1F6357',
    paddingVertical: 10,
    paddingHorizontal: 15,
    // borderRadius:13,
    borderBlockColor:'black',
    borderBottomWidth:1,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  screenTitle: {
    color: 'black',
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subTitle: {
    textAlign:'center',
    color: 'black',
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  avatarPlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contact: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonAccept: {
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  buttonReject: {
    backgroundColor: '#F44336',
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  emptyState: {
    flex: 1,
    marginBlockStart:100,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginTop: 16,
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
});

export default SalonBookingRequest;