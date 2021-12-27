import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { server, showError } from '../common';

import todayImage from '../../assets/imgs/today.jpg';
import commomStyles from '../commomStyles';
import Task from '../components/Task';
import AddTask from './AddTask';

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: [],
};
export default class TaskList extends Component {
  state = {
    ...initialState,
  };

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState');
    const savedState = JSON.parse(stateString) || initialState;
    this.setState({ showDoneTasks: savedState.showDoneTasks }, this.filterTasks);
    await this.loadTasks();
  };

  loadTasks = async () => {
    try {
      const maxDate = moment().endOf('day').toISOString();
      const res = await axios.get(`${server}/tasks?date=${maxDate}`);
      this.setState({ tasks: res.data }, this.filterTasks);
    } catch (e) {
      showError(e.response.data);
    }
  };

  filterTasks = () => {
    const visibleTasks = this.state.showDoneTasks
      ? [...this.state.tasks]
      : [...this.state.tasks.filter(t => t.doneAt === null)];
    this.setState({ visibleTasks });

    AsyncStorage.setItem(
      'tasksState',
      JSON.stringify({
        showDoneTasks: this.state.showDoneTasks,
      }),
    );
  };

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.loadTasks);
  };

  saveTask = async task => {
    try {
      await axios.post(`${server}/tasks`, { ...task });
      this.setState({ showAddTask: false }, this.loadTasks);
    } catch (e) {
      showError(e.response.data);
    }
  };

  toggleTask = async taskId => {
    try {
      await axios.put(`${server}/tasks/${taskId}/toggle`);
      this.loadTasks();
    } catch (e) {
      showError(e);
    }
  };

  onCancel = () => {
    this.setState({ showAddTask: false });
  };

  deleteTask = async taskId => {
    try {
      await axios.delete(`${server}/tasks/${taskId}`);
      this.loadTasks();
    } catch (e) {
      showError(e);
    }
  };

  render() {
    const today = moment().locale('pt-br').format('ddd, D, [de] MMMM');

    return (
      <View style={styles.container}>
        <AddTask isVisible={this.state.showAddTask} onCancel={this.onCancel} saveTask={this.saveTask} />
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commomStyles.colors.secondary}
                onPress={this.toggleFilter}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}> {today} </Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.setState({ showAddTask: true })}
          activeOpacity={0.7}
        >
          <Icon name="plus" size={20} color={commomStyles.colors.secondary} />
        </TouchableOpacity>
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
    fontFamily: commomStyles.fontFamily,
    color: commomStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: commomStyles.fontFamily,
    color: commomStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginTop: Platform.os === 'ios' ? 40 : 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commomStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
