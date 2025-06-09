import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import ImagePicker from "react-native-image-crop-picker";

const AdminProfileEdit = (props: { navigation: any; route: any }) => {
  const { navigation, route } = props;
  const { currentUser, currentImage } = route.params;

  const [newUser, setNewUser] = useState(currentUser);
  const [newImage, setNewImage] = useState<string | null>(currentImage);
 const handleImagePick = (source: 'camera' | 'gallery') => {
    const options = {
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      mediaType:'photo' as 'photo',
    };
    const picker =
      source === 'camera'
        ? ImagePicker.openCamera
        : ImagePicker.openPicker;
         picker(options)
    .then((image) => {
      const base64Image = `data:${image.mime};base64,${image.data}`;
      setNewImage(base64Image);
    })
  };
    
  const handleImageOptions = () => {
    Alert.alert(
      'Update Profile Picture',
      '',
      [
        {
          text: 'Take Photo',
          onPress: () => handleImagePick('camera'),
        },
        {
          text: 'Choose from Photos',
          onPress: () => handleImagePick('gallery'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  const handleSave = async() => {
   const res = await fetch('http://10.0.2.2:3000/Admin', {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
     name: newUser,
     image: newImage

  }),})
  if (res.status === 200) {
      props.navigation.navigate('AdminProfile');
    } 
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleImageOptions}>
          {newImage ? (
            <Image source={{ uri: newImage }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {newUser?.trim()?.charAt(0)?.toUpperCase() || ''}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleImageOptions}>
          <Text style={styles.editPhotoText}>Edit Profile Photo</Text>
        </TouchableOpacity>

        <TextInput
          value={newUser}
          onChangeText={setNewUser}
          placeholder="Enter your name"
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    alignItems: 'center',
    paddingTop: 60,
  },
  avatarPlaceholder: {
    backgroundColor: '#E5E7EB',
    height: 120,
    width: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  avatarInitial: {
    fontSize: 36,
    color: '#374151',
    fontWeight: 'bold',
  },
  editPhotoText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  input: {
    marginTop: 30,
    fontSize: 16,
    borderBottomWidth: 1.5,
    borderColor: '#D1D5DB',
    width: '80%',
    textAlign: 'center',
    paddingBottom: 8,
    color: '#111827',
  },
  saveBtn: {
    marginTop: 40,
    paddingVertical: 14,
    paddingHorizontal: 60,
    backgroundColor: '#1F6357',
    borderRadius: 12,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdminProfileEdit;
