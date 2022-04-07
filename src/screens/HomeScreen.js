// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Timer from '../components/Timer';
import {colors} from '../utils/colors';

const percentage = 66;

const HomeScreen = ({navigation}) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer) {
      setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    console.log('timer', timer);
  }, [timer]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Timer></Timer>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default HomeScreen;
