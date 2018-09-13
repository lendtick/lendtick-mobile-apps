import { Platform } from 'react-native';
import { Variable } from './variable';

export default InputStyle = {
    wrapInput: {
        position: "relative",
        marginBottom: 15
    },
    icon: {
        position:'absolute',
        right: 15,
        zIndex: 2,
    },
    inputText: {
        fontSize: Variable.fontSize,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: Variable.borderRadius,
        backgroundColor: '#fff',
        color: Variable.colorContent,
        width: '100%',
        paddingLeft: 15,
        paddingRight: 45,
        paddingBottom: 10,
        paddingTop: 10,
        height: 45,
        position: 'relative',
        zIndex: 1
    },
    btnPrimary: {
        width: '100%',
        borderWidth: 1,
        borderColor: Variable.colorPrimary,
        borderRadius: Variable.borderRadiusCircle,
        backgroundColor: Variable.colorPrimary,
        padding: 15,
        overflow: 'hidden'
    },
    btnDisabled: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: Variable.borderRadiusCircle,
        backgroundColor: '#999',
        padding: 15,
        overflow: 'hidden'
    },
    btnDanger: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#c0392b',
        borderRadius: Variable.borderRadiusCircle,
        backgroundColor: '#e74c3c',
        padding: 15,
        overflow: 'hidden'
    },
    btnDefault: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderRadius: Variable.borderRadiusCircle,
        backgroundColor: '#fff',
        padding: 15,
        overflow: 'hidden'
    },
    btnText: {
        color: '#fff', 
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 1
    },
    btnTextDefaul:{
        color: '#3a3a3a', 
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 1
    },
    btnTextDanger:{
        color: '#c0392b', 
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 1
    },
    singleLink:{
        color: Variable.colorPrimary
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
    }
};