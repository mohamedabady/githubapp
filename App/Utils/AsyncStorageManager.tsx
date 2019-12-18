import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export function getAsyncStorageData(keyToBeRetrieved:string) {
    AsyncStorage.getItem(keyToBeRetrieved, (error, result) => {
        // if (!error) {
        //     return result;
        // }
        // else {
        //     Alert.alert('Storage Error', 'Data was not found in internal Storage !!!')
        // }
        return result;
    })
}

export async function setAsyncStorage(key:string, data:any) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
        console.warn('saved data successfully');
    } catch (e) {
        Alert.alert("Error", e);
    }
}

export async function removeAsyncStorage(keyToBeRemoved : string){
    try{
        await AsyncStorage.removeItem(keyToBeRemoved)
    } catch(e){
        Alert.alert("Error", e);
    }
}


