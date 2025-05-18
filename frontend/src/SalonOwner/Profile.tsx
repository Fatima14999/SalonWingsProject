import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import TabBarNavigation from '../Admin/TabBarNavigation';
// import LinearGradient from 'react-native-linear-gradient';

const Profile = (props: { navigation: any; route?: any }) => {
  const { navigation, route } = props;

  const [user, setUser] = useState('Hareem Fatima');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (route?.params?.currentUser) {
      setUser(route.params.currentUser);
    }
    if (route?.params?.currentImage) {
      setImage(route.params.currentImage);
    }
  }, [route?.params]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Header */}
      {/* <LinearGradient
        colors={['#1F6357', '#2C8C7C']}
        style={styles.headerBackground}
      /> */}

      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarLetter}>{user.charAt(0).toUpperCase()}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.editIcon}
            onPress={() =>
              navigation.navigate('EditProfile', {
                currentUser: user,
                currentImage: image,
              })
            }>
            <Feather name="edit-3" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>{user}</Text>
        <Text style={styles.userEmail}>fatimaghulammustafa@gmail.com</Text>
      </View>

      {/* List Items */}
      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.listItem}
        onPress={()=> props.navigation.navigate('ChangePassword')}>
          <View 
          // style={styles.iconCircle}
          >
            <Feather name="lock" size={20}
            //  color="white"
              />
          </View>
          <Text style={styles.listText}>Change Password</Text>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}  onPress={()=> props.navigation.navigate('Notifications')}>
         
          <View style={styles.iconCircle}>
            <Feather name="bell" size={20} color="white" />
          </View>
          <Text style={styles.listText}>Notifications</Text>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem} onPress={()=> props.navigation.navigate('TabBarNavigation')}>
          <View style={styles.iconCircle}>
            <Feather name="log-out" size={20} color="white" />
          </View>
          <Text style={styles.listText}>Logout</Text>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: -1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatarPlaceholder: {
    backgroundColor: '#ccc',
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
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarLetter: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#1F6357',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F1F1F',
    // marginTop: 0,
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 15,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  iconCircle: {
    backgroundColor: '#1F6357',
    padding: 10,
    borderRadius: 30,
  },
});

export default Profile;
