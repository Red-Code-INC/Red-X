import React from 'react';
import { Dimensions,View,StatusBar, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider, LargeTextProvider, LowRedProvider, PreviewProvider, FontProvider,Setting6Provider,Setting7Provider,Setting8Provider,Setting9Provider,Setting10Provider,useFont} from './ThemeContext';
import { Ionicons, Octicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';
import AboutScreen from './AboutScreen';  
import SettingsScreen from './SettingsScreen';
import SearchScreen from './SearchScreen';
import VersionsScreen from './VersionsScreen';
import Styles, {Red,Font} from "./Styles";

const {width} = Dimensions.get('window')

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
StatusBar.setBarStyle("light-content");
// Header Component with Pressable Icon
const HeaderTitle = ({ title,hasTitle=false }) => {
  const navigation = useNavigation();  // Get navigation object
  let atitle = ""
  if (hasTitle){
    atitle = title
  }
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image source={require('./assets/icon.png')} style={styles.headerIcon} />
      </TouchableOpacity>
      
      <Text style={[styles.headerTitle,{fontFamily: Font()}]}>Red X {atitle}</Text>
    </View>
  );
};

// Dynamic screen options to update title
const screenOptions = ({ route }) => {
  let title = "Home"; // Default title

  if (route.name === "Home") title = "Home";
  else if (route.name === "Quiz") title = "Quiz";
  else if (route.name === "Results") title = "Results";

  return {
    headerStyle: { backgroundColor: Red(),fontFamily: Font(), borderBottomWidth:0 },
    headerTintColor: '#fff',
    headerTitle: () => <HeaderTitle title={title} />,
  };
};

// Stack Navigators
const QuizStack = () => (
  <Stack.Navigator screenOptions={({ route }) => screenOptions({ route })}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
    <Stack.Screen name="Results" component={ResultsScreen} />
  </Stack.Navigator>
);

const AboutStack = () => (
  <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Red(),fontFamily: Font() }, headerTintColor: '#fff' }}>
    <Stack.Screen name="About" component={AboutScreen} options={{ headerTitle: () => <HeaderTitle title="About" /> }} />
    <Stack.Screen name="Versions" component={VersionsScreen} options={{ headerTitle: () => <HeaderTitle title="Versions" /> }} />
  </Stack.Navigator>
);

const SettingProvider = ({children}) => {
  return (
    <ThemeProvider>
    <LargeTextProvider>
    <LowRedProvider>
    <PreviewProvider>
    <FontProvider>
    <Setting6Provider>
    <Setting7Provider>
    <Setting8Provider>
    <Setting9Provider>
    <Setting10Provider>
    {children}
    </Setting10Provider>
    </Setting9Provider>
    </Setting8Provider>
    </Setting7Provider>
    </Setting6Provider>
    </FontProvider>
    </PreviewProvider>
    </LowRedProvider>
    </LargeTextProvider>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <SettingProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: { backgroundColor: Red(),fontFamily: Font(), paddingBottom: 10, borderTopWidth:0,elevation:0, },
            tabBarLabelStyle: { color: Red(),fontFamily: Font(), fontSize: 14 },
            headerStyle: { backgroundColor: Red(),fontFamily: Font(), borderBottomWidth: 0,elevation:0,shadowOpacity:0 },
            headerTintColor: "#fff",
            backgroundColor: Red(),
            borderColor: Red(),
            borderTopWidth: 0,
            tabBarActiveTintColor: "gray",
            tabBarInactiveTintColor: "white",
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'About') iconName = 'information-circle';
              else if (route.name === 'Search') iconName = "search";
              else if (route.name === 'Settings') iconName = 'settings';
              else if (route.name === 'Versions') iconName = 'versions';

              if (route.name === "Versions") {
                return <Octicons name={iconName} size={size} color={color} />;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}>
          <Tab.Screen 
          name="Home" 
          component={QuizStack} 
          options={{ headerShown: false }}
          screenOptions={{borderWidth: 0}} />
          <Tab.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{ headerTitle: () => <HeaderTitle title="Libraries Search" hasTitle={true} /> }}/>
          <Tab.Screen 
          name="About" 
          component={AboutStack} 
          options={{ headerShown: false }} />
          <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ headerTitle: () => <HeaderTitle title="Settings" /> }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </SettingProvider>
  );
};

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'right',
    alignItems: 'right',
  },
});

export default App;