import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance, AccessibilityInfo } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Context
const ThemeContext = createContext();
const LargeTextContext = createContext();
const LowRedContext = createContext();
const PreviewContext = createContext();
const FontContext = createContext();
const PlaceholderContext6 = createContext();
const PlaceholderContext7 = createContext();
const PlaceholderContext9 = createContext();
const PlaceholderContext8 = createContext();
const PlaceholderContext10 = createContext();


// Theme Provider
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from storage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('darkMode');
        if (storedTheme !== null) {
          setDarkMode(JSON.parse(storedTheme)); // Convert string to boolean
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };
    loadTheme();
  }, []);

  // Toggle theme and save to storage
  const toggleDarkMode = async () => {
    try {
      setDarkMode((prevMode) => {
        const newMode = !prevMode;
        AsyncStorage.setItem('darkMode', JSON.stringify(newMode)); // Save new mode
        return newMode;
      });
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Large Text Provider
export const LargeTextProvider = ({ children }) => {
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    const loadTextSize = async () => {
      try {
        const storedTextSize = await AsyncStorage.getItem('largeText');
        if (storedTextSize !== null) {
          setLargeText(JSON.parse(storedTextSize)); // Convert string to boolean
        }
      } catch (error) {
        console.error("Failed to load text size:", error);
      }
    };

    loadTextSize(); // Correctly calling the function
  }, []);

  const toggleLargeText = async () => {
    try {
      const newMode = !largeText;
      setLargeText(newMode);
      await AsyncStorage.setItem('largeText', JSON.stringify(newMode)); // Ensure AsyncStorage updates properly
    } catch (error) {
      console.error("Failed to save text size:", error);
    }
  };

  return (
    <LargeTextContext.Provider value={{ largeText, toggleLargeText }}>
      {children}
    </LargeTextContext.Provider>
  );
};

export const LowRedProvider = ({ children }) => {
  const [lowRed, setLowRed] = useState(false);

  useEffect(() => {
    const loadRed = async () => {
      try {
        const storedRed = await AsyncStorage.getItem('lowRed');
        if (storedRed !== null) {
          setLowRed(JSON.parse(storedRed)); // Convert string to boolean
        }
      } catch (error) {
        console.error("Failed to load text size:", error);
      }
    };

    loadRed(); // Correctly calling the function
  }, []);

  const toggleLowRed = async () => {
    try {
      const newMode = !lowRed;
      setLowRed(newMode);
      await AsyncStorage.setItem('lowRed', JSON.stringify(newMode)); // Ensure AsyncStorage updates properly
    } catch (error) {
      console.error("Failed to save text size:", error);
    }
  };

  return (
    <LowRedContext.Provider value={{ lowRed, toggleLowRed }}>
      {children}
    </LowRedContext.Provider>
  );
};

export const PreviewProvider = ({ children }) => {
  const [previewAllowed, setPreview] = useState(true);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        const storedPreview = await AsyncStorage.getItem('previewAllowed');
        if (storedPreview !== null) {
          setPreview(JSON.parse(storedPreview)); // Convert string to boolean
        }
      } catch (error) {
        console.error("Failed to load text size:", error);
      }
    };

    loadPreview(); // Correctly calling the function
  }, []);

  const togglePreview = async () => {
    try {
      const newMode = !previewAllowed;
      setPreview(newMode);
      await AsyncStorage.setItem('previewAllowed', JSON.stringify(newMode)); // Ensure AsyncStorage updates properly
    } catch (error) {
      console.error("Failed to save text size:", error);
    }
  };

  return (
    <PreviewContext.Provider value={{ previewAllowed, togglePreview }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const FontProvider = ({ children }) => {
  const [font, setFont] = useState("Arial");

  useEffect(() => {
    const loadFont = async () => {
      try {
        const storedFont = await AsyncStorage.getItem('Font');
        if (storedFont) {
          setFont(storedFont); // No need for JSON.parse
        }
      } catch (error) {
        console.error("Failed to load font:", error);
      }
    };
    loadFont();
  }, []);

  useEffect(() => {
    const saveFont = async () => {
      try {
        await AsyncStorage.setItem('Font', font);
      } catch (error) {
        console.error("Failed to save font:", error);
      }
    };
    saveFont();
  }, [font]); // Save font when it changes

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const Setting6Provider = ({ children }) => {
  const [setting6,setPlaceholder6] = useState(false);
  
  useEffect(() => {
    setPlaceholder6(false);
  }, []);

  const toggleSetting6 = () => setPlaceholder6((prev) => !prev);
  return (
    <PlaceholderContext6.Provider value={{ setting6, toggleSetting6 }}>
      {children}
    </PlaceholderContext6.Provider>
  );
};

export const Setting7Provider = ({ children }) => {
  const [setting7,setPlaceholder7] = useState(false);
  
  useEffect(() => {
    setPlaceholder7(false);
  }, []);

  const toggleSetting7 = () => setPlaceholder7((prev) => !prev);
  return (
    <PlaceholderContext7.Provider value={{ setting7, toggleSetting7 }}>
      {children}
    </PlaceholderContext7.Provider>
  );
};

export const Setting8Provider = ({ children }) => {
  const [setting8,setPlaceholder8] = useState(false);
  
  useEffect(() => {
    setPlaceholder8(false);
  }, []);

  const toggleSetting8 = () => setPlaceholder8((prev) => !prev);
  return (
    <PlaceholderContext8.Provider value={{ setting8, toggleSetting8 }}>
      {children}
    </PlaceholderContext8.Provider>
  );
};

export const Setting9Provider = ({ children }) => {
  const [setting9,setPlaceholder9] = useState(false);
  
  useEffect(() => {
    setPlaceholder9(false);
  }, []);

  const toggleSetting9 = () => setPlaceholder9((prev) => !prev);
  return (
    <PlaceholderContext9.Provider value={{ setting9, toggleSetting9 }}>
      {children}
    </PlaceholderContext9.Provider>
  );
};

export const Setting10Provider = ({ children }) => {
  const [setting10,setPlaceholder10] = useState(false);
  
  useEffect(() => {
    setPlaceholder10(false);
  }, []);

  const toggleSetting10 = () => setPlaceholder10((prev) => !prev);
  return (
    <PlaceholderContext10.Provider value={{ setting10, toggleSetting10 }}>
      {children}
    </PlaceholderContext10.Provider>
  );
};


// Custom Hook for easy access
// Custom Hook for easy access
export const useTheme = () => useContext(ThemeContext);
export const useLargeText = () => useContext(LargeTextContext);
export const useLowRed = () => useContext(LowRedContext);
export const usePreview = () => useContext(PreviewContext);
export const useFont = () => useContext(FontContext);
export const useSetting6 = () => useContext(PlaceholderContext6);
export const useSetting7 = () => useContext(PlaceholderContext7);
export const useSetting8 = () => useContext(PlaceholderContext8);
export const useSetting9 = () => useContext(PlaceholderContext9);
export const useSetting10 = () => useContext(PlaceholderContext10);