import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { ImagePicker } from 'expo'
import { connect } from 'react-redux'
import axios from 'axios';
import { addItemThunk } from '../reducers/item'
import { getWardrobeThunk } from '../reducers/wardrobe'


export class Wardrobe extends Component {

    componentDidMount() {
        this.props.getWardrobe(userId = 1)
    }

    // _takePhoto = async () => {
    //     let pickedImage = await ImagePicker.launchCameraAsync({
    //         aspect: [4, 3]
    //     })
    //     console.log('imaggeeee', pickedImage)
    //     this.props.addItem(pickedImage);
    // }

    _pickImage = async () => {
        let pickedImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this.props.addItem(pickedImage);
        // this.props.getPhotoInfo(pickedImage.uri)
    };

    render () {
        console.log('this.propssssssssss', this.props)
        return (
            <View>
                <Button title='submit' onPress={this._pickImage}/> 
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        wardrobe: state.wardrobe
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (pickedImage) => {
            dispatch(addItemThunk(pickedImage))
        },
        getWardrobe: (userId = 1) => {
            dispatch(getWardrobeThunk(userId = 1))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wardrobe)