import React, {useState} from 'react';
import {Dimensions, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {ThemeProvider, useTheme,useFont} from "./ThemeContext";
import {CurrentVersion} from "./Data";
import Styles, {Red,Red2,Red3} from "./Styles"


const {width,height} = Dimensions.get('window')

var scale = 1
if (width === 1366){
  scale = 0.75
}
// const red = Red;
// console.log(red);
// alert(width);
// alert(height);

const HomeScreen = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { font} = useFont();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // const {lowRed,toggleLowRed} = useLowRed();
  return (
    <View style={[styles.container, Styles().container]}> 
      <Text style={[styles.title, {color: darkMode ? "#fff" : "#333",fontFamily: font}]}><Text style={{color:Red()}}>Red</Text> X{"\n"} <Text style={[styles.version, {color: darkMode ? "#ccc" : "gray"}]}>{CurrentVersion}</Text></Text>
      <Text style={[styles.description, {color: darkMode ? "#eee" : "#555",fontFamily: font}]}>
        This site will recommend the best code libraries based on your preferences.
      </Text>

      {/* Button to start the quiz */}
      <TouchableOpacity 
      style={[
        styles.button,
        {
          bottom: (9*16)*scale,
          backgroundColor: hoveredIndex === "Quiz" ? Red2() : Red(),
        }
      ]} 
      onPress={() => navigation.navigate('Quiz')}
      onMouseEnter={() => setHoveredIndex("Quiz")}
      onMouseLeave={() => setHoveredIndex(null)}
      >
        <Text style={[styles.buttonText,{fontFamily: font}]}>Start Quiz</Text>
      </TouchableOpacity>

      {/* Button to navigate to other screens (optional) */}
      <TouchableOpacity 
      style={[
        styles.button,
        {
          bottom: (5*16)*(scale === 0.75 ? 0.5 : 1.0), 
          backgroundColor: hoveredIndex === "About" ? Red2() : Red()
        }
      ]} 
      onPress={() => navigation.navigate('About')}
      onMouseEnter={() => setHoveredIndex("About")}
      onMouseLeave={() => setHoveredIndex(null)}
      >
        <Text style={[styles.buttonText,{fontFamily: font}]}>About Us</Text>
      </TouchableOpacity>
      <Text style={styles.aligner}></Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // position: absolute
    width: "100%",
    justifyContent: 'left',
    alignItems: 'left',
    textAlign: 'left',
    alignSelf: 'left',
    padding: 20,
    // backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 70,
    position: 'absolute',
    left: '1.5em',
    top: '1.5em',
    fontWeight: 'bold',
    color: '#333',
    // textAlign: 'left',
    // justifyContent: 'left',
    // alignSelf: 'left',
    // marginBottom: 50,
  },
  description: {
    fontSize: 21,
    position: 'absolute',
    left: '5em',
    top: '12em',
    color: '#555',
    textAlign: 'left',
    alignSelf: 'left',
    marginBottom: 90,
  },
  button: {
    position: 'absolute',
    // backgroundColor: lowRed ? "#e60000" : "red",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    // marginTop: 50,
    // marginBottom: 50,
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aligner: {
    marginBottom: 75
  },
  version: {
    position: 'absolute',
    top: '4.5em',
    fontSize: 15,
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