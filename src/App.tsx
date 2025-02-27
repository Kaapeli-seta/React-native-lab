import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Platform} from 'react-native';
import Navigator from './navigators/Navigator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});
