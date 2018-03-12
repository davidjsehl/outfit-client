import { AsyncStorage } from 'react-native'

export const USER_KEY = 'user-token'

export const onLogin = () => AsyncStorage.setItem(USER_KEY, true)

export const onLogout = () => AsyncStorage.removeItem(USER_KEY);

export const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
        .then(res => {
            if (res !== null) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
        .catch(err => reject(err))
    })
}