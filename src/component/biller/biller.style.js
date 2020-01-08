import { StyleSheet } from 'react-native';
import { Variable } from '../../styles/variable';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#f8f8ff',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        zIndex: 1,
        height: '100%'
    },

    // Slider
    // ========================= //
    wrapSlider:{
        position: 'relative',
        paddingTop: 0,
    },

     // Service
    // ========================= //
    wrapService:{
        position: 'relative',
        paddingLeft: 7.5,
        paddingRight: 7.5,
        paddingTop: 30,
        paddingBottom: 30,
    },
    itemProduct:{
        paddingLeft: 7.5,
        paddingRight: 7.5,
        marginBottom: 15,
        alignItems: 'center',
    },
    itemProductDisable:{
        opacity: 0.4
    },
    labelItem:{
        fontSize: 14,
        color: '#25282B',
        fontWeight: '400',
        fontFamily: Variable.fontRegular
    },
});