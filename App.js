import React from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
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
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleBtnStatusChange = this.handleBtnStatusChange.bind(this);
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
    if(curr_pw.length >= 6 && curr_pw.length <= 12) {
      return true;
    }
    return false;
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

  onChangeEmail(email) {
    this.setState({ email })
    this.setState({ disable_btn: false})
  }
  onChangePassword(password) {
    this.setState({ password })
    this.setState({ disable_btn: false})
  }
  onEndEmailEditing() {
    const error_list = this.state.error_messages;
    if (this.checkInputFieldEmail()) {
        if (!(this.checkEmailValidity())) {
            error_list.email_error = 'not correct format for email address';
            this.handleBtnStatusChange();
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
            error_list.password_error = 'please use at least 6 - 12 characters';
            this.handleBtnStatusChange();
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
      return true;
    }
      return false;
  }

  handleBtnStatusChange() {
    console.log(this.state.error_messages);
    if (this.checkForErrors()) {
      this.setState({ disable_btn: true });
    } else {
      this.setState({ disable_btn: false });
    }
  }

  onSignInPress() {
    this.onEndEmailEditing()
    this.onEndPasswordEditing()
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
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={(email) => {this.onChangeEmail(email)}}
                    onEndEditing={this.onEndEmailEditing}
                    autoCapitalize="none"
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
                      onChangeText={(password) => {this.onChangePassword(password)}}
                      onEndEditing={this.onEndPasswordEditing}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      secureTextEntry
                    />
                    <Text style={styles.errorTextStyle}> {this.state.error_messages.password_error} </Text>
                </View>

              <TouchableOpacity
                disabled={this.state.disable_btn}
                style={
                  [this.state.disable_btn ? [styles.btnStyle,styles.btnStyleDisabled] : styles.btnStyle]
                }
                onPress={this.onSignInPress}
              >
                <Text style={styles.btnText}> Sign In </Text>
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
    alignItems: 'center',
    backgroundColor: '#faf8ff'
  },
  formContainer: {
    width: '100%',
    padding: 10,
    paddingTop: 50
  },
  logoContainer: {
    paddingTop: 40,
    height: Dimensions.get('window').height * .55
  },
  logo: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').height * .55
  },
  formInputCard: {
    paddingHorizontal: 5
  },
  label: {
    fontSize: 15,
  },
  inputStyle: {
      color: '#333',
      backgroundColor: '#fff',
      fontSize: 16,
      height: 40,
      borderWidth: 1,
      borderColor: '#aa8fdb',
      borderRadius: 3,
      padding: 10,
      marginHorizontal: 2
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic',
  },
  btnStyle: {
      width: '95%',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      backgroundColor: '#714db2',
      borderRadius: 3,
      marginHorizontal: 2,
      marginTop: 10,
      alignSelf: 'center'
  },
  btnStyleDisabled: {
      backgroundColor: '#e3e3e3',
  },
  btnText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 15
  }
});
