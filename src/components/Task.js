import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import moment from 'moment';
import 'moment/locale/pt-br';

import commomStyles from '../commomStyles';

export default props => {
  const doneOrNotStyle = props.doneAt !== null ? { textDecorationLine: 'line-through' } : {};

  const date = props.doneAt ? props.doneAt : props.estimatedAt;
  const formatedDate = moment(date).locale('pt-br').format('ddd, D, [de] MMMM');

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props.id)}>
        <Icon name="trash" size={30} color="#fff" />
      </TouchableOpacity>
    );
  };

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#fff" style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  function getCheckView(doneAt) {
    if (doneAt !== null) {
      return (
        <View style={styles.done}>
          <Icon name="check" size={20} color={commomStyles.colors.secondary} />
        </View>
      );
    } else {
      return <View style={styles.pendding} />;
    }
  }

  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
          <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, doneOrNotStyle]}> {props.desc} </Text>
          <Text style={styles.date}> {formatedDate} </Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  pendding: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4d7031',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    fontFamily: commomStyles.fontFamily,
    color: commomStyles.colors.mainTerxt,
    fontSize: 15,
  },
  date: {
    fontFamily: commomStyles.fontFamily,
    color: commomStyles.colors.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  left: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  excludeIcon: {
    marginLeft: 10,
  },
  excludeText: {
    fontFamily: commomStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
    margin: 10,
  },
});
