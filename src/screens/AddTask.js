import React, { Component } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import commomStyles from '../commomStyles';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

const initialStat = {
  desc: '',
  estimateAt: new Date(),
  showDatePicker: false,
  doneAt: null,
};

export default class AddTask extends Component {
  state = {
    ...initialStat,
  };

  saveTask = () => {
    this.setState({ ...initialStat });
    this.props.saveTask({
      desc: this.state.desc,
      estimateAt: this.state.estimateAt,
      doneAt: this.state.doneAt,
    });
  };

  onCancel = () => {
    this.setState({ ...initialStat });
    this.props.onCancel();
  };

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.estimateAt}
        onChange={(_, date) => this.setState({ date, showDatePicker: false })}
        mode="date"
      />
    );

    const dateString = moment(this.state.estimateAt).format('ddd, D [de] MMMM [de] YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
            <Text style={styles.date}> {dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe a descrição..."
            value={this.state.desc}
            onChangeText={desc => this.setState({ desc })}
          />
          {this.getDatePicker()}
          <View style={styles.buttons}>
            <TouchableOpacity>
              <Text style={styles.button} onPress={this.onCancel}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.button} onPress={() => this.saveTask()}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: '#fff',
  },
  header: {
    fontFamily: commomStyles.fontFamily,
    backgroundColor: commomStyles.colors.today,
    color: commomStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: commomStyles.fontFamily,

    height: 40,
    margin: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commomStyles.colors.today,
  },
  date: {
    fontFamily: commomStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
});
