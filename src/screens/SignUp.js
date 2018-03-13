import React, { Component } from 'react'
import {
    View,
    Text,
    Input,
    TextInput,
    KeyboardAvoidingView,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux';
import { authFormUpdate, signUpUserThunk } from '../reducers/auth';

export class SignUp extends Component {
    constructor(props) {
        super(props)

        this.onButtonPress = this.onButtonPress.bind(this)
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: '#4D5966' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    onButtonPress(navigation) {
        const { firstName, lastName, email, password } = this.props
        this.props.signUpUser({
            firstName, 
            lastName,
            email,
            password
        }, navigation)
    }

    renderButton() {
        if (this.props.loading) return <ActivityIndicator size='large' />
        else {
            return (
                <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.onButtonPress(this.props.navigation)}
                >
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.screenContainer}>
                <View style={styles.loginContainer}>
                    <View style={styles.headerContainer}>
                        {/* <Text style={styles.titleText}>outfit</Text>
                        <Text style={styles.subtitle}>the style network</Text> */}
                        <Image style={styles.logo} source={require('../../assets/logonew.png')}/>
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.container}>
                        <StatusBar barStyle="light-content" />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="First Name"
                            placeholderTextColor="#fff"
                            value={this.props.firstName}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'firstName', value: text })}
                        />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Last Name"
                            placeholderTextColor="#fff"
                            value={this.props.lastName}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'lastName', value: text })}
                        />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Email"
                            placeholderTextColor="#fff"
                            value={this.props.email}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'email', value: text })}
                        />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Password"
                            placeholderTextColor="#fff"
                            secureTextEntry
                            value={this.props.password}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'password', value: text })}
                        />
                        {this.renderError()}
                        {this.renderButton()}
                        <Text style={styles.loginText}>Already have an account?</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.buttonText}>LOG IN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

        )
    }
}

const styles = {
    screenContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    // loginContainer: {
    //     alignItems: 'center',
    //     flexGrow: 1,
    // },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 350,
        height: 350
    },
    headerContainer: {
        marginTop: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30,
        color: '#775839',
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
        backgroundColor: 'rgba(91, 87, 86, 0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer: {
        backgroundColor: '#AE7F52',
        paddingVertical: 15,
        borderWidth: 5,
        borderRadius: 5,
        borderColor: 'white'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center'
    },
    loginText: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14,
        color: 'rgba(91, 87, 86, 0.7)'
    }
}

const mapStateToProps = ({ auth }) => {
    const { firstName, lastName, email, password, error, loading } = auth;
    return {
        firstName,
        lastName,
        email,
        password,
        error,
        loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUpUser: (credentials, navigation) => {
            dispatch(signUpUserThunk(credentials, navigation))
        },
        authFormUpdate: ({ prop, value }) => {
            dispatch(authFormUpdate({ prop, value }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);