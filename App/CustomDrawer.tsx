import React, { Component } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Colors } from './Utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';

export default class CustomDrawer extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            userProfile: null
        }
    }
    _getProfileData = () => {
        AsyncStorage.getItem('userProfile', (error, result) => {
            this.setState({ userProfile: JSON.parse(result) })
        })
    }
    componentDidMount() {
        this._getProfileData();
    }
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    _renderMenuOption = (buttonText: string, image: any, onPress: () => void) => {
        return (
            <TouchableOpacity style={styles.optionLineContainer} onPress={onPress}>
                {image}
                <Text style={styles.optionText}>{buttonText}</Text>
            </TouchableOpacity>
        )
    }
    _logOut = () => {
        AsyncStorage.removeItem('userProfile', (error => {
            this.props.navigation.navigate('LogInScreen')
        }))
    }
    render() {
        const userImage = (this.state.userProfile && this.state.userProfile.avatar_url) ? { uri: this.state.userProfile.avatar_url } : require('./Assets/profile.png')
        return (
            <View style={{ flex: 1, backgroundColor: Colors.lightGrey, padding: 12 }}>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                        <Image style={styles.drawerIconStyle} source={require('./Assets/chats-icon.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.navigateToScreen('Profile')}>
                        <View style={styles.imageContainer}>
                            <Image resizeMode='contain' source={userImage} style={{ width: 150, height: 150 }} />
                            <Text style={styles.userName}>{this.state.userProfile && this.state.userProfile.name}</Text>
                        </View>
                    </TouchableOpacity>
                    {this._renderMenuOption('Repos', <Image resizeMode='contain' source={require('./Assets/repos.png')} style={styles.iconImage} />, this.navigateToScreen('Repos'))}
                    {this._renderMenuOption('Followers', <Image resizeMode='contain' source={require('./Assets/followers.png')} style={styles.iconImage} />, this.navigateToScreen('Followers'))}
                    {this._renderMenuOption('Following', <Image resizeMode='contain' source={require('./Assets/following.png')} style={styles.iconImage} />, this.navigateToScreen('Following'))}
                    {this._renderMenuOption('Log Out', <Image resizeMode='contain' source={require('./Assets/logout.png')} style={styles.iconImage} />, () => this._logOut())}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    drawerIconStyle: {
        width: 20, 
        height: 20, 
        marginLeft: 12, 
        marginTop: 30
    },
    imageContainer: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        marginBottom: 20
    },
    userName: {
        color: Colors.greyTextColor,
        fontSize: 14,
        fontWeight: '500',
        marginTop: 16
    },
    optionLineContainer: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 12
    },
    iconImage: {
        width: 20,
        height: 20,
        marginRight: 14,
        tintColor: Colors.greyTextColor
    },
    optionText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '700'
    }
})
