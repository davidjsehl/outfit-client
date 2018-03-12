import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'


const WardrobeDrawer = (props) => {
    return (
        <TouchableOpacity>
            <View 
            // style={styles.container}
            >
                {/* <Image /> */}
                <ImageBackground 
                    style={styles.containerImage}   
                    source={require('../../../assets/drawer.png')}
                    
                    >
                    <Text style={styles.categoryName}>{props.category}</Text>
                
                </ImageBackground>
                {/* <Text>Helooooow drawer</Text> */}
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    // container: {
    //     width: 250,
    //     height: 250
    // },
    containerImage: {
        display: 'flex',
        width: '100%',
        height: 100,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryName: {
        color: 'white',
        fontSize: 25
    }
}

export default WardrobeDrawer