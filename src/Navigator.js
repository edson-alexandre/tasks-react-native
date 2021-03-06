import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Auth from './screens/Auth';
import TaskList from './screens/TaskList';

const menuRoutes = {
  Today: {
    name: 'Today',
    screen: props => <TaskList {...props} title="Hoje" daysAhead={0} />,
    navigationOptions: {
      title: 'Hoje',
    },
  },
  Tomorrow: {
    name: 'Tomorrow',
    screen: props => <TaskList {...props} title="Amanhã" daysAhead={1} />,
    navigationOptions: {
      title: 'Amanhã',
    },
  },
  Week: {
    name: 'Week',
    screen: props => <TaskList {...props} title="Semana" daysAhead={7} />,
    navigationOptions: {
      title: 'Semana',
    },
  },
  Month: {
    name: 'Month',
    screen: props => <TaskList {...props} title="Mês" daysAhead={30} />,
    navigationOptions: {
      title: 'Mês',
    },
  },
};

const menuNavigator = createDrawerNavigator(menuRoutes);

const MainRoutes = {
  Auth: {
    name: 'Auth',
    screen: Auth,
  },
  Home: {
    name: 'Home',
    screen: menuNavigator,
  },
};

const mainNavigator = createSwitchNavigator(MainRoutes, {
  initialRouteName: 'Auth',
});

export default createAppContainer(mainNavigator);
