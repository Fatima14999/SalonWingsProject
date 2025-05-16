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
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';

const EditProfile = (props: { navigation: any; route: any }) => {
  const { navigation, route } = props;
  const { currentUser, currentImage } = route.params;

  const [newUser, setNewUser] = useState(currentUser);
  const [newImage, setNewImage] = useState<string | null>(currentImage);

  const handleImageOptions = () => {
    Alert.alert(
      'Update Profile Picture',
      '',
      [
        {
          text: 'Take Photo',
          onPress: () => openCamera(),
        },
        {
          text: 'Choose from Photos',
          onPress: () => openLibrary(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const openLibrary = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      const uri = response.assets && response.assets[0]?.uri;
      if (uri) setNewImage(uri);
    });
  };

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) return;
      const uri = response.assets && response.assets[0]?.uri;
      if (uri) setNewImage(uri);
    });
  };

  const handleSave = () => {
    navigation.navigate('My Salons', {
      screen: 'Profile',
      params: {
        currentUser: newUser,
        currentImage: newImage,
      },
    });
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
                {newUser?.trim()?.charAt(0)?.toUpperCase() || '👤'}
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

export default EditProfile;
