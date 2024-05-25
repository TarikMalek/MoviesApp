import React from 'react';
import {
    View ,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


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
        backgroundColor : '#012326',
        padding : 10,
        borderRadius : 10,
        marginVertical : 20,
        alignItems : 'center',
        justifyContent : 'center'
    },
    buttonText : {
        color : '#fff',
        fontSize : 20,
        fontWeight : 'bold'
    }
})