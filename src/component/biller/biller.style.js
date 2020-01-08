import { StyleSheet } from 'react-native';
<<<<<<< HEAD
=======
import { Variable } from '../../styles/variable';
>>>>>>> master

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#f8f8ff',
<<<<<<< HEAD
=======
        backgroundColor: '#FFFFFF',
>>>>>>> master
        position: 'relative',
        zIndex: 1,
        height: '100%'
    },

    // Slider
    // ========================= //
    wrapSlider:{
        position: 'relative',
<<<<<<< HEAD
=======
        paddingTop: 0,
>>>>>>> master
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
<<<<<<< HEAD
        marginBottom: 15
    },
    itemProductDisable:{
        opacity: 0.4
    }
=======
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
>>>>>>> master
});