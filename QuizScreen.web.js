import React, { useState } from 'react';
import {Dimensions, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from "./ThemeContext";
import Styles, { Red, Red2, Red3, Font } from "./Styles";

const {width} = Dimensions.get('window')
const scale = width < 1440 ? 0.75 : 1.00

const questions = [
  { 
    id: 1, 
    category: "Language",
    question: "Which language do you primarily code in?", 
    options: ["JavaScript", "Python", "C++", "Swift", "Java", "C#", "Go", "Other"] 
  },
  { 
    id: 2, 
    category: "ProjectType",
    question: "What kind of project are you working on?", 
    options: ["Web Development", "Mobile App", "Game Development", "AI/ML", "Embedded Systems", "Cybersecurity", "Other"]
  },
  { 
    id: 3, 
    category: "Framework",
    question: "Which framework/library do you prefer?", 
    options: ["React", "Angular", "Vue", "Django", "Flask", "Spring", "Unity", "Unreal Engine", "None"]
  },
  { 
    id: 4, 
    category: "Propreity",
    question: "Do you prefer open-source or proprietary libraries?", 
    options: ["Open-Source", "Proprietary", "No Preference"] 
  },
  { 
    id: 5, 
    category: "Performance",
    question: "How important is performance for your project?", 
    options: ["Very Important", "Somewhat Important", "Not Important"] 
  },
  { 
    id: 6, 
    category: "Platform",
    question: "What is your target platform?", 
    options: ["Web", "iOS", "Android", "Windows", "MacOS", "Linux", "Embedded Devices"]
  }
];

const QuizScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { darkMode, toggleDarkMode } = useTheme();

  if (currentQuestion >= questions.length) {
    return <Text>Loading...</Text>;
  }

  const handleAnswer = (option) => {
    const questionData = questions[currentQuestion];
    setAnswers(prevAnswers => [
      ...prevAnswers, 
      { category: questionData.category, value: option }
    ]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate("Results", { answers });
    }
  };

  return (
    <View style={[styles.container, Styles().container]}>
      <Text style={[styles.question,{color: Styles().text.color,fontFamily: Font()}]}>{questions[currentQuestion]?.question || "Loading..."}</Text>
      {questions[currentQuestion]?.options.map((option, index) => (
        <TouchableOpacity 
          key={index} 
          style={[
            styles.button, 
            { 
              backgroundColor: hoveredIndex === index ? Red2() : Red(), 
            }
          ]} 
          onPress={() => handleAnswer(option)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Text style={[styles.buttonText,{fontFamily: Font()}]}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 * scale },
  question: { fontSize: 28 * scale, fontWeight: 'bold', marginBottom: 20 * scale, textAlign: 'center' },
  button: { padding: 15 * scale, borderRadius: 10, marginVertical: 10 * scale, width: '50%' },
  buttonText: { color: 'white', fontSize: 18 * scale, textAlign: 'center' }
});

export default QuizScreen;