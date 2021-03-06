import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Alert, FlatList, Dimensions } from 'react-native'

//Import Custom
import HeaderBar from '../Custom/HeaderBar';

//Import Components
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

//Import Utilities
import Networking from '../Config/Networking';
import { UserProfile } from '../Config/Models';
import LoadingIndicator from '../Utils/LoadingIndicator';
import { Colors } from '../Utils/Constants';

interface IProps {
    navigation: any
}

interface IState {
    userFollowers: UserProfile[],
    searchResult: UserProfile[],
    isLoading: boolean,
    query: string,
}

export default class Followers extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userFollowers: null,
            searchResult: null,
            isLoading: false,
            query: null
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        AsyncStorage.getItem('userProfile', (error, result) => {
            let userProfile: UserProfile = JSON.parse(result);
            Networking.getUserFollowers(userProfile.login)
                .then(response => {
                    this.setState({ isLoading: false, userFollowers: response.data })
                })
                .catch(error => {
                    this.setState({ isLoading: false });
                    Alert.alert('Network Error', error.message)
                })
        })
    }
    _filterResults = (text: string) => {
        const { userFollowers } = this.state;
        this.setState({ query: text }, () => {
            let result;
            if (text === null || text === undefined) {
                return
            }
            if (userFollowers !== undefined && userFollowers !== null && userFollowers.length > 0) {
                result = userFollowers.filter((follower: UserProfile) => {
                    return follower.login.search(text.toLowerCase()) !== -1 || follower.login.search(text) !== -1;
                });
                this.setState({ searchResult: result });
            }
        });
    }
    _renderFollowers = (item: UserProfile) => {
        const imageSource = item.avatar_url ? { uri: item.avatar_url } : require('../Assets/profile.png')
        return (
            <View style={styles.itemContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.imageStyle} source={imageSource} />
                    <View>
                        <Text style={styles.name}>{item.login}</Text>
                        <Text style={styles.login}>{'UserId ' + item.id}</Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        if (this.state.isLoading) {
            return (
                <LoadingIndicator isLoading={this.state.isLoading} />
            )
        }
        let data = this.state.userFollowers;
        if (this.state.query) {
            data = this.state.searchResult
        }
        return (
            <View>
                <HeaderBar HeaderTitle='FOLLOWERS' onButtonPressed={() => this.props.navigation.toggleDrawer()} />
                <SearchBar
                    style={{ marginTop: 12 }}
                    placeholder='Type User name here'
                    lightTheme={true}
                    onChangeText={(text) => this._filterResults(text)}
                    value={this.state.query} />
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={data}
                    renderItem={({ item }) => this._renderFollowers(item)}
                    showsVerticalScrollIndicator={false}
                    style={{ height: Dimensions.get('window').height - 230 }}
                    ListEmptyComponent={() => <View style={styles.emptyMessage}>
                        <Text style={styles.emptyText}>Sorry ... no Followers found</Text>
                    </View>} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginEnd: 12
    },
    itemContainer: {
        backgroundColor: 'white',
        marginVertical: 8,
        width: Dimensions.get('window').width - 24,
        marginHorizontal: 12,
        padding: 12,
        shadowColor: Colors.lightGrey,
        shadowOpacity: 0.7,
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 2,
        borderRadius: 10,
        justifyContent: 'center'
    },
    name: {
        fontWeight: '600',
        fontSize: 18,
        color: Colors.greyTextColor,
        marginBottom: 12
    },
    login: {
        color: Colors.lightGrey,
        fontSize: 14,
        fontWeight: '400'
    },
    emptyMessage: {
        marginTop:(Dimensions.get('window').height / 2) - 100
    },
    emptyText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    }
})