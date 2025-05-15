import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const Form2 = () => {
  const [cnicImages, setCnicImages] = useState<string[]>([]);
  const [salonImages, setSalonImages] = useState<string[]>([]);
  const [gender, setGender] = useState<string>("");

  const pickCnicImages = () => {
    launchImageLibrary({ mediaType: "photo", selectionLimit: 5 }, (response) => {
      if (response.assets) {
        setCnicImages((prevImages) => [
          ...prevImages,
          ...response.assets.map((img) => img.uri ?? ""),
        ]);
      }
    });
  };

  const pickSalonImages = () => {
    launchImageLibrary({ mediaType: "photo", selectionLimit: 5 }, (response) => {
      if (response.assets) {
        setSalonImages((prevImages) => [
          ...prevImages,
          ...response.assets.map((img) => img.uri ?? ""),
        ]);
      }
    });
  };

  const GenderOption = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
    <TouchableOpacity style={styles.genderOption} onPress={onPress}>
      <View style={[styles.checkbox, selected && styles.checkboxSelected]} />
      <Text style={styles.genderText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* CNIC Upload Box */}
      <TouchableOpacity style={styles.uploadBox} onPress={pickCnicImages}>
        {cnicImages.length > 0 ? (
          <View style={styles.imageWrapper}>
            {cnicImages.slice(0, 2).map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.image} />
            ))}
            {cnicImages.length > 2 && (
              <View style={styles.countOverlay}>
                <Text style={styles.countText}>+{cnicImages.length - 2}</Text>
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.uploadText}>Upload CNIC Picture</Text>
        )}
      </TouchableOpacity>

      {/* Salon Upload Box */}
      <TouchableOpacity style={styles.uploadBox1} onPress={pickSalonImages}>
        {salonImages.length > 0 ? (
          <View style={styles.imageWrapper}>
            {salonImages.slice(0, 2).map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.image} />
            ))}
            {salonImages.length > 2 && (
              <View style={styles.countOverlay}>
                <Text style={styles.countText}>+{salonImages.length - 2}</Text>
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.uploadText}>Upload Salon Picture</Text>
        )}
      </TouchableOpacity>

      {/* Gender Specific Section */}
      <View style={styles.genderSection}>
        <Text style={styles.genderTitle}>Gender Specific</Text>
        {["Male", "Female", "Both"].map((option) => (
          <GenderOption
            key={option}
            label={option}
            selected={gender === option}
            onPress={() => setGender(option)}
          />
        ))}
      </View>

      {/* JazzCash Button */}
      <TouchableOpacity style={styles.paymentBox}>
        <Image
          source={{ uri: 'https://seeklogo.com/images/J/jazz-cash-logo-55FAAA2551-seeklogo.com.png' }}
          style={{ width: 30, height: 30, marginRight: 10 }}
        />
        <Text style={styles.paymentText}>Add Payment Detail</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Request for Registered</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  uploadBox: {
    width: 320,
    height: 140,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    overflow: "hidden",
    position: "relative",
  },
  uploadBox1: {
    width: 320,
    height: 140,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    marginVertical: 10,
    marginBottom: 40,
    overflow: "hidden",
    position: "relative",
  },
  uploadText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  imageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: 5,
  },
  image: {
    width: "48%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
    marginHorizontal: 2,
  },
  countOverlay: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  countText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  genderSection: {
    width: "80%",
    marginBottom: 30,
  },
  genderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: "#2F7363",
    borderColor: "#2F7363",
  },
  genderText: {
    fontSize: 16,
    color: "#555",
  },
  paymentBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    backgroundColor: "#F8F8F8",
  },
  paymentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  submitButton: {
    width: "80%",
    backgroundColor: "#2F7363",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    elevation: 3,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Form2;
