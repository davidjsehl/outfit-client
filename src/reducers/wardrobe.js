import axios from 'axios'

//ACTION TYPES

const GOT_WARDROBE = 'GOT_WARDROBE'



// REDUCER

initialState = {}

//ACTION CREATORS

const gotWardrobe = (wardrobe) => {
    return { type: GOT_WARDROBE, wardrobe }
}

//THUNKS

export const getWardrobeThunk = (userId) => async dispatch => {
    userId = 1
    console.log('in the thunkkkkk', userId)
    return axios.get(`http://localhost:1313/api/wardrobes/${userId}`)
    .then(async res => {
        let currentWardrobe = await res.data
        // let result = await res
        console.log('resssssponnneeeee', res)
        console.log('currrrrrrrennnnnt wardrobee', currentWardrobe)
        dispatch(gotWardrobe(currentWardrobe))
    })
}

//REDUCER 

export default (state = initialState, action) => {
    switch(action.type) {
        case GOT_WARDROBE:
            return action.wardrobe
        default:
            return state
    }
}