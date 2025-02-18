import { AppRegistry } from 'react-native-web';  // For web compatibility
import App from './App.web';

alert("TEST");

// Register the app to run on the web
AppRegistry.registerComponent('main', () => App);

alert("TEST2");

// Run the application
AppRegistry.runApplication('main', {
  initialProps: {},  // You can pass initial props if needed
  rootTag: document.getElementById('root'),  // This ensures the app is attached to the DOM
});

alert("TEST3");
