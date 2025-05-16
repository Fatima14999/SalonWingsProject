import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SetNewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Improved regex: allow any special character
  const isValidPassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (newPassword.length > 0 && !isValidPassword(newPassword)) {
        setPasswordError('Password must be at least 8 characters long, include uppercase, lowercase, and a special character.');
      } else {
        setPasswordError('');
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [newPassword]);

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage('Please fill in both fields');
      return;
    }
    if (!isValidPassword(newPassword)) {
      setErrorMessage('Password does not meet requirements');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    // setNewPassword('');
    // setConfirmPassword('');
    // setErrorMessage('');
    // setPasswordError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={!isPasswordVisible}
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            setErrorMessage('');
          }}
          placeholder="New Password"
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <MaterialIcons
            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
            size={20}
            color="#333"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Show Password Error */}
      {passwordError !== '' && (
        <Text style={styles.errorText}>{passwordError}</Text>
      )}

      <Text style={styles.label}>Confirm New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrorMessage('');
          }}
          placeholder="Confirm Password"
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <MaterialIcons
            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
            size={20}
            color="#333"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Show Confirm Password Error */}
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBlockStart:70,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10, // Reduced padding to make input smaller
    fontSize: 16,
    height: 45, // Fixed height for the input field
  },
  icon: {
    padding: 10, // Space around the icon
  },
  button: {
    backgroundColor: '#1F6357',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
