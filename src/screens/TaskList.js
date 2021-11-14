import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment';
import 'moment/locale/pt-br';
import commomStykes from '../commomStykes';
import Task from '../components/Task';

export default class TaskList extends Component {
  render() {
    const today = moment().locale('pt-br').format('ddd, D, [de] MMMM');

    return (
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}> {today} </Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <Task desc="Tarefa 1" estimatedAt={new Date()} doneAt={new Date()} />
          <Task desc="Tarefa 2" estimatedAt={new Date()} doneAt={null} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commomStykes.fontFamily,
    color: commomStykes.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: commomStykes.fontFamily,
    color: commomStykes.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
});
