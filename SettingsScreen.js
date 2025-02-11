import React, {useState} from 'react';
import { View, Text, Image, Switch, StyleSheet, ScrollView,Dimensions } from 'react-native';
import { useLowRed, useTheme, useLargeText, usePreview, useFont ,useSetting6, useSetting7,useSetting8,useSetting9,useSetting10 } from './ThemeContext';
import Styles, {Red,Red3,Font} from "./Styles";
import SwipeableView from "./SwipableView";
import DropDownPicker from 'react-native-dropdown-picker';

const SettingsScreen = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { largeText, toggleLargeText } = useLargeText();
  const { lowRed, toggleLowRed} = useLowRed();
  const { previewAllowed, togglePreview} = usePreview();
  const { font, setFont} = useFont();
  const { setting6, toggleSetting6} = useSetting6();
  const { setting7, toggleSetting7} = useSetting7();
  const { setting8, toggleSetting8} = useSetting8();
  const { setting9, toggleSetting9} = useSetting9();
  const { setting10, toggleSetting10} = useSetting10();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(font);
  const [items, setItems] = useState([
    {label: 'Arial (Default)', value: 'Arial'},
    {label: 'Times New Roman', value: 'Times New Roman'}
  ]);
  
  const {width} = Dimensions.get('window');

  const toggleFont = () => {
    if (font === "Arial"){
      setFont("Times New Roman")
    } else {
      setFont("Arial");
    }
  }


  const Preview = ({ mainColor="default",mainBg="#f5f5f5",mainStyle, secStyle,bottomM, mainContent, secContent, tabColor = "red" }) => {
  return (
    <View style={{ borderRadius: 10, borderColor: darkMode ? "#333" : "lightgray", borderWidth:2, backgroundColor: mainBg,color: mainColor, width:width*0.89 }}>
      {/* Top Bar */}
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: tabColor,borderTopLeftRadius:8,borderTopRightRadius:8, height: 50, paddingLeft: 10 }}>
        <Image source={require("./assets/icon.png")} style={{ width: 30, height: 30, marginRight: 5 }} />
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold"}}>Red X</Text>
      </View>

      {/* Content */}
      <View style={{ padding: 10, textAlign: 'center',alignItems:'center',}}>
        <Text style={mainStyle}>{mainContent}</Text>
        <Text style={secStyle}>{secContent}</Text>
        <Text style={{ marginBottom: bottomM }}></Text>
      </View>

      {/* Bottom Bar */}
      <View style={{ backgroundColor: tabColor,borderBottomLeftRadius:8,borderBottomRightRadius:8, height: 50, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color:tabColor, fontWeight: "bold" }}>PREVIEW</Text>
      </View>
    </View>
  );
};


  return (
    <ScrollView style={[styles.container, { backgroundColor: darkMode ? '#222' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 52 : 26,fontFamily: Font() }]}>
        Settings
      </Text>

      {/* Dark Mode Toggle */}
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 22 : 18,fontFamily: Font() }]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: Red3(), true: Red() }} // Track color (on/off state)
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={darkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      {/* Large Text Toggle */}
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 22 : 18,fontFamily: Font() }]}>Large Text</Text>
        <Switch
          trackColor={{ false: Red3(), true: Red() }} // Track color (on/off state)
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={largeText}
          onValueChange={toggleLargeText}
        />
      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 22 : 18,fontFamily: Font() }]}>Low Red</Text>
        <Switch
          trackColor={{ false: Red3(), true: Red() }} // Track color (on/off state)
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={lowRed}
          onValueChange={toggleLowRed}
        />
      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 22 : 18,fontFamily: Font() }]}>Allow Preview</Text>
        <Switch
          trackColor={{ false: Red3(), true: Red() }} // Track color (on/off state)
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={previewAllowed}
          onValueChange={togglePreview}
        />
      </View>
      <View style={[styles.setting, {zIndex:100, backgroundColor: darkMode ? '#333' : '#fff'}]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 : 21, fontFamily: Font() }]}>Font</Text>
        <DropDownPicker
  open={open}
  value={value}
  items={items}
  setOpen={setOpen}
  setValue={setValue}
  setItems={setItems}
  onChangeValue={(selectedValue) => setFont(selectedValue)}
  zIndex={100}
  style={{
    backgroundColor: darkMode ? "#333" : "#fff",  // Background color of the main picker
    borderColor: Red(), // Border color
    width:200,
    height: 10,
    padding:0,
    marginLeft:75,
  }}
  textStyle={{
    color: darkMode ? "#fff" : "#000",  // Color of selected item text
    fontFamily: font, // Use selected font
  }}
  dropDownContainerStyle={{
    width:200,
    marginLeft:75,
    backgroundColor: darkMode ? "#222" : "#eee",  // Dropdown background
    borderColor: Red(), // Border color
  }}
  listItemContainerStyle={{
    width:200,
    backgroundColor: darkMode ? "#444" : "#fff", // Background of each dropdown item
  }}
  listItemLabelStyle={{
    color: darkMode ? "#fff" : "#000",  // Text color of each dropdown item
    fontFamily: font, // Use selected font
  }}
/>


      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 22 : 18,fontFamily: Font() }]}>Setting 6</Text>
        <Switch
          trackColor={{false:Red3(),true: Red()}} // Track color (on/off state)
          activeTrackColor={"red"}
          thumbColor={Red()} // Keep thumbColor constant to red
          activeThumbColor={Red3()}
          ios_backgroundColor={Red3()}
          value={setting6}
          onValueChange={toggleSetting6}
        />
      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 22 : 18,fontFamily: Font() }]}>Setting 7</Text>
        <Switch
          trackColor={{false:Red3(),true: Red()}} // Track color (on/off state)
          activeTrackColor={"red"}
          ios_backgroundColor={Red3()}
          thumbColor={Red()} // Keep thumbColor constant to red
          activeThumbColor={Red3()}
          value={setting7}
          onValueChange={toggleSetting7}
        />
      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 22 : 18,fontFamily: Font()}]}>Setting 8</Text>
        <Switch
          trackColor={{false:Red3(),true: Red()}} // Track color (on/off state)
          activeTrackColor={"red"}
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={setting8}
          onValueChange={toggleSetting8}
        />
      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 22 : 18,fontFamily: Font() }]}>Setting 9</Text>
        <Switch
          trackColor={{false:Red3(),true: Red()}} // Track color (on/off state)
          activeTrackColor={"red"}
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={setting9}
          onValueChange={toggleSetting9}
        />
      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 22 : 18,fontFamily: Font() }]}>Setting 10</Text>
        <Switch
          trackColor={{false:Red3(),true: Red()}} // Track color (on/off state)
          activeTrackColor={"red"}
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={setting10}
          onValueChange={toggleSetting10}
        />
      </View>
      <View style={{display: previewAllowed ? "flex" : 'none',}}>
      <SwipeableView style={{flex:1,backgroundColor:'black',borderColor: darkMode ? "#333" : "lightgray", borderWidth:2,borderRadius:10,position:'absolute',bottom:0,left:0,justifyContent:'center',alignItems:'center'}}>
      <Preview 
        mainBg="#222"
        mainColor="white"
        mainStyle={{fontSize:26,color:'white',marginBottom:20,marginTop:0,}} 
        secStyle={{color:'white',backgroundColor:"#333",width:width*0.8,borderRadius:10,padding:10,fontSize:18,}} 
        mainContent={"Preview"} 
        secContent="Preview"
        bottomM={40} 
      />
      <Preview
        mainStyle={{fontSize:52,marginBottom:20}}
        secStyle={{backgroundColor:"#fff",width:width*0.8,borderRadius:10,padding:10,fontSize:22,}}
        mainContent="Preview"
        secContent="Preview"
        bottomM={5}
      />
      <Preview
        mainStyle={{fontSize:26,marginBottom:20}}
        secStyle={{backgroundColor:"#fff",width:width*0.8,borderRadius:10,padding:10,fontSize:18,}}
        mainContent="Preview"
        secContent="Preview"
        tabColor="#c00000"
        bottomM={40}
      />
      </SwipeableView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  settingText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
