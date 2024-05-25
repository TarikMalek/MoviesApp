import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import CameraRollAnimation from "./CameraRollAnimation";

const { width , height} = Dimensions.get('window');
export default ()=>{


    return (
        <View
        style={styles.overlay}
        >
            <View
            style={styles.animationContainer}
            >
            <CameraRollAnimation />
            </View>
           
        </View>
    )
}


const styles = StyleSheet.create({
    overlay:{
        position: 'absolute',
        width : width ,
        height : height*.9,
        
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex : 9999
    },
    animationContainer :{
        width : width * 0.5 ,
        height : width * 0.5 ,
        borderRadius : width * 0.25 ,
        alignItems : 'center',
        justifyContent : 'center',

        // marginBottom : 20,
        backgroundColor : 'rgba(255,255,255,0.6)'
    }
})