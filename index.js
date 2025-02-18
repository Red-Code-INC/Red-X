import { AppRegistry } from './react-native';  // For web compatibility
import App from './App.web';

// Register the app to run on the web
AppRegistry.registerComponent('main', () => App);

// Run the application
AppRegistry.runApplication('main', {
  initialProps: {},  // You can pass initial props if needed
  rootTag: document.getElementById('root'),  // This ensures the app is attached to the DOM
});
