import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#f8f8ff',
        position: 'relative',
        zIndex: 1,
        height: '100%'
    },

    // Slider
    // ========================= //
    wrapSlider:{
        position: 'relative',
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
        marginBottom: 15
    },
    itemProductDisable:{
        opacity: 0.4
    }
});