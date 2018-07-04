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
      disable_btn: false
    }

    this.onEndEmailEditing = this.onEndEmailEditing.bind(this);
    this.onEndPasswordEditing = this.onEndPasswordEditing.bind(this);
    this.onSignInPress = this.onSignInPress.bind(this);
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
    const curr_pw = this.state.password;
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
            this.handleBtnStatusChange();
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
            this.handleBtnStatusChange();
        }
    } else {
        error_list.password_error = 'field is empty';
    }

    this.setState({ error_messages: error_list });
  }

  checkForErrors() {
    if (this.state.error_messages.email_error != '' || this.state.error_messages.password_error != '') {
      //there is an error message
      this.setState({ disable_btn: true })
      return true;
    }
      this.setState({disable_btn: false})
      return false;
  }

  handleBtnStatusChange() {
     if (this.checkForErrors()) {
      this.setState({ disable_btn: true });
    } else {
      this.setState({ disable_btn: false });
    }
  }

  onSignInPress() {
    const status = this.checkForErrors();

      if (!status) {
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
    if (this.checkForErrors()) {
      this.setState({ disable_btn: true });
    } else {
      this.setState({ disable_btn: false });
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
                disabled={this.state.disable_btn}
                style={
                  [this.state.disable_btn ? styles.btnStyleDisabled : styles.btnStyle]
                }
                onPress={this.onSignInPress}
              >
                <Text style={{ color: '#fff'}}> Sign In </Text>
              </TouchableOpacity>

             </View>
            <View style={{ height: 130 }} />
          </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 10,
  },
  logoContainer: {
    paddingTop: 40,
  },
  logo: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').height * .55
  },
  label: {
    fontSize: 18
  },
  inputStyle: {
      color: '#333',
      fontSize: 16,
      height: 40,
      borderWidth: 1,
      borderColor: '#341769',
      borderRadius: 3,
      padding: 5
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
  },
  btnStyleDisabled: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: '#e3e3e3',
      borderRadius: 3
  }
});
