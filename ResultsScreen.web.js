import React,{useState} from 'react';
import { View,ScrollView, Text, StyleSheet, FlatList, Pressable, TouchableOpacity, Dimensions,TouchableWithoutFeedback } from 'react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import { useTheme,useLowRed,useFont } from "./ThemeContext";
import Styles, { Red,Red2,Red3,Font } from "./Styles";

const { width } = Dimensions.get("window");
const screenWidth = Dimensions.get("window").width;
const scale = width < 1440 ? 0.75 : 1.00

const barData = [
        {value: 250, label: 'M'},
        {value: 500, label: 'T'},
        {value: 745, label: 'W'},
        {value: 320, label: 'T'},
        {value: 600, label: 'F'},
        {value: 256, label: 'S'},
        {value: 300, label: 'S'},
    ];

const libraries = [
    { name: "React", categories: { Language: "JavaScript", Framework: "React", ProjectType: "Web Development" } },
    { name: "Django", categories: { Language: "Python", Framework: "Django", ProjectType: "Web Development" } },
    { name: "Unity", categories: { Language: "C#", Framework: "Unity", ProjectType: "Game Development" } },
    { name: "TensorFlow", categories: { Language: "Python", ProjectType: "AI/ML" } },
    { name: "SwiftUI", categories: { Language: "Swift", Framework: "SwiftUI", ProjectType: "Mobile App" } },
    { 
      name: "Red Script",
      categories: {
        Language: "JavaScript",
        Framework: "None",
        ProjectType: "Other",
        Performance: "Not-Important",
        Platform: "Web",
        Propreity: "Open-Source",
      }
    },
    { 
      name: "Red CSS",
      categories: {
        Language: "CSS",
        Framework: "None",
        ProjectType: "Web Development",
        Performance: "Not-Important",
        Platform: "Web",
        Propreity: "Open-Source",
      }
    },
];

const ResultsScreen = ({ route, navigation }) => {
  const { answers = [] } = route.params || {};
  const { darkMode } = useTheme();
  const { lowRed} = useLowRed();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const {font} = useFont()

  const red = Red();
  const red3 = Red3();

  const getRecommendations = (answers) => {
    const categorizedAnswers = {};
    answers.forEach(({ category, value }) => {
      categorizedAnswers[category] = value;
    });

    const matches = libraries.map(lib => {
      let matchCount = 0;
      let matchedCategories = [];
      Object.entries(lib.categories).forEach(([category, value]) => {
        if (categorizedAnswers[category] === value) {
          matchCount++;
          matchedCategories.push(category);
        }
      });
      return { ...lib, matchCount, matchedCategories };
    });

    return matches.sort((a, b) => b.matchCount - a.matchCount);
  };

  const data = getRecommendations(answers).map(item => ({
    value: item.matchCount,
    label: item.name
  }));

  // const font = Font()

 // console.log(getRecommendations(answers)[index])
  // for ([item,index] in getRecommendations(answers)){
    // data.push({value: getRecommendations(answers)[index].matchCount, label: getRecommendations(answers)[index].name})
  // }
  // console.log("TEST");


  return (
    <View style={[styles.container, Styles().container]}>
    <View style={styles.upper}> 
    <Text style={[styles.title,{color: darkMode ? "white" : '#333',fontFamily: Font()}]}>Your Library Recommendations</Text>
    <View style={{
      flexDirection: 'row',
      // marginBottom: 100,
    // justifyContent: 'flex-start', // Corrected from 'left'
    }}>

    <Pressable
      onHoverIn={() => setHoveredButton("quiz")}
      onHoverOut={() => setHoveredButton(null)}
      style={[
        styles.button,
        { backgroundColor: hoveredButton === "quiz" ? Red2() : Red() }
      ]}
      onPress={() => navigation.navigate("Quiz")}>
      <Text style={[styles.buttonText,{fontFamily: Font()}]}>Go Back to Quiz</Text>
    </Pressable>

    <Pressable
      onHoverIn={() => setHoveredButton("home")}
      onHoverOut={() => setHoveredButton(null)}
      style={[
        styles.button,
        { backgroundColor: hoveredButton === "home" ? Red2() : Red() }
      ]}
      onPress={() => navigation.navigate("Home")}>
        <Text style={[styles.buttonText,{fontFamily: Font()}]}>Go to Home</Text>
    </Pressable>
    </View>
      </View>
      <ScrollView style={[styles.recommendationsList,{flex:1}]}>
      <FlatList
        data={getRecommendations(answers)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View 
            onMouseEnter={() => setHoveredLabel(item.name)}
            style={[
              styles.recommendationContainer, { 
                backgroundColor: (hoveredLabel === item.name) ? (darkMode ? "black" : "lightgray") : (darkMode ? "#333" : "#fff"),
                borderColor: hoveredLabel === item.name ? (lowRed ? red3 : red) : "lightgray",
              },
            ]}
            onMouseLeave={() => setHoveredLabel(null)}>
              <Text style={[styles.recommendations, { color: darkMode ? "white" : '#333',fontFamily: font}]}>
                {item.name} ({item.matchCount})
              </Text>
              <FlatList
                data={item.matchedCategories}
                keyExtractor={(category, index) => index.toString()}
                renderItem={({ item: category }) => (
                  <Text style={[styles.matchedCategory,{color: darkMode ? "white" : '#333',fontFamily: font}]}>
                    {category}: {item.categories[category]}
                  </Text>
                )}
              />
            </View>
        )}
      />
      
</ScrollView>
      <View style={[
        styles.graph,{
          backgroundColor: darkMode ? "black" : "white", 
          color: darkMode ? "white" : "default", 
          borderColor: darkMode ? "black" : "white"
        }
      ]}>
      <BarChart
  barWidth={75*scale}
  noOfSections={6}
  barBorderRadius={4}
  frontColor="red"
  data={data.map(bar => ({
    ...bar,
    frontColor: Red(), // Keep the normal color
    barStyle: {
      borderColor: hoveredLabel === bar.label ? (darkMode ? "white" : "lightgray") : "transparent",
      borderWidth: hoveredLabel === bar.label ? 5 : 0,
      borderRadius: hoveredLabel === bar.label ? 10 : 4,
      labelWidth: 30,
    }
  }))}
  height={350*scale}
  maxValue={6}
  width={(width * 0.37)}
  yAxisThickness={0}
  xAxisThickness={0}
  hideRules  

  // Move text styles to BarChart props  
  xAxisLabelTextStyle={{ color: darkMode ? "white" : "black", fontSize: 16 * (scale === 0.75 ? 0.5 : 1.00) }}  
  yAxisTextStyle={{ color: darkMode ? "white" : "black" }}  

  // isThreeD (commented out, remove if not used)
  style={{
    marginLeft: 50,
  }}
/>


      </View>
</View>
    // <ScrollView></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 15 * scale,
  },
  button: {
    padding: 15,
    // display: 'inline-block',
    alignSelf: 'center',
    borderRadius: 10,
    marginHorizontal:10 * scale,
    marginVertical: 10,
    width: 0.45*width,
  },
  buttonText: {
    color: 'white',
    fontSize: 16 * scale,
    textAlign: 'center',
  },
  recommendationContainer: {
    marginBottom: 20 * scale,
    padding: 10 * scale,
    backgroundColor: "#fff",
    borderRadius: 10,
    // position: 'absolute',
    // left: 50,
    border: '2px solid gray',
    elevation: 3,
    // alignSelf: 'left',
    marginLeft: 100,
    // marginBott 
    width: 0.5*width,
  },
  recommendations: { 
    fontSize: 18 * scale, 
    textAlign: 'left', 
    color: '#555',
  },
  matchedCategory: {
    fontSize: 16 * scale,
    color: "#333",
    marginLeft: 5,
  },
  graph: {
    position: 'absolute',
    top: 150,
    right: 115 * scale,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'lightgray',
    width: (width*0.4),
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  recommendationsList: {
    justifyContent: 'left',
    textAlign: 'left',
    alignSelf: 'left',
    alignItems: 'left',
    width: width,
    position: 'absolute',
    top: 150 * (scale === 0.75 ? 0.9  : 1.00),
    right: 45 * (scale === 0.75 ? 2 * scale : 1.00),
    // marginBottom: 50,
    // positon: 'absolute',
    // top: 50,
    // left: 9,
  },
  upper: {
    position:'absolute',
    top: 25,
    left: 50,
  }
});

export default ResultsScreen;
