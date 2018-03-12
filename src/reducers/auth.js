import axios from 'axios'
import { AsyncStorage } from 'react-native'

//ACTION TYPES

const AUTH_FORM_UPDATE = 'AUTH_FORM_UPDATE'
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
const LOGIN_USER_START = 'LOGIN_USER_START';
const SIGN_UP_USER_START = 'SIGN_UP_USER_START';
const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS';
const SIGN_UP_USER_FAIL = 'SIGN_UP_USER_FAIL';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCES';
const CREATE_USER_FAIL = 'CREATE_USER_FAIL';
const GET_USER = 'GET_USER'
const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'

//INITIAL STATE

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    loading: false,
    error: '',
    currentUser: null
}

//ACTION CREATORS

export const authFormUpdate = ({ prop, value }) => {
    return { type: AUTH_FORM_UPDATE, payload: { prop, value }}
}

const loginUserSuccess = (user) => {
    return { type: LOGIN_USER_SUCCESS, user }
}

const loginUserFail = (user) => {
    return { type: LOGIN_USER_FAIL, user }
}

const signUpUserSuccess = (user) => {
    return { type: SIGN_UP_USER_SUCCESS, user }
}

const signUpUserFail = () => {
    return { type: SIGN_UP_USER_FAIL }
}

const userCreated = (user) => {
    return { type: CREATE_USER_SUCCESS, user }
}

const getUser = user => ({ type: GET_USER, user })

//THUNK CREATORS

export const me = () => dispatch => {
    axios.get('http://localhost:1313/auth/me')
    .then(res => {
        dispatch(getUser(res.data))
    })
    .catch(err => console.error('Fetching current user failed', err));

}

export const loginUserThunk = (credentials, navigation) => dispatch => {
    dispatch({ type: LOGIN_USER_START })
    axios.post('http://localhost:1313/auth/login', credentials)
    .then(async res => {
        let userToken = res.data.id.toString()
        dispatch(loginUserSuccess(res.data))
        console.log('useerrrrrrrrr tokkkennnn', userToken)
        await AsyncStorage.setItem('user-token', userToken);
        getUserAndRedirect(res.data, navigation, dispatch)
        dispatch(getUser(res.data))
    })
}

export const signUpUserThunk = (credentials, navigation) => dispatch => {
    dispatch({ type: SIGN_UP_USER_START })
    axios.post('http://localhost:1313/auth/signup', credentials)
    .then(res => {
        dispatch(signUpUserSuccess(res.data))
        getUserAndRedirect(res.data, navigation, dispatch)
        dispatch(getUser(res.data))
    })
    .catch(error => {
        dispatch(signUpUserFail())
        navigation.navigate('SignedOut', { error: 'Authentication failed'})
    })
}

export const logoutUserThunk = (navigation) => dispatch => {
    axios.post('http://localhost:1313/auth/logout')
    .then(async res => {
        await AsyncStorage.removeItem('user-token')
        dispatch({ type: LOG_OUT_SUCCESS })
    })
    .then(() => navigation.navigate('LoggedOut'))
    .catch(err => console.error('Logging out was unsuccesful', err));
}

export const createUser = (user) => {

}


//REDUCER

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_FORM_UPDATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            }
        case SIGN_UP_USER_START:
            return { ...state, loading: true, error: '' }
        case SIGN_UP_USER_SUCCESS:
            return { ...state, loading: false, currentUser: action.user, error: '' }
        case SIGN_UP_USER_FAIL:
            return {
                ...state,
                error: 'Authentication failed',
                password: '',
                loading: false
            }
        case LOGIN_USER_START: 
            return { ...state, loading: true }
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, currentUser: action.user, error: '' }
        case GET_USER:
            return action.user
        case LOG_OUT_SUCCESS: 
            return {
                ...initialState,
            }
        default:
            return state
    }
}

const getUserAndRedirect = (user, navigation, dispatch) => {
    dispatch(getUser(user))
    navigation.navigate('LoggedIn')
}