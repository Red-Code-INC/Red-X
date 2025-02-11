import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {CurrentVersion} from "./Data";
import {useTheme} from "./ThemeContext";
import Styles,{Red,Font} from "./Styles";

// const { darkMode, toggleDarkMode } = useTheme();

const AboutScreen = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <ScrollView style={[styles.container, {backgroundColor: darkMode ? "#222" : "#f5f5f5"}]}>
      <Text style={[styles.title, {color: darkMode ? "white" : "#333",fontFamily: Font()}]}>About Red X</Text>
      <Text style={[styles.description, {color: darkMode ? "#ccc" : "#555",fontFamily: Font()}]}>
      Current Version: <Text onPress={() => navigation.navigate('Versions')} style={{color:Red(),fontWeight:"bold",fontFamily: Font()}}>{CurrentVersion}</Text> {"\n\n"}
        Red X is an open source mobile app and member of the Red Code Family designed by Red Code INC to help developers find the best coding libraries 
        based on their needs. Answer a series of questions, and we'll recommend libraries that 
        match your preferences and project requirements.
      </Text>
      
      <Text style={[styles.subtitle, {color: darkMode ? "#ccc" : "#555",fontFamily: Font()}]}>How It Works</Text>
      <Text style={[styles.listItem, {color: darkMode ? "#bbb" : "#444",fontFamily: Font()}]}>✓ Answer multiple-choice questions.</Text>
      <Text style={[styles.listItem, {color: darkMode ? "#bbb" : "#444",fontFamily: Font()}]}>✓ Get recommendations based on your responses.</Text>
      <Text style={[styles.listItem, {color: darkMode ? "#bbb" : "#444",fontFamily: Font()}]}>✓ Discover new libraries to boost your coding efficiency.</Text>

      {/* Back to Home Button */}
      <TouchableOpacity style={[styles.button,{backgroundColor: Red()}]} onPress={() => navigation.navigate('Home')}>
        <Text style={[styles.buttonText,{fontFamily: Font()}]}>Go Back to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,{backgroundColor: Red()}]} onPress={() => navigation.navigate('Versions')}>
        <Text style={[styles.buttonText,{fontFamily: Font()}]}>Versions</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginLeft: 1,
    // textAlign: 'center',
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
