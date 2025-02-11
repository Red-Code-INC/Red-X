import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {ThemeProvider, useTheme,useFont} from "./ThemeContext";
import {CurrentVersion} from "./Data";
import Styles, {Red,Font} from "./Styles"

// const red = Red;
// console.log(red);

const HomeScreen = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const {font} = useFont()
  // const {lowRed,toggleLowRed} = useLowRed();
  return (
    <View style={[styles.container, Styles().container]}>
      
      <Text style={[styles.title, {color: darkMode ? "#fff" : "#333",fontFamily: Font()}]}>Welcome to <Text style={{color:Red()}}>Red</Text> X{"\n"} <Text style={[styles.version, {color: darkMode ? "#ccc" : "gray"}]}>{CurrentVersion}</Text></Text>
      <Text style={[styles.description, {color: darkMode ? "#eee" : "#555",fontFamily: Font()}]}>
        This app will recommend the best code libraries based on your preferences.
      </Text>

      {/* Button to start the quiz */}
      <TouchableOpacity style={[styles.button,{backgroundColor: Red()}]} onPress={() => navigation.navigate('Quiz')}>
        <Text style={[styles.buttonText,{fontFamily: Font()}]}>Start Quiz</Text>
      </TouchableOpacity>

      {/* Button to navigate to other screens (optional) */}
      <TouchableOpacity style={[styles.button,{backgroundColor: Red()}]} onPress={() => navigation.navigate('About')}>
        <Text style={[styles.buttonText,{fontFamily: Font()}]}>About Us</Text>
      </TouchableOpacity>
      <Text style={styles.aligner}></Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },
  description: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 90,
  },
  button: {
    // backgroundColor: lowRed ? "#e60000" : "red",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    // marginBottom: 50,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  aligner: {
    marginBottom: 75
  },
  version: {
    fontSize: 11,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'gray',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    fontSize: 9,
    color:'gray'
  }
});

export default HomeScreen;