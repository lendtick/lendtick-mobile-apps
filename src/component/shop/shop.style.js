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
    safeArea: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    line:{
        marginBottom: -12
    },
    borderLine:{
        borderBottomWidth: 1,
        borderColor: '#dfdfdf',
        paddingBottom: 15,
        marginBottom:15
    },
    imgAction:{
        width: 100,
        height: 100,
        marginBottom:-15,
        left: '50%',
        marginLeft: -50
    },

    // Email
    // ===================== //
    wrapEmail:{
        position: 'relative',
        backgroundColor: '#ffffff',
        paddingLeft: 0,
        paddingRight: 30,
        height: 45,
    },
    iconEmail: {
        position: 'absolute',
        top: 10,
        right: 15
    },
    inputSingleEmail:{
        height: 45
    },

    // Product Cart
    // ========================= //
    imgThumb:{
        width: 75,
        height: 75,
        borderRadius: 37.5,
        borderWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#ffffff'
    },
    itemCart:{
        borderWidth: 1,
        ...Variable.boxShadow,
        borderColor: '#efefef',
        backgroundColor: '#ffffff',
        marginBottom: 15,
        borderRadius: Variable.borderRadius
    },
    cartPrice:{
        color: Variable.colorPrimaryText,
        fontWeight: '700',
        marginBottom:10
    },

    // Spinner
    // ========================= //
    wrapSpinner:{
        width:120
    },
    spinnerBtn:{
        width: 30,
        height:30,
        borderWidth:1,
        borderColor: '#dfdfdf',
        borderRadius:15,
        ...Variable.boxShadow,
        backgroundColor: '#ffffff'
    }
});