import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import Animated,
{ 
    FadeInRight,
    FadeInDown,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import constants from '../../constants';

const {width , height} = Dimensions.get('window')

export default (data)=>{

    return (
        <View
        style={{
            flexDirection : 'row',
            justifyContent : 'space-between',
            padding : 5
        }}
        >
            <Text
            style={{
                fontWeight : 'bold',
            }}
            >
                {data?.label}
            </Text>

            <Text
            style={{
                fontWeight : 'bold',
                color : constants.colors.primary
            }}
            >
                {data?.value}
            </Text>

        </View>
    )
};