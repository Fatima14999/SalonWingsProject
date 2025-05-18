import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ServiceDetails = ({ route }: any) => {
  const navigation = useNavigation();
  const { service: initialService, onDelete, onUpdate } = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [service, setService] = useState(initialService);
  const [errors, setErrors] = useState<{ name?: string; price?: string; type?: string; imageUri?: string }>({});

  const validateFields = () => {
    let valid = true;
    const newErrors: any = {};

    if (!service.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!service.price) {
      newErrors.price = 'Price is required';
      valid = false;
    } else if (isNaN(Number(service.price))) {
      newErrors.price = 'Price must be numeric';
      valid = false;
    }

    if (!service.type) {
      newErrors.type = 'Type is required';
      valid = false;
    }

    if (!service.imageUri) {
      newErrors.imageUri = 'Image is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validateFields()) return;

    setIsEditing(false);
    if (onUpdate) {
      onUpdate(service);
    }
    Alert.alert('Updated', 'Service details updated!');
  };

  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this service?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (onDelete) onDelete(service.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      const { uri, fileSize, type } = file;

      if (fileSize && fileSize > 2 * 1024 * 1024) {
        Alert.alert('Image too large', 'Please select an image under 2MB.');
        return;
      }

      if (type !== 'image/jpeg' && type !== 'image/png') {
        Alert.alert('Invalid file type', 'Only JPEG or PNG images are allowed.');
        return;
      }

      setService({ ...service, imageUri: uri });
      setErrors((prev) => ({ ...prev, imageUri: undefined }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Details</Text>
      </View>

      {service.imageUri ? (
        <Image source={{ uri: service.imageUri }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No image available</Text>
        </View>
      )}
      {errors.imageUri && <Text style={styles.errorText}>{errors.imageUri}</Text>}

      {isEditing && (
        <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
          <Text style={styles.changeImageText}>Change Image</Text>
        </TouchableOpacity>
      )}

      <View style={styles.detailBox}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.readOnlyInput]}
          value={service.name}
          editable={isEditing}
          onChangeText={(text) => {
            setService({ ...service, name: text });
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          maxLength={30}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.readOnlyInput]}
          value={service.price}
          editable={isEditing}
          keyboardType="numeric"
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9.]/g, '');
            setService({ ...service, price: numericText });
            setErrors((prev) => ({ ...prev, price: undefined }));
          }}
          maxLength={8}
        />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <Text style={styles.label}>Type</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.readOnlyInput]}
          value={service.type}
          editable={isEditing}
          onChangeText={(text) => {
            setService({ ...service, type: text });
            setErrors((prev) => ({ ...prev, type: undefined }));
          }}
          maxLength={20}
        />
        {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
      </View>

      {isEditing ? (
        <>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setService(initialService);
              setIsEditing(false);
              setErrors({});
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  image: {
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
    width: '100%',
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  imagePlaceholderText: {
    color: '#999',
    fontSize: 16,
  },
  changeImageButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  changeImageText: {
    color: '#4b9ed6',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  detailBox: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginTop: 4,
  },
  readOnlyInput: {
    backgroundColor: '#eee',
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#4b9ed6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#999',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
