import React from 'react';
import { useTheme , useLargeText, useLowRed, useFont} from './ThemeContext';
// import { useLargeText } from './LargeTextContext';
import { StyleSheet } from 'react-native';

const Styles = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { largeText, toggleLargeText } = useLargeText();
  const { lowRed, toggleLowRed } = useLowRed();
  const {font} = useFont
  

  return StyleSheet.create({
    container: {
      flex: 1,
      fontFamilt: font,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'red',
      backgroundColor: darkMode ? '#222' : '#f5f5f5',
      color: darkMode ? "black" : "white",
    },
    text: {
      fontSize: largeText ? 24 : 16,
      fontFamily: font,
      color: darkMode ? '#eee' : '#555',
    },
    redBg: {
      backgroundColor: lowRed ? "#e60000" : "red",
    },
    redText: {
      color: lowRed ? "#e60000" : 'red',
    },
    button: {
      marginTop: 10,
      padding: 10,
      backgroundColor: darkMode ? '#444' : '#ddd',
      borderRadius: 5,
    },
    buttonText: {
      fontSize: largeText ? 18 : 14,
      color: darkMode ? '#fff' : '#000',
    },
  });
};
const RRed = [
  "NONE",
  "#FF0000",
  "#E60000",
  "#C00000",
  "#880000",
  "#5B0000",
  "#550000",
  "#4F0000",

]
export const Red = () => {
  const { lowRed, toggleLowRed } = useLowRed();
  const red = lowRed ? "#c00000" : 'red';
  return red;
};
export const Red2 = () => {
  const { lowRed, toggleLowRed } = useLowRed();
  const red = lowRed ? "#880000" : '#e60000';
  return red;
}
export const Red3 = () => {
  const { lowRed, toggleLowRed } = useLowRed();
  const red = lowRed ? "#5B0000" : '#c00000';
  return red;
}
export const Red4 = () => {
  const { lowRed, toggleLowRed } = useLowRed();
  const red = lowRed ? "#550000" : '#880000';
  return red;
}
export const Red5 = () => {
  const { lowRed, toggleLowRed } = useLowRed();
  const red = lowRed ? "#4F0000" : '#5B0000';
  return red;
}
export const Font = () => {
  const {font, setFont} = useFont();
  return font;
}

// const Styles = new RedXStyles();
export default Styles;
