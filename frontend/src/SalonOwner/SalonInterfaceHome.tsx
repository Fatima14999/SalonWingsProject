import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const SingleSalon = ({ navigation }: any) => {
  const [salon] = useState({
    name: 'Brookes Beauty',
    logoUrl:
      'https://i.pinimg.com/originals/2a/a8/a1/2aa8a17c2c3075daf373f10a7eeea3a4.jpg',
  });

  const [services] = useState([
    { id: '1', name: 'Hair Cut' },
    { id: '2', name: 'Bridal Makeup' },
    { id: '3', name: 'Facial Treatment' },
  ]);

  const handleAddService = () => {
    navigation.navigate('AddService'); // placeholder
  };

  const handleServicePress = (service: any) => {
    navigation.navigate('ServiceDetails', { service }); // placeholder
  };

  const renderService = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => handleServicePress(item)}
      activeOpacity={0.8}
    >
      <Text style={styles.serviceName}>{item.name}</Text>
      <Icon name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Salon Banner */}
      <Image source={{ uri: salon.logoUrl }} style={styles.banner} />
      <Text style={styles.salonName}>{salon.name}</Text>

      {/* Services Header */}
      <View style={styles.servicesHeader}>
        <Text style={styles.sectionTitle}>Services</Text>
        <TouchableOpacity onPress={handleAddService} style={styles.addButton}>
          <Icon name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Services List */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderService}
        contentContainerStyle={styles.servicesList}
      />
    </View>
  );
};

export default SingleSalon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  salonName: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  servicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6e3b6e',
  },
  addButton: {
    backgroundColor: '#6e3b6e',
    borderRadius: 20,
    padding: 6,
  },
  servicesList: {
    paddingBottom: 30,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
