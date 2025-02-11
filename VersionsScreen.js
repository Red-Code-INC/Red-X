import React, {useState} from 'react';
import { ScrollView,View, Text, StyleSheet,Modal, FlatList,TouchableOpacity,Dimensions,TextInput} from 'react-native';
import { Versions, CurrentVersion } from './Data'; // Importing from Data.js
import {useTheme,useFont} from "./ThemeContext";
import Styles,{Red,Red2,Font} from "./Styles";
import {Ionicons} from "@expo/vector-icons"

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
  const {width,height} = Dimensions.get('window')
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
    <View style={{backgroundColor: darkMode ? "#222" : "#f5f5f5",position:'absolute'}}>
    <TextInput
        style={[
          styles.searchBar, 
          { 
            backgroundColor: darkMode ? inputBgColorDark : inputBgColorLight,
            color: darkMode ? "white" : "default", 
            width:width*0.71,
            borderColor: darkMode ? "white" : "lightgray",
            position:'absolute',
            outline: 'none',
            left:5,
            top:95, 
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
            <Ionicons name="close-circle" size={20} color={hoveredIndex === "Clear" ? Red2() : Red()} />
          </TouchableOpacity>
        )}
      
      <TouchableOpacity 
      style={[styles.closeButton,{paddingHorizontal:0,height:40,justifyContent:'center',borderRadius:10,width:100,position:'absolute',top:95,zIndex:1000,right:1,text:'center',backgroundColor: hoveredIndex === "order" ? Red2() : Red()}]} 
      onPress={changeOrder}
      onMouseEnter={() => setHoveredIndex("order")}
      onMouseLeave={() => setHoveredIndex(null)}
      >
        <Text 
        style={[styles.closeButtonText,{textAlign: 'center',fontSize:10,}]}
        >Most Recent{" "}
        {initial ? <Ionicons size={8} name={"chevron-up"}/> : <Ionicons size={8} name={"chevron-down"}/>}
        </Text>
      </TouchableOpacity>
    <View style={[styles.container,{backgroundColor: darkMode ? "#222" : "#f5f5f5",height: height}]}>
      <Text style={[styles.header,{color: darkMode ? "white" : "default", fontFamily: font}]}>Versions</Text>
      
      {/* Display Current Version */}
      <Text style={[styles.currentVersion,{color: darkMode ? "#ccc" : "#333",marginBottom:70, fontFamily: font}]}>Current Version: {CurrentVersion}</Text>
      

      {/* Display Versions list */}
      <ScrollView style={{width:width*0.9,backgroundColor: darkMode ? "#222" : "#f5f5f5"}}>
      <FlatList
        style={{backgroundColor: darkMode ? "#222" : "#f5f5f5"}}
        data={filteredVersions}
        keyExtractor={(item, index) => index.toString()} // Use index as key
        extraData={filteredVersions}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.versionItem} onPress={() => openModal(item)}>
            <Text style={{color: darkMode ? "#eee" : "default",fontFamily: font}}>{item.name}</Text>
            <Text style={{color: darkMode ? "#888" : "#555",fontSize: 12, fontFamily: font}}>{item.message}</Text>
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
            style={[styles.closeButton,{backgroundColor: Red()}]}>
              <Text style={styles.closeButtonText}>Close</Text>
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
    padding: 20,
    // backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  currentVersion: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
    color: '#333',
  },
  versionItem: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  date: {
    fontSize: 12,
    position: 'absolute', // Fixed issue with 'fixed'
    top: 1,
    right: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    // textAlign: 'center',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 14,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchBar: {
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
  },
  clearButton: {
    position:'absolute',
    top:100,
    // right:"20%",
    padding:5,
    right:105,
    zIndex:1002,
  },
});

export default VersionsScreen;
