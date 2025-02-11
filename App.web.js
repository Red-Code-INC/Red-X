import React,{useState,useEffect} from 'react';
import { View, Text, Image, StyleSheet,Dimensions, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider, LargeTextProvider, LowRedProvider, PreviewProvider, FontProvider,Setting6Provider,Setting7Provider,Setting8Provider,Setting9Provider,Setting10Provider} from './ThemeContext';
import { Ionicons, Octicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';
import AboutScreen from './AboutScreen';
import SettingsScreen from './SettingsScreen';
import SearchScreen from './SearchScreen';
import VersionsScreen from './VersionsScreen';
import Styles, {Red,Red2,Red3,Red4,Red5,Font} from "./Styles";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');

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
  else if (route.name === "Results") title = "Quiz | Results";

  return {
    headerStyle: { backgroundColor: Red(), borderBottomWidth:0 },
    headerTintColor: '#fff',
    headerTitle: () => <HeaderTitle title={title} />,
  };
};

// Stack Navigators
const QuizStack = () => (
  <Stack.Navigator screenOptions={({ route }) => screenOptions({ route })}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: () => <HeaderTitle title="Home" hasTitle={true} /> }} />
    <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerTitle: () => <HeaderTitle title="Quiz" hasTitle={true} /> }} />
    <Stack.Screen name="Results" component={ResultsScreen} options={{ headerTitle: () => <HeaderTitle title="Quiz | Result" hasTitle={true} /> }} />
  </Stack.Navigator>
);

const AboutStack = () => (
  <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Red() }, headerTintColor: '#fff' }}>
    <Stack.Screen name="About" component={AboutScreen} options={{ headerTitle: () => <HeaderTitle title="About" hasTitle={true} /> }} />
    <Stack.Screen name="Versions" component={VersionsScreen} options={{ headerTitle: () => <HeaderTitle title="About | Versions" hasTitle={true} /> }} />
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
  // const [scale, setScale] = useState(1);

  // useEffect(() => {
  //   const updateScale = () => {
  //     const { width } = Dimensions.get('window');
  //     const baseWidth = 1367; // Standard base width (e.g., iPhone 11 width)
  //     setScale(width / baseWidth);
  //   };

  //   updateScale();
  //   Dimensions.addEventListener('change', updateScale);

  //   return () => Dimensions.removeEventListener('change', updateScale);
  // }, []);
  return (
    // <View style={[styles.container, { transform: [{ scale }] }]}>
    <SettingProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: { backgroundColor: Red(), borderTopWidth:0,elevation:0, },
            tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
            headerStyle: { backgroundColor: Red(), borderBottomWidth: 0,elevation:0,shadowOpacity:0 },
            headerTintColor: "#fff",
            backgroundColor: Red(),
            borderColor: Red(),
            borderTopWidth: 0,
            tabBarActiveTintColor: "gray",
            tabBarInactiveTintColor: "white",
            tabBarActiveBackgroundColor: Red2(),
            tabBarActiveLabelStyle: {color: 'gray'},
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'About') iconName = 'information-circle';
              else if (route.name === 'Libraries Search') iconName = "search";
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
          // hasTitle=
          screenOptions={{borderWidth: 0}} />
          <Tab.Screen 
          name="Libraries Search" 
          component={SearchScreen} 
          options={{ headerTitle: () => <HeaderTitle title="Libraries Search" hasTitle={true} /> }}/>
          <Tab.Screen 
          name="About" 
          component={AboutStack} 
          options={{ headerShown: false }}
           />
          <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ headerTitle: () => <HeaderTitle title="Settings" hasTitle={true} /> }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </SettingProvider>
    // </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width:'100%',
  },
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