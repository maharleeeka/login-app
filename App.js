import React from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  ScrollView,
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
      email: '',
      password: '',
      error_messages: {
        email_error: '',
        password_error: ''
      },
      button_status: true
    }

    this.onEndEmailEditing = this.onEndEmailEditing.bind(this);
    this.onEndPasswordEditing = this.onEndPasswordEditing.bind(this);
  }

  onChangeEmail(email) {
    this.setState({ email });
  }

  onChangePassword(password) {
    this.setState({ password });
  }

  checkEmailValidity() {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.state.email)) {
        return true;
      } else {
        return false;
      }
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
    if (this.checkInputFieldEmail()) {
        if (!(this.checkEmailValidity())) {
            error_list.email_error = 'not correct format for email address';
        } else {
            error_list.email_error = '';
        }
    } else {
        error_list.email_error = 'field is empty';
    }
    this.setState({ error_messages: error_list });
  }

  onEndPasswordEditing() {
    const error_list = this.state.error_messages;
    if (this.checkInputFieldPassword()) {
        if (!(this.checkPasswordValidity())) {
            error_list.password_error = 'please use 6 - 12 characters';
        } else {
            error_list.password_error = '';
        }
    } else {
        error_list.password_error = 'field is empty';
    }

    this.setState({ error_messages: error_list })
  }

  checkForErrors() {
    if (this.state.error_messages.email_error != '' || this.state.error_messages.password_error != '') {
      //there is an error message
      this.setState({ button_status: false })
      return true;
    }
    return false;
  }

  onSignInPress() {
      if (!(this.checkForErrors())) {
          Alert.alert(
            '',
            'Login success!',
            [{text: 'OK', onPress: () => {
                console.log('login ok press');
            }}],
            { cancelable: false }
          )
      }
  }

  render() {
    return (
    <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
              <Image
                source={images.logo}
                style={styles.logo}
                resizeMode="contain"
              />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formInputCard}>
                <Text style={styles.label}> Email </Text>
                <TextInput
                  style={styles.inputStyle}
                  label="Email"
                  placeholder="Input email address"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                  onEndEditing={this.onEndEmailEditing}
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Text style={styles.errorTextStyle}> {this.state.error_messages.email_error} </Text>
            </View>

            <View style={styles.formInputCard}>
                <Text style={styles.label}> Password </Text>
                <TextInput
                  style={styles.inputStyle}
                  label="Password"
                  placeholder="Input password"
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  onEndEditing={this.onEndPasswordEditing}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  secureTextEntry
                />
                <Text style={styles.errorTextStyle}> {this.state.error_messages.password_error} </Text>
            </View>

            <TouchableOpacity
              disabled={this.state.button_status}
              style={styles.btnStyle}
              onPress={this.onSignInPress}
            >
              <Text style={{ color: '#fff'}}> Sign In </Text>
            </TouchableOpacity>

          </View>
        </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 20
  },
  logoContainer: {
    marginTop: 40
  },
  logo: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').height * .55
  },
  formContainer: {
    width: '100%',
    padding: 10
  },
  label: {
    fontSize: 18
  },
  inputStyle: {
      color: '#333',
      fontSize: 16,
      flex: 1,
      padding: 5,
      borderWidth: 1,
      borderColor: '#341769',
      borderRadius: 3
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic',
    paddingVertical: 3
  },
  btnStyle: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: '#341769',
      borderRadius: 3
  }
});
