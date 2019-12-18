import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native'

// Utilities Import
import { Colors } from '../Utils/Constants';
import LoadingIndicator from '../Utils/LoadingIndicator'

// Config Import
import Networking from '../Config/Networking';

// Components Import
import AsyncStorage from '@react-native-community/async-storage';

interface IProps {
  navigation: any;
}

interface IState {
  userId: string;
  isLoading: boolean;
}

export default class LogIn extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      userId: null,
      isLoading: false
    }
  }
  _updateText = (text: string) => {
    this.setState({ userId: text })
  }
  _onSubmit = () => {
    const { userId } = this.state;
    if (userId === null || userId === '') {
      Alert.alert('Error Input', 'You must enter userID before submit !!!');
      return
    }
    this.setState({ isLoading: true });
    Networking.getUserProfile(userId).then(response => {
      this.setState({ isLoading: false });
      if ('message' in response.data) {
        Alert.alert('Not Found', 'Sorry, user entered is not found. Please try again');
        this.setState({ userId: null });
        return
      }
      else {
        AsyncStorage.setItem('userProfile', JSON.stringify(response.data), ((error) => {
          if (error) {
            Alert.alert('Storage Error', 'Failed to store data in local storage.')
          }
        }));
        this.setState({ userId: null });
        this.props.navigation.navigate('DrawerNavigator')
      }
    })
      .catch(error => {
        this.setState({ isLoading: false, userId: null });
        Alert.alert('Error', 'Failed to get GitHub account with this userId. Please enter a correct userId');
      })
  }
  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <LoadingIndicator isLoading={isLoading} />
      )
    }
    return (
      <View style={Styles.mainContainer}>
        <Text style={Styles.mainTitle}> SIGN IN </Text>
        <Text style={Styles.subTitle}>Please enter Github UserID</Text>
        <TextInput
          placeHolder='User ID'
          onChangeText={(text) => this._updateText(text)}
          value={this.state.userId}
          style={Styles.textInput}
          clearButtonMode='always'
          placeholderTextColor={Colors.lightGrey}
          selectTextOnFocus={true} />
        <TouchableOpacity style={Styles.buttonContainer} onPress={() => this._onSubmit()}>
          <Text style={Styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const windowWidth = Dimensions.get('window').width;
const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.greyTextColor
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.greyTextColor
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    width: windowWidth * 0.65,
    height: 40,
    padding: 8,
    fontSize: 14
  },
  buttonContainer: {
    width: windowWidth * 0.4,
    height: 40,
    borderRadius: 5,
    backgroundColor: Colors.greyTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.greyTextColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    elevation: 2
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white'
  }
})