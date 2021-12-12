import React, { Component } from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput } from 'react-native';
import commomStykes from '../commomStykes';

const initialStat = {
  desc: '',
};

export default class AddTask extends Component {
  state = {
    ...initialStat,
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
});
