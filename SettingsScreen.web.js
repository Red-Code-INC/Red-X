 import React,{useState} from 'react';
import { View,Dimensions, Text,Image, Switch, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { useLowRed, useTheme, useLargeText, usePreview, useFont ,useSetting6, useSetting7,useSetting8,useSetting9,useSetting10 } from './ThemeContext';
import Styles, {Red,Red3,Font} from "./Styles";
import DropDownPicker from 'react-native-dropdown-picker';
const {width,height} = Dimensions.get('window')

var scale = 1.00

if (width === 1366){
  scale = 0.75
} else if (width === 1920){
  scale = 1.00
}

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
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(font);
  const [items, setItems] = useState([
    {label: 'Arial (Default)', value: 'Arial'},
    {label: 'Times New Roman', value: 'Times New Roman'}
  ]);


  let content = <Text style={[styles.previewText,{color: darkMode ? "#222" : "lightgray"}]}>HOVER OVER SETTING {"\n"} FOR PREVIEW</Text>
  let previewBg = darkMode ? "black" : "#fff"
  if (preview === "DarkMode"){
    previewBg = "#222"
  } else if (preview == "AllowPreview"){
    previewBg = "#fff"
  } else if (preview != null) {
    previewBg = "#f5f5f5"
  }

  const Preview = ({mainStyle,secStyle,mainContent,secContent,tabColor = "red"}) => {
    return (
      <View>
        <Text style={{position:'absolute',top:0,left:0,width:"100%",alignSelf:'center',borderTopLeftRadius:8,borderTopRightRadius:8,backgroundColor:tabColor,color:'white',alignItems:'center',fontSize:18,fontWeight:'bold',textAlignVertical:'top',verticalAlign:'top',paddingLeft:10,height:50,}}><Image source={require('./assets/icon.png')} style={{width:30,height:30,positon:'absolute',top:8}}></Image><Text style={{marginLeft:5}}>Red X</Text></Text>
        <View style={{padding:20}}>
          <Text style={{marginBottom:40}}></Text>
          <Text style={mainStyle}>{mainContent}</Text>
          <Text style={secStyle}>{secContent}</Text>
        </View>
        <Text style={{position:'absolute',top:626*(scale === 0.75 ? 0.582 : 1.00),left:0,width:"100%",alignSelf:'center',borderBottomLeftRadius:8,borderBottomRightRadius:8,backgroundColor:tabColor,color:tabColor,height:50,}}>PREVIEW</Text>
      </View>
    )
  }

  if (preview === "DarkMode"){
    content = <Preview 
    mainStyle={{fontSize:28,color:'white',marginBottom:20,}} 
    secStyle={{color:'white',backgroundColor:"#333",borderColor: "white",borderWidth:2,borderRadius:10,padding:10,fontSize:18,}} 
    mainContent={"Preview"} 
    secContent="Preview" />
  } else if (preview === "LargeText"){
    content = <Preview
    mainStyle={{fontSize:56,marginBottom:20}}
    secStyle={{backgroundColor:"#fff",borderColor: "lightgray",borderWidth:2,borderRadius:10,padding:10,fontSize:36,}}
    mainContent="Preview"
    secContent="Preview"
    />
  } else if (preview === "LowRed"){
    content = <Preview
    mainStyle={{fontSize:28,marginBottom:20}}
    secStyle={{backgroundColor:"#fff",borderColor: "lightgray",borderWidth:2,borderRadius:10,padding:10,fontSize:18,}}
    mainContent="Preview"
    secContent="Preview"
    tabColor="#c00000"
    />
  }


  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#222' : '#f5f5f5',flex:1 }]}>
    <Text style={[styles.title, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 70 * scale : 50 * scale,fontFamily: Font() }]}>
        Settings
      </Text>
    <View 
        style={[
          styles.preview,
          {
            backgroundColor: previewBg,color: darkMode ? "#333" : "gray",
            borderColor: darkMode ? "white" : "lightgray",
            display: previewAllowed || (preview === "AllowPreview") ? "flex" : "none",
          }
        ]}>
        {content}
      </View>
    <ScrollView>
      

      {/* Dark Mode Toggle */}
      <View 
        style={[
          styles.setting, 
          { 
            backgroundColor: darkMode ? '#333' : '#fff', 
            borderColor: darkMode ? "white" : "lightgray" 
          }
          ]}
          onMouseEnter={() => setPreview("DarkMode")}
          onMouseLeave={() => setPreview(null)}
          >
            <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 * scale : 21 * scale, fontFamily: Font() }]}>Dark Mode</Text>
            <Switch
              style={{ transform: [{ scaleX: 1.25 *  scale }, { scaleY: 1.25 * scale }] }}
              trackColor={{ false: Red3(), true: Red() }} // Track color (on/off state)
              thumbColor={Red()} // Keep thumbColor constant to red
              ios_backgroundColor={Red3()}
              activeThumbColor={Red3()}
              value={darkMode}
              onValueChange={toggleDarkMode}
            />
        </View>

      {/* Large Text Toggle */}
      <View 
        style={[
          styles.setting, 
          { 
            backgroundColor: darkMode ? '#333' : '#fff', 
            borderColor: darkMode ? "white" : "lightgray" 
          }
        ]}
        onMouseEnter={() => setPreview("LargeText")}
        onMouseLeave={() => setPreview(null)}
        >
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 * scale : 21 * scale, fontFamily: Font() }]}>Large Text</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.25 *  scale }, { scaleY: 1.25 * scale }] }}
          trackColor={{ false: Red3(), true: Red() }} // Track color (on/off state)
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={largeText}
          onValueChange={toggleLargeText}
        />
      </View>
      <View 
        style={[
          styles.setting, 
          { 
            backgroundColor: darkMode ? '#333' : '#fff', 
            borderColor: darkMode ? "white" : "lightgray" 
          }
        ]}
        onMouseEnter={() => setPreview("LowRed")}
        onMouseLeave={() => setPreview(null)}
        >
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 * scale : 21 * scale, fontFamily: Font() }]}>Low Red</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.25 *  scale }, { scaleY: 1.25 * scale }] }}
          trackColor={{ false: Red3(), true: Red() }} // Track color (on/off state)
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={lowRed}
          onValueChange={toggleLowRed}
        />
      </View>
      <View 
        style={[
          styles.setting, 
          { 
            backgroundColor: darkMode ? '#333' : '#fff', 
            borderColor: darkMode ? "white" : "lightgray" 
          }
        ]}
        onMouseEnter={() => setPreview("AllowPreview")}
        onMouseLeave={() => setPreview(null)}
        >
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 * scale : 21 * scale, fontFamily: Font() }]}>Allow Preview</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.25 *  scale }, { scaleY: 1.25 * scale }] }}
          trackColor={{ false: Red3(), true: Red() }} // Track color (on/off state)
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={previewAllowed}
          onValueChange={togglePreview}
        />
      </View>
      <View style={[styles.setting, {zIndex:100, backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? "white" : "lightgray" }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 * scale : 21 * scale, fontFamily: Font() }]}>Font</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={() => setFont(value)}
          zIndex={100}
          textStyle={{ color: darkMode ? "white" : "black" }}
          arrowIconStyle={{tintColor: darkMode ? "white" : "black"}}
          selectedItemContainerStyle={{backgroundColor: darkMode ? "#444" : "#f5f5f5"}}
          style={{
            borderColor:'red',
            minHeight:scale === 0.75 ? 20 : 45,
            backgroundColor: darkMode ? "#333" : "#fff",
            color: darkMode ? "white" : "black",
          }}
          containerStyle={{
            width: width*0.15,
            padding:0,
            paddingVertical:0,
            height:5,
            positon:'absolute',
            bottom:20*(scale === 0.75 ? 0.5 : 1.0 ),
            color: darkMode ? "white" : "black",
            left:10 * scale,
            zIndex: open ? 1000 : 0,
          }}
          dropDownContainerStyle={{
            zIndex:100,
            backgroundColor:darkMode ? "#333" : "#fff",
            borderColor: Red(),
          }}
      />
      </View>
      <View style={[styles.setting, {zIndex:0, backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? "white" : "lightgray" }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 * scale : 21 * scale, fontFamily: Font() }]}>Setting 6</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.25 *  scale }, { scaleY: 1.25 * scale }] }}
          trackColor={{false:Red3(),true: Red()}} // Track color (on/off state)
          activeTrackColor={"red"}
          thumbColor={Red()} // Keep thumbColor constant to red
          activeThumbColor={Red3()}
          ios_backgroundColor={Red3()}
          value={setting6}
          onValueChange={toggleSetting6}
        />
      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? "white" : "lightgray" }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 * scale : 21 * scale, fontFamily: Font() }]}>Setting 7</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.25 *  scale }, { scaleY: 1.25 * scale }] }}
          trackColor={{false:Red3(),true: Red()}} // Track color (on/off state)
          activeTrackColor={"red"}
          ios_backgroundColor={Red3()}
          thumbColor={Red()} // Keep thumbColor constant to red
          activeThumbColor={Red3()}
          value={setting7}
          onValueChange={toggleSetting7}
        />
      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? "white" : "lightgray" }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 * scale : 21 * scale, fontFamily: Font()}]}>Setting 8</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.25 *  scale }, { scaleY: 1.25 * scale }] }}
          trackColor={{false:Red3(),true: Red()}} // Track color (on/off state)
          activeTrackColor={"red"}
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={setting8}
          onValueChange={toggleSetting8}
        />
      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? "white" : "lightgray" }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 * scale : 21 * scale, fontFamily: Font() }]}>Setting 9</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.25 *  scale }, { scaleY: 1.25 * scale }] }}
          trackColor={{false:Red3(),true: Red()}} // Track color (on/off state)
          activeTrackColor={"red"}
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={setting9}
          onValueChange={toggleSetting9}
        />
      </View>
      <View style={[styles.setting, { backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? "white" : "lightgray" }]}>
        <Text style={[styles.settingText, { color: darkMode ? '#fff' : '#333', fontSize: largeText ? 28 * scale : 21 * scale, fontFamily: Font() }]}>Setting 10</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.25 *  scale }, { scaleY: 1.25 * scale }] }}
          trackColor={{false:Red3(),true: Red()}} // Track color (on/off state)
          activeTrackColor={"red"}
          thumbColor={Red()} // Keep thumbColor constant to red
          ios_backgroundColor={Red3()}
          activeThumbColor={Red3()}
          value={setting10}
          onValueChange={toggleSetting10}
        />
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    // textAlign: 'center',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15 * scale,
    width: "50%",
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  settingText: {
    fontSize: 18,
  },
  preview: {
    position: 'absolute',
    right:50 * scale,
    top: 100 * scale,
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 10,
    height: scale === 0.75 ? (height * 0.85) * scale : "80%",
    width: "45%",
    // padding: 20,
  },
  previewText: {
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    verticalAlign: 'center',
    fontSize: 50 * scale,
    positon:'absolute',
    top:260 * (scale === 0.75 ? 0.6 : 1),
    left:10 * scale,
    color:'gray',
  }
});

export default SettingsScreen;
