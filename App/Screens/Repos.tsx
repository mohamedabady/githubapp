import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Alert, Dimensions, StyleSheet } from 'react-native'

// Components Import
import AsyncStorage from '@react-native-community/async-storage';
import HeaderBar from '../Custom/HeaderBar';
import { FlatGrid } from 'react-native-super-grid';

// Models Import
import { UserProfile, Repo, NetworkRepo } from '../Config/Models';

//Utilities Import
import Networking from '../Config/Networking';
import LoadingIndicator from '../Utils/LoadingIndicator';
import { Colors } from '../Utils/Constants';

interface IProps {
    navigation: any
}

interface IState {
    userRepos: Repo[]
    isLoading: boolean
}

export default class Repos extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            userRepos: null,
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        AsyncStorage.getItem('userProfile', (error, result) => {
            let userProfile = JSON.parse(result)
            Networking.getUserRepos(userProfile.login)
                .then(response => {
                    this.setState({ isLoading: false, userRepos: response.data });
                })
                .catch(error => {
                    this.setState({ isLoading: false });
                    Alert.alert('Network Error', error.message);
                })
        })
    }
    // _getRepoLanguage = (repo: NetworkRepo) => {
    //     Networking.getRepoLanguage(repo.name, repo.owner.login)
    //         .then(response => {
    //             const updatedState = this.state.userRepos.forEach(selectedRepo => {
    //                 if (selectedRepo.id === repo.id) {
    //                     selectedRepo.language = response.data
    //                 }
    //             })
    //             this.setState({ userRepos: updatedState });
    //         })
    // }
    _renderRepoItem = (item: NetworkRepo) => {
        const mapedRepo: Repo = {
            repoName: item.name ? item.name : 'no name',
            ownerName: item.owner.login ? item.owner.login : 'no owner',
            description: item.description ? item.description : 'no description',
            createdAt: item.created_at ? new Date(item.created_at).toLocaleString() : 'no date',
            language: item.language ? item.language : 'no language found'
        }
        return (
            <View style={styles.repoContainer}>
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.label}>name:</Text>
                    <Text style={styles.value}>{mapedRepo.repoName}</Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.label}>owner:</Text>
                    <Text style={styles.value}>{mapedRepo.ownerName}</Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.label}>description:</Text>
                    <Text style={styles.value}>{mapedRepo.description}</Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.label}>createdAt:</Text>
                    <Text style={styles.value}>{mapedRepo.createdAt}</Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.label}>language:</Text>
                    <Text style={styles.value}>{mapedRepo.language}</Text>
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
        return (
            <View>
                <HeaderBar HeaderTitle='REPOS' onButtonPressed={() => this.props.navigation.toggleDrawer()} />
                <FlatGrid
                    style={{ height: Dimensions.get('window').height - 120 }}
                    items={this.state.userRepos ? this.state.userRepos : []}
                    itemDimension={(Dimensions.get('window').width / 2) - 18}
                    renderItem={({ item }) => this._renderRepoItem(item)}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => <View>
                        <Text style={styles.emptyText}>Sorry ... no repos found</Text>
                    </View>} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    repoContainer: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 12,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowColor: Colors.lightGrey,
        shadowOpacity: 0.7,
        elevation: 2,
        height: 300
    },
    label: {
        fontSize: 10,
        color: Colors.lightGrey,
        fontWeight: '300',
    },
    value: {
        fontSize: 12,
        color: Colors.greyTextColor,
        fontWeight: '500',
        marginStart: 10
    },
    emptyText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    }
})
