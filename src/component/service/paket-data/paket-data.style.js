import { StyleSheet } from 'react-native';
import { Variable } from '../../../styles/index';
import Dimensions from 'Dimensions';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#ffffff',
        position: 'relative',
        zIndex: 1,
        height: '100%'
    },

    line:{
        marginBottom: -12
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
    },

    // Phone Number
    // ===================== //
    wrapPhoneNumber:{
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
    iconPhoneNumber: {
        position: 'absolute',
        top: 10,
        right: 15
    },
    inputSinglePhoneNumber:{
        height: 45
    },

    centerTextPhone:{
        textAlign:'center',
        marginTop:20,
        marginBottom:20,
        fontStyle:'italic',
        fontSize:12,
        color: '#999999'
    },

    wrapSelectPhoneLink:{
        height: 50,
        borderWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#ffffff',
        ...Variable.boxShadow
    },
    phoneLink:{
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 14,
        color: Variable.colorPrimaryText,
        fontWeight: '700'
    },

    // White Box
    // ===================== //
    whiteBox:{
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: Variable.borderRadius,
        backgroundColor: '#ffffff',
        padding: 20,
        marginBottom: 15,
        ...Variable.boxShadow
    },
    titleWhiteBox:{
        fontWeight: '700',
        color: Variable.colorTitle,
        marginBottom: 5,
        fontSize: 14
    },
    descWhiteBox:{
        color: Variable.colorContent,
        fontSize: 14,
    }
    
});