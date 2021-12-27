import { Alert, Platform } from 'react-native';

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const showError = error => {
  Alert.alert('Ops! Ocorreu um problema', `Mensagem: ${error}!`);
};

const showSuccess = message => {
  Alert.alert('Sucesso!', message);
};

export { server, showError, showSuccess };
