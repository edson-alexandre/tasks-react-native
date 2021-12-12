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
import commomStykes from '../commomStykes';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

const initialStat = {
  desc: '',
  date: new Date(),
  showDatePicker: false,
};

export default class AddTask extends Component {
  state = {
    ...initialStat,
  };

  getDateTimePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({ date, showDatePicker: false })}
        mode="date"
      />
    );

    const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY');

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
          {this.getDateTimePicker()}
          <View style={styles.buttons}>
            <TouchableOpacity>
              <Text style={styles.button} onPress={this.props.onCancel}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
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
    fontFamily: commomStykes.fontFamily,
    backgroundColor: commomStykes.colors.today,
    color: commomStykes.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: commomStykes.fontFamily,

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
    color: commomStykes.colors.today,
  },
  date: {
    fontFamily: commomStykes.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
});
