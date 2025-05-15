import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type Service = {
  id: string;
  title?: string;
  image?: string;
  isAdd?: boolean;
};

const SalonInterfaceHome = (props: { navigation: any; route?: any; params?: any }) => {
  const route = props;

  const [text, settext] = useState('Beauty Salon');
  const [image, setImage] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Make UP',
      image: "https://via.placeholder.com/150",
    },
  ]);
  useEffect(() => {
    if (route?.params?.currentUser) {
      settext(route.params.currentUser);
    }
    if (route?.params?.currentImage) {
      setImage(route.params.currentImage);
    }
  }, [route?.params]);
  const renderItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.card}
    // onPress={() => navigation.navigate('ServiceDetails', { service: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.headerImage}
      />
      <Text style={styles.heading}>Her_Beauty Salon</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('EditSalonDetails', {
        currentUser: text,
        currentImage: image,
      })}>
        <Feather name="edit-3" size={18} color="" style={styles.Icon1} />
      </TouchableOpacity>

      <FlatList
        data={[...services, { id: 'add', isAdd: true }]}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }: { item: Service }) =>
          item.isAdd ? (
            <TouchableOpacity
              style={styles.addCard}
              onPress={() => props.navigation.navigate('AddService')}
            >
              <Text style={styles.addIcon}>＋</Text>
            </TouchableOpacity>
          ) : (
            renderItem({ item })
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  Icon1: {
    marginLeft: 300,
    marginBlockEnd: 15,
    // marginStart:30,
    marginBlockStart: -40,

  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#1F6357',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
  },
  image: {
    // width: (width - 40) / 2,
    height: 100,
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  closeText: {
    color: '#000',
    fontSize: 16,
  },
  addCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
    justifyContent: 'center'
  },
  addIcon: {
    fontSize: 40,
    color: '#888',
    marginLeft: 60,
  },
});

export default SalonInterfaceHome;
