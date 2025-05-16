import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChangePassword = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  const handleVerifyPassword = () => {
    if (!currentPassword) {
      setErrorMessage('Please enter your current password');
      return;
    }
    else if (currentPassword === '123456') {
      setErrorMessage('');
      props.navigation.navigate('SetNewPassword');
    } else {
      setErrorMessage('Current password is incorrect');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Current Password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={!isPasswordVisible}  // Toggle visibility based on state
          style={styles.input}
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={(text) => {
            setCurrentPassword(text);
            setErrorMessage('');
          }}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
         <MaterialIcons name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={20} color="#333" style={{padding:10}}/>
        </TouchableOpacity>
      </View>

      {/* Error message */}
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleVerifyPassword}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    marginBlockStart:-150,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    // textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row', // Align input and button horizontally
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height:45,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 3,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#1F6357',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    width: 312,
    paddingHorizontal: 30,
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center', // Center the button horizontally
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
});
