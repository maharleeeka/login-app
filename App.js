import React from 'react';
import {
  Alert,
  Button,
  Images,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { images } from './images';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'dummy-email@email.com',
      password: 'dummy-pwd',
      error_messages: {
        email_error: '',
        password_error: ''
      },
      button_status: true
    }
  }

  onChangeEmail(email) {
    this.setState({ email });
  }

  onChangePassword(password) {
    this.setState({ password });
  }

  checkEmailValidity() {
      //add checking if text is an email address
      return true;
  }

  checkPasswordValidity() {
    curr_pw = this.state.password;
    if(curr_pw.length < 6 || curr_pw.length > 12) {
      return false;
    }
    return true;
  }

  checkInputFieldEmail() {
    if (this.state.email === '') {
      return false;
    }
    return true;
  }
  checkInputFieldPassword() {
    if (this.state.password === '') {
      return false;
    }
    return true;
  }

  checkInputField() {
    if (this.state.email === '' || this.state.password === '') {
      return false;
    }
    return true;
  }

  onEndEmailEditing() {
    const error_list = this.state.error_messages;
    this.checkInputFieldEmail().then({} => {
      this.checkEmailValidity().catch({} => {
        error_list.email_error = 'not correct format for email address';
      })
    }).catch({} => {
      error_list.email_error = 'field is empty';
    });
    this.setState({ error_messages: error_list })
  }

  onEndPasswordEditing() {
    const error_list = this.state.error_messages;
    this.checkInputFieldPassword().then({} => {
      this.checkPasswordValidity().catch({} => {
        error_list.password_error = 'please use at least 6 - 12 characters';
      })
    }).catch({} => {
      error_list.password_error = 'field is empty';
    });
    this.setState({ error_messages: error_list })
  }

  checkForErrors() {
    if (error_list.email_error || error_list.password_error) {
      //there is an error message
      this.setState({ button_status: false })
      return true;
    }
    return false;
  }

  onSignInPress() {
    this.checkForErrors().catch({} => {
      Alert.alert('','Login success!');
    })
  }
  onSignInPress() {
    const error_list = this.state.error_messages;

    this.checkInputFieldEmail().then({} => {
      this.checkEmailValidity().catch({} => {
        error_list.email_error = 'not correct format for email address';
      })
    }).catch({} => {
      error_list.email_error = 'field is empty';
    });

    this.checkInputFieldPassword().then({} => {
      this.checkPasswordValidity().catch({} => {
        error_list.password_error = 'please use at least 6 - 12 characters';
      })
    }).catch({} => {
      error_list.password_error = 'field is empty';
    });

    if (error_list.email_error || error_list.password_error) {
      //there is an error message
      this.setState({ button_status: false })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={images.logo}
          style={styles.logo}
        />
        <View style={styles.formContainer}>
          <TextInput
            label="Email"
            placeholder="Input email address"
            value={this.state.email}
            onChangeText={(email) => this.onChangeEmail(email)}
            onEndEditing={() => this.onEndEmailEditing()}
          />
          <Text> {this.state.email_error} </Text>
          <TextInput
            label="Password"
            placeholder="Input password"
            value={this.state.password}
            onChangeText={(password) => this.onChangePassword(password)}
            onEndEditing={() => this.onEndPasswordEditing()}
            secureTextEntry
          />
          <Text> {this.state.password_error} </Text>

          <TouchableOpacity
            disabled={this.state.button_status}
            onPress={this.onSignInPress()}
          >
            <Text> Sign In </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%'
  },
  formContainer: {

  }
});
