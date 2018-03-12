import axios from 'axios'

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

const userCreated = (user) => {
    return { type: CREATE_USER_SUCCESS, user }
}

const getUser = user => ({ type: GET_USER, user })

//THUNK CREATORS

export const me = () => {

}

export const loginUserThunk = () => {

}

export const signUpUserThunk = () => {

}

export const logoutUserThunk = () => {

}

//REDUCER

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_FORM_UPDATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            }
        default:
            return state
    }
}