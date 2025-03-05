import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Platform} from 'react-native';
import Navigator from './navigators/Navigator';
import {UserProvider} from './contexts/UserContext';
import {UpdateProvider} from './contexts/UpdateContext';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <UpdateProvider>
          <Navigator />
        </UpdateProvider>
      </UserProvider>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});
