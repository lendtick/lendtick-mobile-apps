import { Platform } from 'react-native';
import { Variable } from './variable';

export default InputStyle = {
    wrapInput: {
        position: "relative",
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderRadius: Variable.borderRadius
    },
    icon: {
        position:'absolute',
        right: 15,
        zIndex: 2,
    },
    inputText: {
        fontSize: Variable.fontSize,
        borderRadius: Variable.borderRadius,
        color: Variable.colorContent,
        width: '100%',
        paddingTop: 5,
        position: 'relative',
        zIndex: 1,
        fontFamily: Variable.fontRegular
    },
    inputTextDropdown: {
        fontSize: Variable.fontSize,
        borderRadius: Variable.borderRadius,
        color: Variable.colorContent,
        width: '100%',
        paddingTop: 0,
        position: 'relative',
        zIndex: 1,
        fontFamily: Variable.fontRegular
    },
    btnPrimary: {
        width: '100%',
        borderWidth: 1,
        borderColor: Variable.colorPrimary,
        borderRadius: Variable.borderRadius,
        backgroundColor: Variable.colorPrimary,
        padding: 15,
        overflow: 'hidden'
    },
    btnDisabled: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: Variable.borderRadius,
        backgroundColor: '#999',
        padding: 15,
        overflow: 'hidden'
    },
    btnDanger: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#c0392b',
        borderRadius: Variable.borderRadius,
        backgroundColor: '#e74c3c',
        padding: 15,
        overflow: 'hidden'
    },
    btnDefault: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderRadius: Variable.borderRadius,
        backgroundColor: '#fff',
        padding: 15,
        overflow: 'hidden'
    },
    btnText: {
        color: '#fff', 
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 1,
        fontFamily: Variable.fontBold
    },
    btnTextDefaul:{
        color: '#3a3a3a', 
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 1,
        fontFamily: Variable.fontBold
    },
    btnTextDanger:{
        color: '#c0392b', 
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 1,
        fontFamily: Variable.fontBold
    },
    singleLink:{
        color: Variable.colorPrimary,
        fontFamily: Variable.fontMedium
    },
    selectDropdown: {
        height: 45,
        width: '100%',
        ...Platform.select({
            ios: {
                borderBottomColor: "gray",
                borderBottomWidth: 1
            }
        })
    },
    highlight: {
        borderWidth: 1,
        borderColor: 'transparent',
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: 45,
        width: '100%',
        zIndex: 2
    },
    btnCircle:{
        borderWidth: 1,
        borderColor: Variable.colorPrimary,
        backgroundColor: Variable.colorPrimary,
        width: 46,
        height: 46,
        borderRadius: 23,
    },
    iconBtnCircle:{
        left: 23,
        top: 23,
        marginLeft: -9.5,
        marginTop: -9.5
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
        padding: 15,
        fontFamily: Variable.fontRegular
    },
    listTextStateActive: {
        color: Variable.colorTitle,
        backgroundColor: '#f0f0f0',
        fontSize: 14,
        padding: 15,
        fontFamily: Variable.fontRegular
    },
};