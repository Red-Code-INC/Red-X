import React,{useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from "./ThemeContext";
import Styles, { Red, Red2, Red3, Font } from "./Styles";
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";

const { width } = Dimensions.get("window");

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
];

const ResultsScreen = ({ route, navigation }) => {

  const { answers = [] } = route.params || {};
  const { darkMode } = useTheme();
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [viewType, setViewType] = useState("Graph");
  const font = Font();

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

  return (
    <View style={[styles.container, Styles().container]}>
    <Text style={[styles.title,{color: darkMode ? "white" : '#333',fontFamily: Font()}]}>Your Library Recommendations</Text>
    <View style={{flexDirection: 'row',
    // justifyContent: 'flex-start', // Corrected from 'left'
    }}>
      <TouchableOpacity style={[styles.button, { backgroundColor: Red() }]} onPress={() => navigation.navigate("Quiz")}>
        <Text style={[styles.buttonText,{fontFamily: Font()}]}>Go Back to Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: Red() }]} onPress={() => navigation.navigate("Home")}>
        <Text style={[styles.buttonText,{fontFamily: Font()}]}>Go to Home</Text>
      </TouchableOpacity>
      
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: Red() }]} onPress={() => setViewType(viewType==="Graph" ? "List" : "Graph")}>
        <Text style={[styles.buttonText,{fontFamily: Font()}]}>View as {viewType === "Graph" ? "List" : "Graph"}</Text>
      </TouchableOpacity>
      
      <FlatList
        // style={}
        data={getRecommendations(answers)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.recommendationContainer,{backgroundColor: darkMode ? "#333" : "#fff",display: viewType === "List" ? 'flex' : 'none'}]}>
            <Text style={[styles.recommendations,{color: darkMode ? "white" : '#333',fontFamily: font}]}>
              {item.name} ({item.matchCount})
            </Text>
            <FlatList
  data={item.matchedCategories}
  keyExtractor={(category, index) => index.toString()}
  renderItem={({ item: category }) => (
    <Text style={[styles.matchedCategory,{color: darkMode ? "white" : '#333'}]}>
      {category}: {item.categories[category]}
    </Text>
  )}
/>

          </View>
        )}
      />
      <View style={[
        styles.graph,{
          backgroundColor: darkMode ? "black" : "white", 
          color: darkMode ? "white" : "default", 
          borderColor: darkMode ? "black" : "white",
          display: viewType === "Graph" ? "flex" : "none",
        }
      ]}>
      <BarChart
  barWidth={25}
  noOfSections={6}
  barBorderRadius={4}
  frontColor="red"
  data={data.map(bar => ({
    ...bar,
    frontColor: Red(), // Keep the normal color
    barStyle: {
      labelWidth: 30
    }
  }))}
  height={320}
  maxValue={6}
  width={width * 0.8}
  yAxisThickness={0}
  xAxisThickness={0}
  hideRules  

  // Move text styles to BarChart props  
  xAxisLabelTextStyle={{ color: darkMode ? "white" : "black",fontSize: 8, }}  
  yAxisTextStyle={{ color: darkMode ? "white" : "black" }}  

  // isThreeD (commented out, remove if not used)
  style={{
    marginLeft: 50,
  }}
/>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    // display: 'inline-block',
    alignSelf: 'center',
    borderRadius: 10,
    marginHorizontal:10,
    marginVertical: 10,
    width: 0.45*width,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  recommendationContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    width: 0.9*width,
  },
  recommendations: { 
    fontSize: 18, 
    textAlign: 'left', 
    color: '#555',
  },
  matchedCategory: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  graph: {
    position: 'absolute',
    top: 225,
    left: 20,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'lightgray',
    width: width*0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default ResultsScreen;
