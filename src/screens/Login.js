import React, { Component } from 'react'
import { 
    View, 
    Text, 
    Input, 
    TextInput, 
    KeyboardAvoidingView, 
    StatusBar, 
    TouchableOpacity, 
    Image 
} from 'react-native'

export default class Login extends Component {
    render () {
        return (
            // <KeyboardAvoidingView>
            //     <View>
            //         <Image />
            //     </View>
            // </KeyboardAvoidingView>
            <View>
                <Text>THIS IS THE LOGIN SCREEN</Text>
            </View>
        )
    }
}

const styles = {
    screenContainer: {
        flex: 1,
        backgroundColor: '#4D5966',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 300
    },
    title: {
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    },
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton: {
        backgroundColor: '#2980b6',
        color: '#fff'
    },
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center'
    }
}