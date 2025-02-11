import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Linking,Dimensions } from 'react-native';
import {useTheme,useLowRed,useLargeText,useFont} from "./ThemeContext";
import { Ionicons, Octicons } from '@expo/vector-icons';
import Styles,{Red,Font} from "./Styles";

const { width } = Dimensions.get('window') 

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data); // Show all items by default
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hover state
  const {darkMode, toggleDarkMode} = useTheme();
  const {lowRed, toggleLowRed} = useLowRed();
  const {font} = useFont(); 
  const fcolor = darkMode ? "black" : "lightgray";
  // const icolor = darkMode ? "#333" : "#fff";
  const [inputBgColorLight,setInputBgColorLight] = useState("#fff");
  const [inputBgColorDark,setInputBgColorDark] = useState("#333");

  const setInputBgColor = (l,d) => {
    setInputBgColorLight(l);
    setInputBgColorDark(d);
  }

  const handleSearch = (text) => {
    setSearchQuery(text);
    

    if (text.trim() === '') {
      setFilteredData(data); // Reset to all items when search is cleared
      return;
    }

    const searchKeywords = text.toLowerCase().split(' ');

    const filtered = data
      .map((item) => {
        const allKeywords = [item.name.toLowerCase(), ...item.keywords];

        const matchCount = searchKeywords.reduce(
          (count, keyword) => count + allKeywords.filter(word => word.includes(keyword)).length,
          0
        );

        return matchCount > 0 ? { ...item, score: matchCount } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score);

    setFilteredData(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredData(data);
  };

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't open link", err));
  };

  const onHoverIn = (index) => setHoveredIndex(index);
  const onHoverOut = () => setHoveredIndex(null);

  return (
    <View style={[styles.container,{backgroundColor: Styles().container.backgroundColor}]}>
    <View style={[styles.searchContainer,{backgroundColor: Red()}]}>
      <Ionicons size={18} style={[styles.searchIcon,{backgroundColor:Red(),borderColor: Red()}]} name={"search"}/>
      <TextInput
        style={[styles.searchInput,{
          backgroundColor: darkMode ? inputBgColorDark : inputBgColorLight,
          color: darkMode ? "white" : "default",
          borderColor: Red(),
          }]}
        placeholder="Search..."
        placeholderTextColor= {darkMode ? "lightgray" : "gray"}
        value={searchQuery}
        onChangeText={handleSearch}
        onFocus={
          () => setInputBgColor("#f1f1f1","black")
          }
        onBlur={
          () => setInputBgColor("#fff","#333")
          }
        // onFocus={this.style={backgroundColor:"black"}}
      />
      {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={Red()} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.aligner}/>
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => openLink(item.link)}
            onMouseEnter={() => onHoverIn(index)} // Hover in (for web, if supported)
            onMouseLeave={onHoverOut} // Hover out (for web, if supported)
            style={[
              styles.item,
              hoveredIndex === index && 
              (darkMode ? styles.itemHoveredDark : styles.itemHoveredLight),
              {borderBottomColor: darkMode ? "#212" : "#ddd"}
            ]}
          >
            <Text style={[styles.itemText,{color: lowRed ? "#e60000" : "red",fontFamily: font}]}>{item.name}</Text>
            <Text
              style={styles.itemLink}
              onPress={() => openLink(item.link)}
            >
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
// Data with names, keywords, and links
const data = [
  { 
    name: 'Red Script', 
    keywords: [
      'red', 'script', 'javascript', 'library', 'typscript' ,'html', 'css', 'general', 'active', 'webdevelopment', 'mobile', 'jquery', 'react'
      ],
    link: 'https://redscript.netlify.app' 
  },
  { 
    name: 'Red CSS', 
    keywords: [
      'red', 'css', 'webdevelopment', 'css', 'library', 'active'
      ], 
    link: 'https://redcss.netlify.app' 
  },
  { 
    name: 'Red HTML', 
    keywords: [
      'red', 'library', 'active', 'javascript', 'html', 'webdevelopment'
      ],
    link: 'https://redhtml.netlify.app' 
  },
  { 
    name: 'Red Icons', 
    keywords: [
      'red', 'library', 'active', 'css', 'icons', 'webdevelopment'
      ],
    link: 'https://redicons.netlify.app'
  },
  { 
    name: 'Red Y', 
    keywords: [
      'red', 'library',"javascript" , 'react native', 'mobile', 'active'
      ], 
    link: 'https://red-y.netlify.app' 
  },
  { 
    name: 'Red Z', 
    keywords: [
      'red', 'mobile', 'javascript', 'react native','webdevelopment','app', 'active'
      ], 
    link: 'https://redc.netlify.app/c' 
  },
  { 
    name: 'Red Python', 
    keywords: [
      'red', 'library', 'python',"rython" , 'general','active'
      ], 
    link: 'https://rython.netlify.app' 
  },
  { 
    name: 'Red Java', 
    keywords: [
      'red', 'library',"java" , 'general', 'active'
      ], 
    link: 'https://redjava.netlify.app' 
  },
  { 
    name: 'Red C', 
    keywords: [
      'red', 'library', 'c','general', 'active'
      ], 
    link: 'https://redc.netlify.app/c' 
  },
  { 
    name: 'Red Plus', 
    keywords: [
      'red', 'library', 'c', "plus", "c++",'general', 'active'
      ], 
    link: 'https://redc.netlify.app/plus' 
  },
  { 
    name: 'Red Sharp', 
    keywords: [
      'red', 'library', "c#", "sharp", 'c','general', 'active'
      ], 
    link: 'https://redc.netlify.app/sharp' 
  },
  
  { 
    name: 'Red Vault', 
    keywords: [
      'red', 'database', "sql", "json", 'information','data','storage','vault', 'active'
      ], 
    link: 'https://redvault.netlify.app' 
  },
  { 
    name: 'Red Jarvis', 
    keywords: [
      'red', 'jarvis', "ai", "html","css","javascript",'information', 'active'
      ], 
    link: 'https://redjarvis.netlify.app' 
  },
  { 
    name: 'Red Swift', 
    keywords: [
      'red', 'library', 'swift','general', "rift", "apple", 'active'
      ], 
    link: 'https://redswift.netlify.app' 
  },
  { 
    name: 'Red Rust', 
    keywords: [
      'red', 'library', 'rust','general', 'active'
      ], 
    link: 'https://redrust.netlify.app' 
  },
  { 
    name: 'Red TypeScript', 
    keywords: [
      'red', 'library', 'javascript', 'script', 'typescript', 'webdevelopment','general', 'active'
      ], 
    link: 'https://redscript.netlify.app/typescript' 
  },
  { 
    name: 'Red Echo', 
    keywords: [
      'red', 'library', 'echo', 'php', 'backend', 'webdevelopment','general', 'active'
      ], 
    link: 'https://redecho.netlify.app' 
  },
  { 
    name: 'Red Blitz', 
    keywords: [
      'red', 'library', 'go', 'blitz', 'typescript', 'general', 'active'
      ], 
    link: 'https://redblitz.netlify.app' 
  },
  { 
    name: 'Red Krypt', 
    keywords: [
      'red', 'library', 'krypt', 'kotlin', 'java', 'general', 'active'
      ], 
    link: 'https://redkrypt.netlify.app' 
  },
  { 
    name: 'Red Orbit', 
    keywords: [
      'red', 'library', 'orbit', 'lua','general', 'active'
      ], 
    link: 'https://redorbit.netlify.app' 
  },
  { 
    name: 'Red Ruby', 
    keywords: [
      'red', 'library', 'ruby', 'general', 'active'
      ], 
    link: 'https://redruby.netlify.app' 
  },
  { 
    name: 'Red R', 
    keywords: [
      'red', 'library', 'r','general', 'active'
      ], 
    link: 'https://redr.netlify.app' 
  },
  { 
    name: 'Red Flat', 
    keywords: [
      'red', 'library', 'f#','c#','microsoft', 'flat', 'general', 'active'
      ], 
    link: 'https://redflat.netlify.app' 
  },
  { 
    name: 'Red Haskell', 
    keywords: [
      'red', 'library', 'haskell','general', 'active'
      ], 
    link: 'https://redhaskell.netlify.app' 
  },
  { 
    name: 'Red D', 
    keywords: [
      'red', 'library', 'c', 'd', 'c++','general', 'active'
      ], 
    link: 'https://red-d.netlify.app' 
  },
  { 
    name: 'Red Object', 
    keywords: [
      'red', 'library', 'c', 'objective-c', 'general', 'active'
      ], 
    link: 'https://redobject.netlify.app' 
  },
  { 
    name: 'Red Red', 
    keywords: [
      'red', 'library','general', 'active'
      ], 
    link: 'https://redred.netlify.app' 
  },
  { 
    name: 'Red G', 
    keywords: [
      'red', 'library', 'javascript', 'sub-library', 'script', 'google', 'webdevelopment','general', 'active'
      ], 
    link: 'https://redscript.netlify.app/g' 
  },
  
  
];

console.log(data.length)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'red',
    width: "80%",
    outline: 'none',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 1,
    zIndex: 1001,
  },
  item: {
    padding: 2.5,
    fontSize: 28,
    borderBottomWidth: 1,
    // paddingBottom:0,
    borderBottomColor: '#ddd',
  },
  itemHoveredLight: {
    backgroundColor: '#ddd',
  },
  itemHoveredDark: {
    backgroundColor: "#444",
  },
  itemText: {
    color: 'red',
    fontSize: 18,
  },
  itemLink: {
    color: 'green',
    textDecorationLine: 'underline',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Corrected from 'left'
    alignItems: 'center',
    backgroundColor: '#ff0000',
    zIndex: 1000,
    position: 'absolute', // Fixed issue with 'fixed'
    top: 0,
    left: 0,
    width: width,
    paddingBottom: 5,
  },
  searchIcon: {
    padding: 10,
    borderColor: "red",
    borderWidth: 1,
    marginTop: 1,
    backgroundColor: "red",
    color: "white",
    zIndex: 1001,
  },
  aligner: {
    paddingBottom: 30,
  },
  clearButton: {
    position:'absolute',
    right:45,
    zIndex:1002,
  },
});

// export default styles;


export default SearchScreen;
