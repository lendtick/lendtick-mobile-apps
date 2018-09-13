import { StyleSheet } from 'react-native';
import { Variable } from '../../styles';
import Dimensions from 'Dimensions';

export const styles = StyleSheet.create({
    wrapper:{
        position: 'relative',
        zIndex: 1,
        paddingBottom: 15
    },
    close:{
        color: Variable.colorContent,
        left: 10
    },
    textClose:{
        color: Variable.colorContent,
        fontSize: 14,
        left: 10,
        top: 3
    },

    // ======================== //
    // Header
    // ===================== //
    wrapHeader: {
        height: 80,
        borderBottomWidth: 1,
        borderColor: Variable.colorPrimaryText,
        position: 'relative',
        overflow: 'hidden'
    },
    logo:{
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: Variable.colorPrimaryText,
        borderRadius: 50,
        left: '50%',
        top: 30,
        marginLeft: -50,
        position: 'absolute'
    },

    // ======================== //
    // Form
    // ======================== //
    main: {
        paddingLeft: 15,
        paddingRight: 15,
        position: 'relative',
        zIndex: 3,
    },

    // ====================== //
    // List Style
    // ====================== //
    listState: {
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    listTextState: {
        color: Variable.colorContent,
        fontSize: 14,
        padding: 15
    },
    listTextStateActive: {
        color: Variable.colorTitle,
        backgroundColor: '#f0f0f0',
        fontSize: 14,
        padding: 15
    },
    
});