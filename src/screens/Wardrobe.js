import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import { ImagePicker } from 'expo'
import { connect } from 'react-redux'
import axios from 'axios'
import { addItemThunk } from '../reducers/item'
import { getWardrobeThunk, getWardrobeItemsThunk } from '../reducers/wardrobe'
import WardrobeDrawer from './screenComponents/WardrobeDrawer'
import { logoutUserThunk } from '../reducers/auth'

export class Wardrobe extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // this.props.getWardrobe(userId = 1)
        this.props.getWardrobeItems(wardrobeId = 1)
    }

    // _takePhoto = async () => {
    //     let pickedImage = await ImagePicker.launchCameraAsync({
    //         aspect: [4, 3]
    //     })
    //     console.log('imaggeeee', pickedImage)
    //     this.props.addItem(pickedImage);
    // }
    
    handlePress() {
        this.props.logoutUser(this.props.navigation)
    }

    _pickImage = async () => {
        let pickedImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this.props.addItem(pickedImage);
    }


    render () {
        
        const { wardrobe } = this.props
        let categoryArray = wardrobe.length && wardrobe.map(item => item.category)
        let categories = [...new Set(categoryArray)]

        return (
            <View style={styles.screenContainer}>
                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.title}>Wardrobe</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this._pickImage}>
                            <Image style={styles.addImageBtn} source={require('../../assets/addItem.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {
                        categories && categories.map(category => {
                            return (
                                <WardrobeDrawer key={category} category={category} />
                            )
                        })
                    }
                </View>
                <Button title="submit" onPress={this.handlePress.bind(this)} />

            </View>
        )
    }
}

const styles = {
    screenContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        // backgroundColor: '#AE7F52',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 50
    },
    addImageBtn: {
        height: 50,
        width: 50
    },
    addImageBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    drawerContainer: {

    }
}


const mapStateToProps = (state) => {
    return {
        wardrobe: state.wardrobe || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (pickedImage) => {
            dispatch(addItemThunk(pickedImage))
        },
        getWardrobe: (userId = 1) => {
            dispatch(getWardrobeThunk(userId = 1))
        },
        getWardrobeItems: (wardrobeId = 1) => {
            dispatch(getWardrobeItemsThunk(wardrobeId = 1))
        },
        logoutUser: (navigation) => {
            dispatch(logoutUserThunk(navigation))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wardrobe)