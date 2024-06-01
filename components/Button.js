import React from 'react';
import {
    View ,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import constants from '../constants';

export default ( {
    label ,
    onPress,
    disabled,
    containerStyle
    })=>{
    return(
        <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.button,{...containerStyle}]}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
};


const styles=StyleSheet.create({
    button : {
        backgroundColor :constants.colors.primary,
        padding : 10,
        borderRadius : 10,
        marginVertical : 20,
        alignItems : 'center',
        justifyContent : 'center',
        shadowColor:constants.colors.primary,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText : {
        color : '#fff',
        fontSize : 20,
        fontWeight : 'bold'
    }
})