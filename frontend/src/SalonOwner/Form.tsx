import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PhoneInput from '@linhnguyen96114/react-native-phone-input';
import { MaskedTextInput } from 'react-native-mask-text';

const Form1 = (props: { navigation: { navigate: (arg0: string) => void } }) => {
  const [salonName, setSalonName] = useState('');
  const [salonOwnerName, setSalonOwnerName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [cnic, setCnic] = useState('');

  const [errors, setErrors] = useState({
    salonOwnerName: '',
    salonName: '',
    contactNo: '',
    cnic: '',
  });

  const handleNext = () => {
    const newErrors: any = {};

    if (!salonOwnerName.trim()) newErrors.salonOwnerName = 'Salon Owner Name is required.';
    if (!salonName.trim()) newErrors.salonName = 'Salon Name is required.';
    if (!contactNo.trim()) {
      newErrors.contactNo = 'Phone Number is required.';
    } else {
      const phoneNumberWithoutPlus = contactNo.replace('+', '').replace(/\s/g, '');
      if (phoneNumberWithoutPlus.length < 11 || phoneNumberWithoutPlus.length > 12) {
        newErrors.contactNo = 'Phone Number must be 11 or 12 digits.';
      }
    }

    if (!cnic.trim()) {
      newErrors.cnic = 'CNIC Number is required.';
    } else if (cnic.length !== 13) {
      newErrors.cnic = 'CNIC must be exactly 13 digits.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({ salonOwnerName: '', salonName: '', contactNo: '', cnic: '' });
      props.navigation.navigate("Identification Details");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Salon Owner Name */}
          <TextInput
            style={styles.textInput}
            placeholder="Salon Owner Name"
            placeholderTextColor="#888"
            onChangeText={(text) => {
              setSalonOwnerName(text);
              setErrors({ ...errors, salonOwnerName: '' });
            }}
            value={salonOwnerName}
          />
          {errors.salonOwnerName ? <Text style={styles.errorText}>{errors.salonOwnerName}</Text> : null}

          {/* Salon Name */}
          <TextInput
            style={styles.textInput}
            placeholder="Salon Name"
            placeholderTextColor="#888"
            onChangeText={(text) => {
              setSalonName(text);
              setErrors({ ...errors, salonName: '' });
            }}
            value={salonName}
          />
          {errors.salonName ? <Text style={styles.errorText}>{errors.salonName}</Text> : null}

          {/* Phone Input */}
          <PhoneInput
            defaultValue={contactNo}
            defaultCode="PK"
            layout="first"
            onChangeFormattedText={(text) => {
              setContactNo(text);
              setErrors({ ...errors, contactNo: '' });
            }}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.phoneTextContainer}
            textInputStyle={{ color: 'black' }}
            codeTextStyle={{ color: 'black' }}
            withDarkTheme={false}
            withShadow={false}
          />
          {errors.contactNo ? <Text style={styles.errorText}>{errors.contactNo}</Text> : null}

          {/* CNIC Input */}
          <MaskedTextInput
            style={styles.textInput}
            mask="99999-9999999-9"
            placeholder="CNIC Number"
            placeholderTextColor="#888"
            keyboardType="numeric"
            onChangeText={(text, rawText) => {
              setCnic(rawText);
              setErrors({ ...errors, cnic: '' });
            }}
            value={cnic}
          />
          {errors.cnic ? <Text style={styles.errorText}>{errors.cnic}</Text> : null}

          {/* Location Section */}
          <Text style={styles.subtitle}>Select Salon Location</Text>

          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationButtonText}>Use My Current Location</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  safeArea: { flex: 1 },
  scrollContent: { padding: 20 },
  textInput: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 4,
  },
  phoneContainer: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    marginBottom: 4,
    width: '100%',
    backgroundColor: 'white',
  },
  phoneTextContainer: {
    backgroundColor: 'white',
    paddingVertical: 0,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
    marginTop: 10,
  },
  locationButton: {
    backgroundColor: '#E0F2FE',
    borderColor: '#0284C7',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  locationButtonText: {
    fontSize: 16,
    color: '#0284C7',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#1F6357',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 10,
    width: 299,
    marginTop: 10,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 7,
    marginLeft: 5,
    fontSize: 13,
  },
});

export default Form1;
