import axios from 'axios'

//ACTION TYPES

const GOT_WARDROBE = 'GOT_WARDROBE'
const GOT_WARDROBE_ITEMS = 'GOT_WARDROBE_ITEMS'



// REDUCER

initialState = {}

//ACTION CREATORS

const gotWardrobe = (wardrobe) => {
    return { type: GOT_WARDROBE, wardrobe }
}

const gotWardrobeItems = (items) => {
    return { type: GOT_WARDROBE_ITEMS, items }
}

//THUNKS

export const getWardrobeThunk = (userId) => async dispatch => {
    userId = 1
    console.log('in the thunkkkkk', userId)
    return axios.get(`http://localhost:1313/api/wardrobes/${userId}`)
    .then(async res => {
        let currentWardrobe = await res.data
        dispatch(gotWardrobe(currentWardrobe))
    })
}

export const getWardrobeItemsThunk = (wardrobeId) => async dispatch => {
    wardrobeId = 1
    return axios.get(`http://localhost:1313/api/items/${wardrobeId}`)
    .then(async res => {
        let wardrobeItems = await res.data
        dispatch(gotWardrobeItems(wardrobeItems))
    })
}


//REDUCER 

export default (state = initialState, action) => {
    switch(action.type) {
        case GOT_WARDROBE:
            return action.wardrobe
        case GOT_WARDROBE_ITEMS:
            return action.items
        default:
            return state
    }
}