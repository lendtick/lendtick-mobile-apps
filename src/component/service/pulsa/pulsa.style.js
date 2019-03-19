import { StyleSheet } from 'react-native';
import { Variable } from '@styles';

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
    },

    // Contact Number
    // ===================== //
    listContact:{
        padding: 0,
        borderBottomWidth: 1,
        borderColor: '#efefef'
    },
    listContactText:{
        fontFamily: Variable.fontRegular,
        fontSize: 14,
        color: Variable.colorContent,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth:1,
        borderColor:'#dfdfdf'
    },

    // Pulsa
    // ======================= //
    itemPulsa: {
        paddingLeft: 7.5,
        paddingRight: 7.5,
        paddingBottom: 15,
    },
    textPulsa:{
        borderWidth: 1,
        borderColor: '#efefef',
        padding: 20,
        width: '100%',
        color: Variable.colorTitle,
        fontWeight: '700',
        textAlign: 'center',
        borderRadius: Variable.borderRadius,
        fontSize: 14,
        ...Variable.boxShadow
    }

});