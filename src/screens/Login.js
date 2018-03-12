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
import { connect } from 'react-redux'
import { authFormUpdate, loginUserThunk } from '../reducers/auth' 

export class Login extends Component {

    onButtonPress(navigation) {
        const { email, password } = this.props;
        this.props.loginUser({
            email,
            password
        }, navigation)
        // .then(this.props.navigation.navigate('Main'))
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

    renderButton() {
        if (this.props.loading) return <ActivityIndicator size='large' />
        else {
            return (
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => this.onButtonPress(this.props.navigation)}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            )
        }
    }

    render () {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.screenContainer}>

                <View style={styles.loginContainer}>
                    {/* <Image style={styles.logo} source={require('../../public/logo.png')} /> */}

                </View>
                <View style={styles.formContainer}>
                    <View style={styles.container}>
                        <StatusBar barStyle="light-content" />
                        <TextInput style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='email-address'
                            returnKeyType="next"
                            placeholder='Email'
                            placeholderTextColor='rgba(140,107,75,0.7)'
                            value={this.props.email}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'email', value: text })}
                        />

                        <TextInput style={styles.input}
                            placeholder='Password'
                            placeholderTextColor='rgba(140,107,75,0.7)'
                            value={this.props.password}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'password', value: text })}
                            secureTextEntry
                        />

                        {this.renderError()}

                        {this.renderButton()}

                        <Text style={styles.signUpText}>Dont have an account?</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('SignUpForm')}>
                            <Text style={styles.buttonText}>SIGN UP</Text>
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
        backgroundColor: '#f4eee8',
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
        backgroundColor: 'rgba(140,107,75,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer: {
        backgroundColor: '#775839',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton: {
        backgroundColor: '#775839',
        color: '#fff'
    },
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center'
    },
    signUpText: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14,
        color: 'rgba(140,107,75,0.7)'
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return {
        email,
        password,
        error,
        loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (credentials, navigation) => {
            dispatch(loginUserThunk(credentials, navigation))
        },
        authFormUpdate: ({ prop, value }) => {
            dispatch(authFormUpdate({ prop, value }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);