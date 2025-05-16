import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const MAX_PRICE = 1000000;

const AddServicePage = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    type: '',
    image: '',
  });

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri || null);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const validateFields = () => {
    const newErrors: any = {};
    if (!name) newErrors.name = 'Service name is required';

    if (!price) {
      newErrors.price = 'Price is required';
    } else {
      const numericPrice = Number(price);
      if (isNaN(numericPrice)) {
        newErrors.price = 'Price must be a number';
      } else if (numericPrice <= 0) {
        newErrors.price = 'Price must be greater than zero';
      } else if (numericPrice > MAX_PRICE) {
        newErrors.price = `Price must be less than or equal to ${MAX_PRICE}`;
      }
    }

    if (!type) newErrors.type = 'Type is required';
    if (!imageUri) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddService = () => {
    if (!validateFields()) return;

    // Submit logic goes here
    Alert.alert('Success', 'Service added!');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Add New Service</Text> */}

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Tap to select image</Text>
        )}
      </TouchableOpacity>
      {errors.image ? <Text style={styles.errorText}>{errors.image}</Text> : null}

      <TextInput
        placeholder="Service Name"
        style={styles.input}
        value={name}
        maxLength={20} // max length for name
        onChangeText={(text) => {
          setName(text);
          if (text) setErrors(prev => ({ ...prev, name: '' }));
        }}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        placeholder="Price (PKR)"
        style={styles.input}
        value={price}
        keyboardType="numeric"
        maxLength={10} // max length for price input
        onChangeText={(text) => {
          // Remove any non-digit characters
          const cleaned = text.replace(/[^0-9]/g, '');
          setPrice(cleaned);
          if (cleaned) setErrors(prev => ({ ...prev, price: '' }));
        }}
      />
      {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}

      <TextInput
        placeholder="Type (e.g. Hair, Makeup)"
        style={styles.input}
        value={type}
        maxLength={20} // max length for type
        onChangeText={(text) => {
          setType(text);
          if (text) setErrors(prev => ({ ...prev, type: '' }));
        }}
      />
      {errors.type ? <Text style={styles.errorText}>{errors.type}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleAddService}>
        <Text style={styles.buttonText}>Add Service</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddServicePage;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6e3b6e',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePicker: {
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    fontSize: 16,
    color: '#888',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#6e3b6e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
