import { View, ScrollView,Image,Text , StyleSheet} from "react-native";

const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  return (
    <View style={carouselStyles.container}>
      <Text style={carouselStyles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={carouselStyles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
};

const carouselStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#ccc',
  },
});
export default ImageCarousel;