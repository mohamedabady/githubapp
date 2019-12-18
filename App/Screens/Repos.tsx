import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

// Components Import
import AsyncStorage from '@react-native-community/async-storage';

// Models Import
import {UserProfile} from '../Config/Models'

interface IProps{
    navigation: any
}

interface IState{
    userProfile: UserProfile
}
export default class Repos extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            drawerLabel: 'Repos screen',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../Assets/github_logo.png')}
                    style={{ width: 24, height: 24, tintColor: tintColor }}
                />
            ),
        };
    }
    constructor(props: IProps){
        super(props);
        this.state={
            userProfile:null
        }
    }
    _getSavedData=()=>{
        AsyncStorage.getItem('userProfile', (error, result)=>{
            this.setState({userProfile: JSON.parse(result)});
        })
    }
    componentDidMount(){
        this._getSavedData()
    }
    _signOut=()=>{
        AsyncStorage.removeItem('userProfile', (error=>{
            this.props.navigation.navigate('LogInScreen');
        }))
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                    <Image source={require('../Assets/chats-icon.png')}
                        style={{ width: 24, height: 24, tintColor: 'grey' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this._signOut()}>
                    <Text>Sign out</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 40, marginTop: 40, marginHorizontal: 40 }}> Repos Screen </Text>
                {this.state.userProfile && <Text style={{ fontSize: 12, marginTop: 40, marginHorizontal: 40 }}>{JSON.stringify(this.state.userProfile, null, 2)}</Text>}
            </View>
        )
    }
}