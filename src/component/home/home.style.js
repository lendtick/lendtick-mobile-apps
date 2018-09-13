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

    // Search
    // ===================== //
    wrapSearch:{
        position: 'relative',
        borderWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 45,
        height: 45,
        borderRadius: Variable.borderRadius,
        ...Variable.boxShadow
    },
    iconSearch: {
        position: 'absolute',
        top: 10,
        right: 15
    },
    inputSingleSearch:{
        height: 45
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

    // Addsense
    // ========================= //
    wrapAdds: {
        marginTop: 30
    }
    
});