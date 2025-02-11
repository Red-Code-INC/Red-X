import React,{useState} from 'react';
import { ScrollView,View, Text, StyleSheet,Dimensions, TouchableOpacity } from 'react-native';
import {CurrentVersion} from "./Data";
import {useTheme} from "./ThemeContext";
import Styles,{Red,Red2,Font} from "./Styles";

const {width} = Dimensions.get('window');
var scale = 1.00;

if (width === 1366){
  scale = 0.75;
} else if (width === 1920){
  scale = 1.00;
}

// const { darkMode, toggleDarkMode } = useTheme();

const AboutScreen = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [hoveredButton, setHoveredButton] = useState(null);
  return (
    <ScrollView style={[styles.container, {backgroundColor: darkMode ? "#333" : "#f5f5f5"}]}>
      <Text style={[styles.title, {color: darkMode ? "white" : "#333",fontFamily: Font()}]}>About Red X</Text>
      <View style={styles.other}>
        <Text style={[styles.description, {color: darkMode ? "#ccc" : "#555",fontFamily: Font()}]}>
          Current Version: <Text onPress={() => navigation.navigate('Versions')} style={{color:Red(),fontWeight:"bold"}}>{CurrentVersion}</Text> {"\n\n"}
          Red X is an open source website/mobile app and member of the Red Code Family designed by Red Code INC to help developers find the best coding libraries 
          based on their needs. Answer a series of questions, and we'll recommend libraries that 
          match your preferences and project requirements.
        </Text>
      
        <Text style={[styles.subtitle, {color: darkMode ? "#ccc" : "#555",fontFamily: Font()}]}>How It Works</Text>
        <Text style={[styles.listItem, {color: darkMode ? "#bbb" : "#444",fontFamily: Font()}]}>✓ Answer multiple-choice questions.</Text>
        <Text style={[styles.listItem, {color: darkMode ? "#bbb" : "#444",fontFamily: Font()}]}>✓ Get recommendations based on your responses.</Text>
        <Text style={[styles.listItem, {color: darkMode ? "#bbb" : "#444",fontFamily: Font()}]}>✓ Discover new libraries to boost your coding efficiency.</Text>
      </View>
      {/* Back to Home Button */}
      <TouchableOpacity 
      style={[styles.button,{top: 650*(scale/1.25),backgroundColor: hoveredButton === "Home" ? Red2() : Red(),fontFamily: Font()}]} 
      onPress={() => navigation.navigate('Home')}
      onMouseEnter={() => setHoveredButton("Home")}
      onMouseLeave={() => setHoveredButton(null)}
      >
        <Text style={styles.buttonText}>Go Back to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={[styles.button,{top: 725*(scale/1.22),backgroundColor: hoveredButton === "Versions" ? Red2() : Red(),fontFamily: Font()}]} 
      onPress={() => navigation.navigate('Versions')}
      onMouseEnter={() => setHoveredButton("Versions")}
      onMouseLeave={() => setHoveredButton(null)}
      >
        <Text style={styles.buttonText}>Versions</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 50 * scale,
    fontWeight: 'bold',
    color: '#333',
    // marginBottom: 20,
    position: 'absolute',
    top: 25,
    left: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
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
    padding: 15 * scale,
    borderRadius: 10,
    // marginTop: 20,
    position: 'absolute',
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  other: {
    position: 'absolute',
    top: 100,
    left: 35,
  }
});

export default AboutScreen;
