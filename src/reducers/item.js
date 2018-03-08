import axios from 'axios'


//ACTION TYPES

const UPLOAD_START = 'UPLOAD_START'
const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
const UPLOAD_FAIL = 'UPLOAD_FAIL'
const ITEM_ADDED = 'ITEM_ADDED'
const GOT_ITEM_INFO = 'GOT_ITEM_INFO'

const initialState = {
    image: null,
    loading: false
}


//ACTION CREATORS

const uploadSuccess = (uploadResult) => {
    return { type: UPLOAD_SUCCESS, uploadResult }
}

//THUNKS

export const addItemThunk = (image) => async dispatch => {
    let uploadResponse, uploadResult;
    try {
        dispatch({ type: UPLOAD_START })
        if (!image.cancelled) {
            uploadResponse = await uploadImageAsync(image.uri)
            uploadResult = await uploadResponse.json()
        }      
    } catch (err) {
        console.error(err)
        alert('Upload failed, sorry :(');
    } finally {
        dispatch(uploadSuccess(uploadResult))
    }

}

const uploadImageAsync = async (uri) => {

    let apiUrl = 'http://localhost:1313/api/upload'
    let fileParts = uri.split('.')
    let fileType = fileParts[fileParts.length - 1]

    let formData = new FormData()
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image.${fileType}`
    })

    // axios.post('http://localhost:1313/api/upload', formData)
    // .then(success => console.log('successssss', success))

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    return fetch(apiUrl, options);
}

//REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_START: 
            return { ...state, loading: true }
        case UPLOAD_SUCCESS:
            return { ...state, image: action.uploadResult, loading: false }
        case UPLOAD_FAIL:
            return { ...state, loading: false }
        default: 
            return state
    }
}