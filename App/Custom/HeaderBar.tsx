import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors } from '../Utils/Constants';

type HeaderProps = {
    HeaderTitle: string;
    onButtonPressed: () => void;
}

const Header = (props: HeaderProps) => {
    return (
        <View>
            {Platform.OS === 'ios' && <View style={{ height: 30 }} />}
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => props.onButtonPressed()}>
                    <Image style={styles.drawerIcon} source={require('../Assets/chats-icon.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{props.HeaderTitle}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerIcon: {
        width: 20,
        height: 20,
        tintColor: 'white',
        //marginTop: -35,
        marginLeft: 20,
        zIndex: 1000
    },
    headerBar: {
        height: 50,
        backgroundColor: Colors.greyTextColor,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerTitle: {
        fontSize: 24,
        color: 'white',
        fontWeight: '600',
        width: Dimensions.get('window').width - 80,
        textAlign:'center',
        marginRight:40
    }
})

export default Header;