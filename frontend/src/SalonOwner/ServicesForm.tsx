import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ServiceForm = () => {
  const [serviceName, setServiceName] = useState('');
  const navigation = useNavigation();

  const handleSave = () => {
    console.log('Service to save:', serviceName);
    // Later: Send to DB
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Hair Styling"
        value={serviceName}
        onChangeText={setServiceName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2d6b61',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default ServiceForm;
