import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

export default class Followers extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            drawerLabel: 'Followers screen',
            drawerIcon: ({ tintColor }) => (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image
                        source={require('../Assets/github_logo.png')}
                        style={{ width: 24, height: 24, tintColor: tintColor }}
                    />
                </TouchableOpacity>
            ),
        };
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                    <Image source={require('../Assets/chats-icon.png')}
                        style={{ width: 24, height: 24, tintColor: 'grey' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 40, marginTop: 40, marginHorizontal: 40 }}> Followers Screen </Text>
            </View>
        )
    }
}
