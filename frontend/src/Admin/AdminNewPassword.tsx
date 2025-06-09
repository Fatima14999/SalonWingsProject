import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AdminNewPassword = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const handleChangePassword = async () => {
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
    const res = await fetch('http://10.0.2.2:3000/Admin', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: newPassword
      }),
    });
    if (res.status === 200) {
      setErrorMessage('');
      console.log('Sucessful Update')
      props.navigation.navigate('AdminProfile');
    } else {
      setErrorMessage('Password Not Update');
    }
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
        <TouchableOpacity onPress={() => setIsPasswordVisible(isPasswordVisible)}>
          <MaterialIcons
            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
            size={20}
            color="#333"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
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
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminNewPassword;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBlockStart: 70,
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
    paddingVertical: 10,
    fontSize: 16,
    height: 45,
  },
  icon: {
    padding: 10,
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
