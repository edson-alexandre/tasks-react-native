import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment';
import 'moment/locale/pt-br';
import commomStykes from '../commomStykes';
import Task from '../components/Task';
import AddTask from './AddTask';

export default class TaskList extends Component {
  state = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: [
      {
        id: Math.random(),
        desc: 'Comprar Livro de React Native',
        estimatedAt: new Date(),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: 'Ler Livro de React Native',
        estimatedAt: new Date(),
        doneAt: null,
      },
    ],
  };

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
  };

  filterTasks = () => {
    const visibleTasks = this.state.showDoneTasks
      ? [...this.state.tasks]
      : [...this.state.tasks.filter(t => t.doneAt === null)];
    this.setState({ visibleTasks });
  };

  toggleTask = taskId => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });
    this.setState({ tasks }, this.filterTasks);
  };

  onCancel = () => {
    this.setState({ showAddTask: false });
  };

  componentDidMount = () => {
    this.filterTasks();
  };

  render() {
    const today = moment().locale('pt-br').format('ddd, D, [de] MMMM');

    return (
      <View style={styles.container}>
        <AddTask isVisible={this.state.showAddTask} onCancel={this.onCancel} />
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commomStykes.colors.secondary}
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
            renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.setState({ showAddTask: true })}
          activeOpacity={0.7}
        >
          <Icon name="plus" size={20} color={commomStykes.colors.secondary} />
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
    backgroundColor: commomStykes.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
