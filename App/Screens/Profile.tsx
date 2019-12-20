import React, { Component } from 'react'
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

// Custom components import
import HeaderBar from '../Custom/HeaderBar';
import { Colors } from '../Utils/Constants';
import { UserProfile } from '../Config/Models';

interface IProps {
    navigation: any
}

interface IState {
    userImage: any,
    userName: any,
    userEmail: any,
    userLocation: any
}
export default class Profile extends Component <IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userImage: null,
            userName: null,
            userEmail: null,
            userLocation: null
        }
    }
    _getSavedData = () => {
        AsyncStorage.getItem('userProfile', (error, result) => {
            let userProfile : UserProfile = JSON.parse(result);
            this.setState({
                userImage: userProfile.avatar_url,
                userName: userProfile.name ? userProfile.name : userProfile.login,
                userEmail: userProfile.email,
                userLocation: userProfile.location
            })
        })
    }
    componentDidMount() {
        this._getSavedData();
    }
    _renderLine = (label: string, value: string) => {
        return (
            <View style={styles.lineContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        )
    }
    render() {
        const { userImage, userName, userEmail, userLocation } = this.state;
        return (
            <View>
                <HeaderBar HeaderTitle='PROFILE' onButtonPressed={() => this.props.navigation.toggleDrawer()} />
                <View>
                    <Image
                        style={styles.imageStyle}
                        source={userImage ? { uri: userImage } : require('../Assets/profile.png')} />
                    {this._renderLine('User name', userName ? userName : 'no name found!!')}
                    {this._renderLine('E-mail', userEmail ? userEmail : 'no email found!!')}
                    {this._renderLine('location', userLocation ? userLocation : 'no location found!!')}
                </View>
            </View>
        )
    }
}
const widnowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    imageStyle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 50,
        marginHorizontal: (widnowWidth - 200) / 2
    },
    lineContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        marginStart: widnowWidth * 0.15,
        alignItems: 'center'
    },
    label: {
        width: 120,
        color: Colors.lightGrey,
        fontSize: 14,
        fontWeight: '400'
    },
    value: {
        color: Colors.greyTextColor,
        fontSize: 14,
        fontWeight: '600'
    }
})