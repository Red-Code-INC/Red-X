import React, {useState} from 'react';
import {Dimensions, ScrollView,TextInput,View, Text, StyleSheet,Modal, FlatList,TouchableOpacity } from 'react-native';
import { Versions, CurrentVersion } from './Data'; // Importing from Data.js
import {useTheme,useFont} from "./ThemeContext";
import Styles,{Red,Red2,Font} from "./Styles";
import { Ionicons, Octicons } from '@expo/vector-icons';

const {width} = Dimensions.get('window')
// const scale = width < 1440 ? 0.75 : 1.00
var scale = 1
if (width === 1366){
  scale = 0.75
}

const VersionsScreen = ({navigation}) => {
  const {darkMode, toggleDarkMode} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [versions,setVersions] = useState(Versions)
  const [initial,setInitial] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputBgColorLight,setInputBgColorLight] = useState("#fff");
  const [inputBgColorDark,setInputBgColorDark] = useState("#333");
  const {font} = useFont();

  // let initial = true;
  const openModal = (item) => {
    setSelectedVersion(item);
    setModalVisible(true);
  };
  const changeOrder = () => {
    setVersions([...versions.reverse()])
    setInitial(!initial);
  }

  const clearSearch = () => {
    setSearchQuery('');
    // setFilteredData(data);
  };

  const setInputBgColor = (l,d) => {
    setInputBgColorLight(l);
    setInputBgColorDark(d);
  }


  const filteredVersions = versions.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.date.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // const Style = Styles();
  return (
    <View style={{backgroundColor: darkMode ? "#222" : "#f5f5f5",flex:1}}>
      <TextInput
        style={[
          styles.searchBar, 
          { 
            backgroundColor: darkMode ? inputBgColorDark : inputBgColorLight,
            color: darkMode ? "white" : "default", 
            width:(width*0.9)*(scale === 0.75 ? 1.31*scale : scale),
            borderColor: darkMode ? "white" : "lightgray",
            position:'absolute',
            outline: 'none',
            top:95,
            left:20*scale,
            zIndex:1000, 
          }
        ]}
        placeholder="Search versions..."
        placeholderTextColor={"gray"}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFocus={() => setInputBgColor("#f1f1f1","black")}
        onBlur={() => setInputBgColor("#fff","#333")}
      />
      {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={clearSearch} 
            style={styles.clearButton}
            onMouseEnter={() => setHoveredIndex("Clear")}
            onMouseLeave={() => setHoveredIndex(null)}
            >
            <Ionicons name="close" size={30*scale} color={hoveredIndex === "Clear" ? Red2() : Red()} />
          </TouchableOpacity>
        )}
      
      <TouchableOpacity 
      style={[styles.closeButton,{padding: 15,width:(width*0.085)*(scale === 0.75 ? 1.20 : 1.00),zIndex:100,position:'absolute',top:95,right:scale === 0.75 ? 2 : 5,backgroundColor: hoveredIndex === "order" ? Red2() : Red()}]} 
      onPress={changeOrder}
      onMouseEnter={() => setHoveredIndex("order")}
      onMouseLeave={() => setHoveredIndex(null)}
      >
        <Text 
        style={[styles.closeButtonText,{textAlign: 'center', fontFamily: Font(),fontSize: 18 * scale,}]}
        >Most Recent{" "}
        {initial ? <Ionicons size={15*scale} name={"chevron-up"}/> : <Ionicons size={15*scale} name={"chevron-down"}/>}
        </Text>
      </TouchableOpacity>
    <View style={[styles.container,{backgroundColor: darkMode ? "#222" : "#f5f5f5"}]}>
      <Text style={[styles.header,{color: darkMode ? "white" : "default", fontFamily: Font() }]}>Versions</Text>
      
      {/* Display Current Version */}
      <Text style={[styles.currentVersion,{color: darkMode ? "#ccc" : "#333",marginBottom:70, fontFamily: Font() }]}>Current Version: {CurrentVersion}</Text>
      
      <ScrollView style={{flex:1,width:width*0.985,height:"100%",backgroundColor: darkMode ? "#222" : "#f5f5f5"}}>
      {/* Display Versions list */}
      <FlatList
        data={filteredVersions}
        keyExtractor={(item, index) => index.toString()} // Use index as key
        extraData={filteredVersions}
        renderItem={({ item }) => (
          <TouchableOpacity 
          style={[styles.versionItem,{backgroundColor: hoveredIndex === item.name ? (darkMode ? "#555" : "lightgray") : (darkMode ? "#222" : "#f5f5f5")}]} 
          onPress={() => openModal(item)}
          onMouseEnter={() => setHoveredIndex(item.name)}
          onMouseLeave={() => setHoveredIndex(null)}
          >
            <Text style={[styles.versionsText,{color: darkMode ? "#eee" : "default",fontFamily: font}]}>{item.name}</Text>
            <Text style={{color: darkMode ? "#888" : "#555", fontFamily: font}}>{item.message}</Text>
            <Text style={[styles.date,{color: darkMode ? "#ddd" : "gray", fontFamily: font}]}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: darkMode ? '#333' : 'white' }]}>
            <Text style={[styles.modalTitle, { color: darkMode ? 'white' : 'black', fontFamily: font }]}>
              {selectedVersion?.name}
            </Text>
            <Text style={[styles.modalDescription, { color: darkMode ? '#ccc' : '#555', fontFamily: font }]}>
              {selectedVersion?.description}
            </Text>
            <Text style={[styles.modalDate, { color: darkMode ? '#ddd' : 'gray', fontFamily: font }]}>
              Released: {selectedVersion?.date}
            </Text>
            <TouchableOpacity 
            onPress={() => setModalVisible(false)} 
            onMouseEnter={() => setHoveredIndex('close')}
            onMouseLeave={() => setHoveredIndex(null)}
            style={[
              styles.closeButton,
              {
                backgroundColor: hoveredIndex === "close" ? Red2() : Red(),
                justifyContent: 'center',
                alignSelf: 'center',
              }
            ]}>
              <Text style={[styles.closeButtonText,{fontFamily: font}]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position:'absolute',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  currentVersion: {
    fontSize: 21,
    marginBottom: 20,
    fontWeight: '600',
    color: '#333',
  },
  versionItem: {
    fontSize: 22,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  date: {
    fontSize: 18,
    position: 'absolute', // Fixed issue with 'fixed'
    top: 1,
    right: 7,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '50%',
    padding: 20,
    borderRadius: 10,
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 21,
    // textAlign: 'center',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    // width:'25%',
    textAlign: 'center',
  },
  versionsText: {
    fontSize: 18,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchBar: {
    fontSize: 21,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 15,
  },
  clearButton: {
    position:'absolute',
    top:95,
    // right:"20%",
    padding:5,
    right:150,
    zIndex:1002,
  },
});

export default VersionsScreen;
