import React from 'react';
import {
  Vibration,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from 'react-native-circular-progress-indicator/src/utils/colors';

let pomInterval;

export default class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      minutes: 1,
      seconds: 0,
      workmins: 1,
      worksecs: 0,
      breakMins: 0,
      breakSecs: 5,
      timerState: 'WORK TIMER',
      btnState: 'Start',
    };
  }

  vibrate = () => {
    Vibration.vibrate([500, 500, 500]);
  };

  pomTimer = () => {
    pomInterval = setInterval(() => {
      let newSec = this.state.seconds;
      newSec--;
      if (newSec < 0) {
        newSec = 59;
        this.state.minutes--;
      }
      this.setState({
        seconds: newSec,
      });

      if (newSec <= 0 && this.state.minutes <= 0) {
        this.vibrate();
        if (this.state.timerState == 'WORK TIMER') {
          this.setState({
            timerState: 'BREAK TIMER',
            minutes: this.state.breakMins,
            seconds: this.state.breakSecs,
          });
        } else {
          this.setState({
            timerState: 'WORK TIMER',
            minutes: this.state.workmins,
            seconds: this.state.worksecs,
          });
        }
      }
    }, 1000);
  };

  changeWorkMin = mins => {
    setTimeout(() => {
      clearInterval(pomInterval);
    }, 50);
    this.setState({
      minutes: mins || 0,
      workmins: mins || 0,
      btnState: 'Start',
    });
  };

  changeWorkSec = secs => {
    setTimeout(() => {
      clearInterval(pomInterval);
    }, 50);
    this.setState({
      seconds: secs || 0,
      worksecs: secs || 0,
      btnState: 'Start',
    });
  };

  changeBreakMin = mins => {
    setTimeout(() => {
      clearInterval(pomInterval);
    }, 50);
    this.setState({
      breakMins: mins || 0,
      btnState: 'Start',
    });
  };

  changeBreakSec = secs => {
    setTimeout(() => {
      clearInterval(pomInterval);
    }, 50);
    this.setState({
      breakSecs: secs || 0,
      btnState: 'Start',
    });
  };

  // Creating the functionality for the pause/start button
  chnageBtnState = () => {
    if (this.state.btnState == 'Start') {
      this.pomTimer();
      this.setState({
        btnState: 'Pause',
      });
    } else {
      setTimeout(() => {
        clearInterval(pomInterval);
      }, 50);
      this.setState({
        btnState: 'Start',
      });
    }
  };

  // Creating the functionality for the reset button
  reset = () => {
    setTimeout(() => {
      clearInterval(pomInterval);
    }, 50);
    if (this.state.timerState == 'WORK TIMER') {
      this.setState({
        minutes: this.state.workmins,
        seconds: this.state.worksecs,
        btnState: 'Start',
      });
    } else {
      this.setState({
        minutes: this.state.breakMins,
        seconds: this.state.breakSecs,
        btnState: 'Start',
      });
    }
  };
  render() {
    //Detect max value for the circular bar
    const detectMaxValue = () => {
      if (this.state.timerState === 'WORK TIMER') {
        return this.state.workmins * 60 + this.state.worksecs;
      } else {
        return this.state.breakMins * 60 + this.state.breakSecs;
      }
    };

    const renderTextCircular = () => {
      let minutes, seconds, total;
      if (this.state.minutes <= 9) {
        minutes = '0' + this.state.minutes.toString();
        if (this.state.seconds <= 9) {
          seconds = '0' + this.state.seconds.toString();
        } else {
          seconds = this.state.seconds.toString();
        }
      } else {
        minutes = this.state.minutes.toString();
      }
      total = minutes + ':' + seconds;
      return total;
    };

    // <Text>Work Time:</Text>
    // <TextInput
    //   style={styles.inputStyles}
    //   value={this.state.workmins.toString()}
    //   placeholder="Work Minutes"
    //   onChangeText={this.changeWorkMin}
    //   keyboardType="numeric"
    // />
    // <TextInput
    //   style={styles.inputStyles}
    //   value={this.state.worksecs.toString()}
    //   placeholder="Work Seconds"
    //   onChangeText={this.changeWorkSec}
    //   keyboardType="numeric"
    // />
    // <Text>Break Time:</Text>
    // <TextInput
    //   style={styles.inputStyles}
    //   value={this.state.breakMins.toString()}
    //   placeholder="Break Minutes"
    //   onChangeText={this.changeBreakMin}
    //   keyboardType="numeric"
    // />
    // <TextInput
    //   style={styles.inputStyles}
    //   value={this.state.breakSecs.toString()}
    //   placeholder="Break Seconds"
    //   onChangeText={this.changeBreakSec}
    //   keyboardType="numeric"
    // />
    return (
      <View style={styles.viewStyles}>
        <CircularProgress
          value={this.state.minutes * 60 + this.state.seconds}
          radius={120}
          activeStrokeColor={colors.DarkColor}
          showProgressValue={false}
          progressValueColor={'black'}
          inActiveStrokeColor={COLORS.TRANSPARENT}
          activeStrokeWidth={15}
          duration={1000}
          maxValue={detectMaxValue()}
          title={renderTextCircular()}
          titleColor={'white'}
          circleBackgroundColor={colors.backgroundCircle}
          titleStyle={{fontWeight: 'bold'}}
          clockwise={false}
        />
        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {width: 20, height: 20},
            ]}></TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {width: 20, height: 20},
            ]}></TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {width: 20, height: 20},
            ]}></TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {width: 20, height: 20},
            ]}></TouchableOpacity>
        </View>
        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={[styles.buttonStyle, {width: 60, height: 60}]}
            onPress={this.reset}>
            <MaterialCommunityIcons name={'stop'} color={'#fff'} size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.btnState === 'Start'
                ? styles.buttonStyle
                : styles.buttonStylePause
            }
            onPress={this.chnageBtnState}>
            <MaterialCommunityIcons
              name={this.state.btnState === 'Start' ? 'play' : 'pause'}
              color={
                this.state.btnState === 'Start' ? '#fff' : colors.DarkColor
              }
              size={32}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonStyle, {width: 60, height: 60}]}
            onPress={this.reset}>
            <MaterialCommunityIcons name="check" color={'#fff'} size={32} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// Creating a style sheet to write some styles
const styles = StyleSheet.create({
  viewStyles: {
    alignItems: 'center',
  },

  textStyles: {
    fontSize: 48,
  },

  inputStyles: {
    paddingHorizontal: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonStyle: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    marginLeft: 16,
    backgroundColor: colors.DarkColor,
  },
  buttonStylePause: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    marginLeft: 16,
    borderWidth: 2,
    borderColor: colors.DarkColor,
  },
  rowButtons: {
    flexDirection: 'row',
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
