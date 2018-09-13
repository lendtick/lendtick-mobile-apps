import { StyleSheet } from 'react-native';
import { Variable } from '../../styles/index';
import Dimensions from 'Dimensions';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#ffffff',
        position: 'relative',
        zIndex: 1,
        height: '100%'
    },

    // Slider
    // ========================= //
    wrapSlider:{
        marginTop: 30,
    },

    // Package
    // ========================= //
    listPackage: {
        marginTop: 30
    },
    imgPackage: {
        width: 70,
        height: 70,
        left: '50%',
        marginLeft: -35
    },
    textPackage: {
        textAlign: 'center',
        color: Variable.colorContent,
        lineHeight: 18,
        paddingLeft: 10,
        paddingRight: 10,
    },
    
});