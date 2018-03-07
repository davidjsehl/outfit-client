import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { ImagePicker } from 'expo'
import axios from 'axios';


export default class Wardrobe extends Component {
    constructor (props) {
        super (props) 
        this.state = {
            image: null,
            uploading: false
        }
    }

    // _takePhoto = async () => {
    //     let pickedImage = await ImagePicker.launchCameraAsync({
    //         aspect: [4, 3]
    //     })
    //     console.log('imaggeeee', pickedImage)
    //     this._handlePickedImage(pickedImage)
    // }

    _pickImage = async () => {
        let pickedImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handlePickedImage(pickedImage);
    };

    _handlePickedImage = async (pickedImage) => {
        console.log('pickeddddimageee', pickedImage)
        try {
            this.setState({ uploading: true })

            if(!pickedImage.cancelled) {
                uploadResponse = await uploadImageAsync(pickedImage.uri)
                uploadResult = await uploadResponse.json()
            }
        } catch (err) {
            console.log('errrorrrrrr, responseeeeee', { uploadResponse });
            console.log({ uploadResult });
            console.log({ e });
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false })
        }
    }

    render () {
        return (
            <View>
                <Button title='submit' onPress={this._pickImage}/> 
            </View>
        )
    }
}

async function uploadImageAsync (uri) {
    let apiUrl = 'http://localhost:1313/api/upload'

    // console.log('uriiiiiiiiii', uri)

    let fileParts = uri.split('.')
    let fileType = fileParts[fileParts.length - 1]
    console.log('filetyppeeee', fileType)

    let formData = new FormData()
    formData.append('photo', {
        uri, 
        name: `photo.${fileType}`,
        type: `image.${fileType}`
    })
    console.log('fomr dattaaaaaa', formData)

    axios.post('http://localhost:1313/api/upload', formData)
    .then(success => console.log('successssss', success))

}